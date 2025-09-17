"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Recipe, MealPlan } from "@/lib/recipe-storage"
import { ChevronLeft, ChevronRight, Plus, X, Clock, Users } from "lucide-react"

interface MealPlannerProps {
  recipes: Recipe[]
  mealPlans: MealPlan[]
  onSaveMealPlan: (mealPlan: MealPlan) => void
}

type MealType = "breakfast" | "lunch" | "dinner" | "snacks"

const MEAL_TYPES: { key: MealType; label: string; color: string }[] = [
  { key: "breakfast", label: "Breakfast", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { key: "lunch", label: "Lunch", color: "bg-green-100 text-green-800 border-green-200" },
  { key: "dinner", label: "Dinner", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { key: "snacks", label: "Snacks", color: "bg-purple-100 text-purple-800 border-purple-200" },
]

export function MealPlanner({ recipes, mealPlans, onSaveMealPlan }: MealPlannerProps) {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    return monday
  })

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedMealType, setSelectedMealType] = useState<MealType>("breakfast")
  const [isAddingMeal, setIsAddingMeal] = useState(false)

  // Generate week dates
  const weekDates = useMemo(() => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek)
      date.setDate(currentWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }, [currentWeek])

  // Get meal plan for a specific date
  const getMealPlanForDate = (date: Date): MealPlan => {
    const dateStr = date.toISOString().split("T")[0]
    const existingPlan = mealPlans.find((mp) => mp.date === dateStr)

    if (existingPlan) {
      return existingPlan
    }

    return {
      id: crypto.randomUUID(),
      date: dateStr,
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    }
  }

  // Navigate weeks
  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() - 7)
    setCurrentWeek(newWeek)
  }

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + 7)
    setCurrentWeek(newWeek)
  }

  const goToCurrentWeek = () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    setCurrentWeek(monday)
  }

  // Add recipe to meal plan
  const addRecipeToMeal = (recipe: Recipe) => {
    if (!selectedDate) return

    const mealPlan = getMealPlanForDate(new Date(selectedDate))
    const updatedMealPlan = {
      ...mealPlan,
      [selectedMealType]: [...(mealPlan[selectedMealType] || []), recipe],
    }

    onSaveMealPlan(updatedMealPlan)
    setIsAddingMeal(false)
  }

  // Remove recipe from meal plan
  const removeRecipeFromMeal = (date: Date, mealType: MealType, recipeIndex: number) => {
    const mealPlan = getMealPlanForDate(date)
    const updatedMeals = [...(mealPlan[mealType] || [])]
    updatedMeals.splice(recipeIndex, 1)

    const updatedMealPlan = {
      ...mealPlan,
      [mealType]: updatedMeals,
    }

    onSaveMealPlan(updatedMealPlan)
  }

  const openAddMealDialog = (date: Date, mealType: MealType) => {
    setSelectedDate(date.toISOString().split("T")[0])
    setSelectedMealType(mealType)
    setIsAddingMeal(true)
  }

  const formatWeekRange = () => {
    const endDate = new Date(currentWeek)
    endDate.setDate(currentWeek.getDate() + 6)

    return `${currentWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-balance">Weekly Meal Planner</h2>
          <p className="text-muted-foreground">Plan your meals for the week</p>
        </div>
        <Button onClick={goToCurrentWeek} variant="outline">
          Today
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-xl">{formatWeekRange()}</CardTitle>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDates.map((date, dayIndex) => {
          const mealPlan = getMealPlanForDate(date)
          const isToday = date.toDateString() === new Date().toDateString()

          return (
            <Card key={dayIndex} className={`${isToday ? "ring-2 ring-primary" : ""}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className={`text-lg ${isToday ? "text-primary font-bold" : ""}`}>{date.getDate()}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {MEAL_TYPES.map(({ key, label, color }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{label}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openAddMealDialog(date, key)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="space-y-1">
                      {(mealPlan[key] || []).map((recipe, recipeIndex) => (
                        <div
                          key={`${recipe.id}-${recipeIndex}`}
                          className={`p-2 rounded-md border text-xs ${color} group relative`}
                        >
                          <div className="font-medium text-pretty">{recipe.title}</div>
                          {(recipe.prepTime || recipe.cookTime) && (
                            <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
                              <Clock className="w-3 h-3" />
                              {(recipe.prepTime || 0) + (recipe.cookTime || 0)}m
                            </div>
                          )}
                          <button
                            onClick={() => removeRecipeFromMeal(date, key, recipeIndex)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 hover:text-red-600" />
                          </button>
                        </div>
                      ))}

                      {(mealPlan[key] || []).length === 0 && (
                        <div className="text-xs text-muted-foreground italic p-2 border-2 border-dashed rounded-md">
                          No meals planned
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={isAddingMeal} onOpenChange={setIsAddingMeal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Recipe to {MEAL_TYPES.find((m) => m.key === selectedMealType)?.label}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {recipes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recipes available. Add some recipes first!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-balance">{recipe.title}</CardTitle>
                      {recipe.description && (
                        <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{recipe.description}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Time and Servings */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {recipe.prepTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {recipe.prepTime}m prep
                            </div>
                          )}
                          {recipe.cookTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {recipe.cookTime}m cook
                            </div>
                          )}
                          {recipe.servings && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {recipe.servings} servings
                            </div>
                          )}
                        </div>

                        {/* Category and Tags */}
                        <div className="flex flex-wrap gap-1">
                          {recipe.category && (
                            <Badge variant="secondary" className="text-xs">
                              {recipe.category}
                            </Badge>
                          )}
                          {recipe.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button onClick={() => addRecipeToMeal(recipe)} className="w-full" size="sm">
                          Add to {MEAL_TYPES.find((m) => m.key === selectedMealType)?.label}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
