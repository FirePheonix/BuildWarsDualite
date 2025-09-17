"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/lib/recipe-storage"
import { ArrowLeft, Clock, Users, Edit, Trash2, Calendar } from "lucide-react"

interface RecipeDetailProps {
  recipe: Recipe
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onAddToMealPlan?: () => void
}

export function RecipeDetail({ recipe, onBack, onEdit, onDelete, onAddToMealPlan }: RecipeDetailProps) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-balance">{recipe.title}</h1>
          {recipe.description && <p className="text-lg text-muted-foreground mt-2 text-pretty">{recipe.description}</p>}
        </div>
        <div className="flex gap-2">
          {onAddToMealPlan && (
            <Button variant="outline" onClick={onAddToMealPlan} className="flex items-center gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Add to Meal Plan
            </Button>
          )}
          <Button variant="outline" onClick={onEdit} className="flex items-center gap-2 bg-transparent">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={onDelete}
            className="flex items-center gap-2 text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipe Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time and Servings */}
              <div className="space-y-3">
                {recipe.prepTime && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Prep Time</span>
                    </div>
                    <span className="font-medium">{recipe.prepTime} min</span>
                  </div>
                )}

                {recipe.cookTime && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Cook Time</span>
                    </div>
                    <span className="font-medium">{recipe.cookTime} min</span>
                  </div>
                )}

                {totalTime > 0 && (
                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Total Time</span>
                    </div>
                    <span className="font-bold text-primary">{totalTime} min</span>
                  </div>
                )}

                {recipe.servings && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Servings</span>
                    </div>
                    <span className="font-medium">{recipe.servings}</span>
                  </div>
                )}
              </div>

              {/* Category */}
              {recipe.category && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <Badge variant="secondary">{recipe.category}</Badge>
                </div>
              )}

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Created Date */}
              <div className="text-xs text-muted-foreground pt-4 border-t">
                Created: {recipe.createdAt.toLocaleDateString()}
                {recipe.updatedAt.getTime() !== recipe.createdAt.getTime() && (
                  <div>Updated: {recipe.updatedAt.toLocaleDateString()}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients and Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-pretty">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-pretty leading-relaxed">{instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
