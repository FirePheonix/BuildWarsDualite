"use client"

import { useState, useEffect } from "react"
import { type Recipe, recipeStorage } from "@/lib/recipe-storage"

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecipes = () => {
      const storedRecipes = recipeStorage.getRecipes()
      setRecipes(storedRecipes)
      setLoading(false)
    }

    loadRecipes()
  }, [])

  const addRecipe = (recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">) => {
    const newRecipe = recipeStorage.saveRecipe(recipeData)
    setRecipes((prev) => [...prev, newRecipe])
    return newRecipe
  }

  const updateRecipe = (id: string, updates: Partial<Omit<Recipe, "id" | "createdAt">>) => {
    const updatedRecipe = recipeStorage.updateRecipe(id, updates)
    if (updatedRecipe) {
      setRecipes((prev) => prev.map((r) => (r.id === id ? updatedRecipe : r)))
    }
    return updatedRecipe
  }

  const deleteRecipe = (id: string) => {
    const success = recipeStorage.deleteRecipe(id)
    if (success) {
      setRecipes((prev) => prev.filter((r) => r.id !== id))
    }
    return success
  }

  return {
    recipes,
    loading,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
