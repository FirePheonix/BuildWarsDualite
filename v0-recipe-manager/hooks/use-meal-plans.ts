"use client"

import { useState, useEffect } from "react"
import { type MealPlan, recipeStorage } from "@/lib/recipe-storage"

export function useMealPlans() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMealPlans = () => {
      const storedPlans = recipeStorage.getMealPlans()
      setMealPlans(storedPlans)
      setLoading(false)
    }

    loadMealPlans()
  }, [])

  const saveMealPlan = (mealPlan: MealPlan) => {
    recipeStorage.saveMealPlan(mealPlan)
    setMealPlans((prev) => {
      const existingIndex = prev.findIndex((mp) => mp.id === mealPlan.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = mealPlan
        return updated
      }
      return [...prev, mealPlan]
    })
  }

  const getMealPlanByDate = (date: string) => {
    return mealPlans.find((mp) => mp.date === date) || null
  }

  return {
    mealPlans,
    loading,
    saveMealPlan,
    getMealPlanByDate,
  }
}
