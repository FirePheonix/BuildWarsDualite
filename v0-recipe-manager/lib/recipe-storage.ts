export interface Recipe {
  id: string
  title: string
  description?: string
  ingredients: string[]
  instructions: string[]
  prepTime?: number // in minutes
  cookTime?: number // in minutes
  servings?: number
  category?: string
  tags?: string[]
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface MealPlan {
  id: string
  date: string // YYYY-MM-DD format
  breakfast?: Recipe[]
  lunch?: Recipe[]
  dinner?: Recipe[]
  snacks?: Recipe[]
}

export interface ShoppingListItem {
  id: string
  ingredient: string
  quantity?: string
  category?: string
  completed: boolean
}

class RecipeStorage {
  private readonly RECIPES_KEY = "recipe-manager-recipes"
  private readonly MEAL_PLANS_KEY = "recipe-manager-meal-plans"
  private readonly SHOPPING_LIST_KEY = "recipe-manager-shopping-list"

  // Recipe methods
  getRecipes(): Recipe[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.RECIPES_KEY)
    if (!stored) return []

    try {
      const recipes = JSON.parse(stored)
      return recipes.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
        updatedAt: new Date(recipe.updatedAt),
      }))
    } catch {
      return []
    }
  }

  saveRecipe(recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">): Recipe {
    const newRecipe: Recipe = {
      ...recipe,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const recipes = this.getRecipes()
    recipes.push(newRecipe)
    this.saveRecipes(recipes)
    return newRecipe
  }

  updateRecipe(id: string, updates: Partial<Omit<Recipe, "id" | "createdAt">>): Recipe | null {
    const recipes = this.getRecipes()
    const index = recipes.findIndex((r) => r.id === id)

    if (index === -1) return null

    recipes[index] = {
      ...recipes[index],
      ...updates,
      updatedAt: new Date(),
    }

    this.saveRecipes(recipes)
    return recipes[index]
  }

  deleteRecipe(id: string): boolean {
    const recipes = this.getRecipes()
    const filtered = recipes.filter((r) => r.id !== id)

    if (filtered.length === recipes.length) return false

    this.saveRecipes(filtered)
    return true
  }

  private saveRecipes(recipes: Recipe[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.RECIPES_KEY, JSON.stringify(recipes))
  }

  // Meal plan methods
  getMealPlans(): MealPlan[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.MEAL_PLANS_KEY)
    return stored ? JSON.parse(stored) : []
  }

  saveMealPlan(mealPlan: MealPlan): void {
    const mealPlans = this.getMealPlans()
    const existingIndex = mealPlans.findIndex((mp) => mp.id === mealPlan.id)

    if (existingIndex >= 0) {
      mealPlans[existingIndex] = mealPlan
    } else {
      mealPlans.push(mealPlan)
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.MEAL_PLANS_KEY, JSON.stringify(mealPlans))
    }
  }

  getMealPlanByDate(date: string): MealPlan | null {
    const mealPlans = this.getMealPlans()
    return mealPlans.find((mp) => mp.date === date) || null
  }

  // Shopping list methods
  getShoppingList(): ShoppingListItem[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.SHOPPING_LIST_KEY)
    return stored ? JSON.parse(stored) : []
  }

  saveShoppingList(items: ShoppingListItem[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.SHOPPING_LIST_KEY, JSON.stringify(items))
    }
  }

  generateShoppingListFromMealPlan(startDate: string, endDate: string): ShoppingListItem[] {
    const mealPlans = this.getMealPlans()
    const ingredientMap = new Map<string, { quantity: string; category?: string }>()

    // Filter meal plans within date range
    const relevantPlans = mealPlans.filter((plan) => plan.date >= startDate && plan.date <= endDate)

    // Collect all ingredients from all meals
    relevantPlans.forEach((plan) => {
      const allMeals = [
        ...(plan.breakfast || []),
        ...(plan.lunch || []),
        ...(plan.dinner || []),
        ...(plan.snacks || []),
      ]

      allMeals.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          const key = ingredient.toLowerCase().trim()
          if (ingredientMap.has(key)) {
            // For simplicity, we'll just note "multiple" if ingredient appears multiple times
            const existing = ingredientMap.get(key)!
            ingredientMap.set(key, { ...existing, quantity: "Multiple servings" })
          } else {
            ingredientMap.set(key, { quantity: "1 serving", category: "Uncategorized" })
          }
        })
      })
    })

    // Convert to shopping list items
    return Array.from(ingredientMap.entries()).map(([ingredient, details]) => ({
      id: crypto.randomUUID(),
      ingredient,
      quantity: details.quantity,
      category: details.category,
      completed: false,
    }))
  }
}

export const recipeStorage = new RecipeStorage()
