"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { type ShoppingListItem, type MealPlan, recipeStorage } from "@/lib/recipe-storage"
import { ShoppingCart, Plus, Trash2, Download, Calendar, RefreshCw } from "lucide-react"

interface ShoppingListProps {
  mealPlans: MealPlan[]
  shoppingList: ShoppingListItem[]
  onUpdateShoppingList: (items: ShoppingListItem[]) => void
}

const INGREDIENT_CATEGORIES = [
  "Produce",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Pantry",
  "Frozen",
  "Bakery",
  "Beverages",
  "Snacks",
  "Other",
]

export function ShoppingList({ mealPlans, shoppingList, onUpdateShoppingList }: ShoppingListProps) {
  const [newItem, setNewItem] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("Other")
  const [selectedWeekStart, setSelectedWeekStart] = useState(() => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    return monday.toISOString().split("T")[0]
  })

  // Generate available weeks from meal plans
  const availableWeeks = useMemo(() => {
    const weeks = new Set<string>()
    mealPlans.forEach((plan) => {
      const date = new Date(plan.date)
      const monday = new Date(date)
      monday.setDate(date.getDate() - date.getDay() + 1)
      weeks.add(monday.toISOString().split("T")[0])
    })
    return Array.from(weeks).sort()
  }, [mealPlans])

  // Group shopping list items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, ShoppingListItem[]> = {}

    shoppingList.forEach((item) => {
      const category = item.category || "Other"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(item)
    })

    // Sort items within each category
    Object.keys(groups).forEach((category) => {
      groups[category].sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1 // Completed items go to bottom
        }
        return a.ingredient.localeCompare(b.ingredient)
      })
    })

    return groups
  }, [shoppingList])

  // Calculate completion stats
  const completionStats = useMemo(() => {
    const total = shoppingList.length
    const completed = shoppingList.filter((item) => item.completed).length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return { total, completed, percentage }
  }, [shoppingList])

  // Generate shopping list from meal plans
  const generateFromMealPlans = () => {
    const weekStart = new Date(selectedWeekStart)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const startDateStr = weekStart.toISOString().split("T")[0]
    const endDateStr = weekEnd.toISOString().split("T")[0]

    const generatedItems = recipeStorage.generateShoppingListFromMealPlan(startDateStr, endDateStr)

    // Merge with existing items, avoiding duplicates
    const existingIngredients = new Set(shoppingList.map((item) => item.ingredient.toLowerCase()))
    const newItems = generatedItems.filter((item) => !existingIngredients.has(item.ingredient.toLowerCase()))

    onUpdateShoppingList([...shoppingList, ...newItems])
  }

  // Add manual item
  const addManualItem = () => {
    if (!newItem.trim()) return

    const item: ShoppingListItem = {
      id: crypto.randomUUID(),
      ingredient: newItem.trim(),
      category: newItemCategory,
      completed: false,
    }

    onUpdateShoppingList([...shoppingList, item])
    setNewItem("")
  }

  // Toggle item completion
  const toggleItemCompletion = (itemId: string) => {
    const updatedItems = shoppingList.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item,
    )
    onUpdateShoppingList(updatedItems)
  }

  // Remove item
  const removeItem = (itemId: string) => {
    const updatedItems = shoppingList.filter((item) => item.id !== itemId)
    onUpdateShoppingList(updatedItems)
  }

  // Clear completed items
  const clearCompleted = () => {
    const updatedItems = shoppingList.filter((item) => !item.completed)
    onUpdateShoppingList(updatedItems)
  }

  // Clear all items
  const clearAll = () => {
    onUpdateShoppingList([])
  }

  // Export shopping list as text
  const exportList = () => {
    let text = "Shopping List\n\n"

    Object.entries(groupedItems).forEach(([category, items]) => {
      if (items.length > 0) {
        text += `${category}:\n`
        items.forEach((item) => {
          const status = item.completed ? "✓" : "☐"
          text += `${status} ${item.ingredient}${item.quantity ? ` (${item.quantity})` : ""}\n`
        })
        text += "\n"
      }
    })

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "shopping-list.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatWeekRange = (weekStart: string) => {
    const start = new Date(weekStart)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-balance">Shopping List</h2>
          <p className="text-muted-foreground">Generate from meal plans or add items manually</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportList} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          {shoppingList.length > 0 && (
            <Button onClick={clearCompleted} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Trash2 className="w-4 h-4" />
              Clear Completed
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      {shoppingList.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Shopping Progress</span>
              <span className="text-sm text-muted-foreground">
                {completionStats.completed} of {completionStats.total} items
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionStats.percentage}%` }}
              />
            </div>
            <div className="text-center mt-2">
              <Badge variant={completionStats.percentage === 100 ? "default" : "secondary"}>
                {completionStats.percentage}% Complete
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate from Meal Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Generate from Meal Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="week-select">Select Week</Label>
              <Select value={selectedWeekStart} onValueChange={setSelectedWeekStart}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a week" />
                </SelectTrigger>
                <SelectContent>
                  {availableWeeks.map((weekStart) => (
                    <SelectItem key={weekStart} value={weekStart}>
                      {formatWeekRange(weekStart)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateFromMealPlans} className="w-full flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Generate Shopping List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Manual Item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Item Manually
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter item name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addManualItem()}
              className="flex-1"
            />
            <Select value={newItemCategory} onValueChange={setNewItemCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INGREDIENT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addManualItem}>Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Shopping List */}
      {shoppingList.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Your shopping list is empty</h3>
            <p className="text-muted-foreground mb-4">
              Generate a list from your meal plans or add items manually to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {INGREDIENT_CATEGORIES.map((category) => {
            const items = groupedItems[category]
            if (!items || items.length === 0) return null

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{category}</span>
                    <Badge variant="outline">
                      {items.filter((item) => !item.completed).length} of {items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <Checkbox checked={item.completed} onCheckedChange={() => toggleItemCompletion(item.id)} />
                          <div className="flex-1">
                            <span
                              className={`text-pretty ${item.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {item.ingredient}
                            </span>
                            {item.quantity && (
                              <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {index < items.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Clear All Button */}
      {shoppingList.length > 0 && (
        <div className="text-center">
          <Button
            onClick={clearAll}
            variant="outline"
            className="text-destructive hover:text-destructive bg-transparent"
          >
            Clear All Items
          </Button>
        </div>
      )}
    </div>
  )
}
