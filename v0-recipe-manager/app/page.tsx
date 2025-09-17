"use client"

import { useState } from "react"
import { RecipeForm } from "@/components/recipe-form"
import { RecipeBrowser } from "@/components/recipe-browser"
import { RecipeDetail } from "@/components/recipe-detail"
import { MealPlanner } from "@/components/meal-planner"
import { ShoppingList } from "@/components/shopping-list"
import { Button } from "@/components/ui/button"
import { useRecipes } from "@/hooks/use-recipes"
import { useMealPlans } from "@/hooks/use-meal-plans"
import { useShoppingList } from "@/hooks/use-shopping-list"
import type { Recipe } from "@/lib/recipe-storage"
import { Plus, ChefHat, Calendar, ShoppingCart } from "lucide-react"

type View = "recipes" | "add-recipe" | "recipe-detail" | "meal-planner" | "shopping-list"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>("recipes")
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null)
  const { recipes, loading, addRecipe, updateRecipe, deleteRecipe } = useRecipes()
  const { mealPlans, saveMealPlan } = useMealPlans()
  const { shoppingList, updateShoppingList } = useShoppingList()

  const handleAddRecipe = (recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">) => {
    addRecipe(recipeData)
    setCurrentView("recipes")
  }

  const handleEditRecipe = (recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">) => {
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData)
      setEditingRecipe(null)
      setCurrentView("recipes")
    }
  }

  const startEditing = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setCurrentView("add-recipe")
  }

  const viewRecipe = (recipe: Recipe) => {
    setViewingRecipe(recipe)
    setCurrentView("recipe-detail")
  }

  const cancelEditing = () => {
    setEditingRecipe(null)
    setCurrentView("recipes")
  }

  const handleDeleteFromDetail = () => {
    if (viewingRecipe && deleteRecipe(viewingRecipe.id)) {
      setViewingRecipe(null)
      setCurrentView("recipes")
    }
  }

  const handleEditFromDetail = () => {
    if (viewingRecipe) {
      setEditingRecipe(viewingRecipe)
      setViewingRecipe(null)
      setCurrentView("add-recipe")
    }
  }

  const handleAddToMealPlan = () => {
    if (viewingRecipe) {
      setCurrentView("meal-planner")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading your recipes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-balance">Recipe Manager</h1>
            </div>
            <nav className="flex gap-2">
              <Button
                variant={currentView === "recipes" || currentView === "recipe-detail" ? "default" : "outline"}
                onClick={() => setCurrentView("recipes")}
                className="flex items-center gap-2"
              >
                <ChefHat className="w-4 h-4" />
                Recipes
              </Button>
              <Button
                variant={currentView === "meal-planner" ? "default" : "outline"}
                onClick={() => setCurrentView("meal-planner")}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Meal Planner
              </Button>
              <Button
                variant={currentView === "shopping-list" ? "default" : "outline"}
                onClick={() => setCurrentView("shopping-list")}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Shopping List
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === "recipes" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-balance">Your Recipe Collection</h2>
              <Button onClick={() => setCurrentView("add-recipe")} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Recipe
              </Button>
            </div>

            <RecipeBrowser
              recipes={recipes}
              onEditRecipe={startEditing}
              onDeleteRecipe={deleteRecipe}
              onViewRecipe={viewRecipe}
            />
          </div>
        )}

        {currentView === "recipe-detail" && viewingRecipe && (
          <RecipeDetail
            recipe={viewingRecipe}
            onBack={() => setCurrentView("recipes")}
            onEdit={handleEditFromDetail}
            onDelete={handleDeleteFromDetail}
            onAddToMealPlan={handleAddToMealPlan}
          />
        )}

        {currentView === "add-recipe" && (
          <div>
            <RecipeForm
              onSubmit={editingRecipe ? handleEditRecipe : handleAddRecipe}
              initialData={editingRecipe || undefined}
              onCancel={editingRecipe ? cancelEditing : () => setCurrentView("recipes")}
            />
          </div>
        )}

        {currentView === "meal-planner" && (
          <MealPlanner recipes={recipes} mealPlans={mealPlans} onSaveMealPlan={saveMealPlan} />
        )}

        {currentView === "shopping-list" && (
          <ShoppingList mealPlans={mealPlans} shoppingList={shoppingList} onUpdateShoppingList={updateShoppingList} />
        )}
      </main>
    </div>
  )
}
