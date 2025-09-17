"use client"

import { useState, useEffect } from "react"
import { type ShoppingListItem, recipeStorage } from "@/lib/recipe-storage"

export function useShoppingList() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadShoppingList = () => {
      const storedList = recipeStorage.getShoppingList()
      setShoppingList(storedList)
      setLoading(false)
    }

    loadShoppingList()
  }, [])

  const updateShoppingList = (items: ShoppingListItem[]) => {
    setShoppingList(items)
    recipeStorage.saveShoppingList(items)
  }

  return {
    shoppingList,
    loading,
    updateShoppingList,
  }
}
