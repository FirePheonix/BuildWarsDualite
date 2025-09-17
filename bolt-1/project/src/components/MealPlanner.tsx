import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { Recipe, MealPlan } from '../types/Recipe';

interface MealPlannerProps {
  recipes: Recipe[];
  mealPlan: MealPlan[];
  onUpdateMealPlan: (mealPlan: MealPlan[]) => void;
}

export function MealPlanner({ recipes, mealPlan, onUpdateMealPlan }: MealPlannerProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showRecipeSelector, setShowRecipeSelector] = useState<{ date: string; mealType: string } | null>(null);

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMealForSlot = (date: string, mealType: string) => {
    const meal = mealPlan.find(m => m.date === date && m.mealType === mealType);
    if (!meal) return null;
    
    const recipe = recipes.find(r => r.id === meal.recipeId);
    return recipe ? { meal, recipe } : null;
  };

  const addMealToSlot = (recipeId: string, date: string, mealType: string) => {
    const newMeal: MealPlan = {
      id: Date.now().toString(),
      recipeId,
      date,
      mealType: mealType as any,
      servings: recipes.find(r => r.id === recipeId)?.servings || 1,
    };

    // Remove existing meal in this slot
    const updatedMealPlan = mealPlan.filter(m => !(m.date === date && m.mealType === mealType));
    onUpdateMealPlan([...updatedMealPlan, newMeal]);
    setShowRecipeSelector(null);
  };

  const removeMealFromSlot = (date: string, mealType: string) => {
    const updatedMealPlan = mealPlan.filter(m => !(m.date === date && m.mealType === mealType));
    onUpdateMealPlan(updatedMealPlan);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meal Planner</h2>
          <p className="text-gray-600 mt-1">Plan your weekly meals</p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <Calendar className="h-5 w-5" />
            <span>
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
              {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Meal Planning Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 divide-x divide-gray-200">
          {/* Header Row */}
          <div className="bg-gray-50 p-4 font-medium text-gray-700 text-center">
            Meal
          </div>
          {weekDates.map((date) => (
            <div key={date.toISOString()} className="bg-gray-50 p-4 text-center">
              <div className="font-medium text-gray-900">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* Meal Rows */}
        {mealTypes.map((mealType) => (
          <div key={mealType} className="grid grid-cols-8 divide-x divide-gray-200 border-t border-gray-200">
            <div className="bg-gray-50 p-4 font-medium text-gray-700 capitalize flex items-center justify-center">
              {mealType}
            </div>
            {weekDates.map((date) => {
              const dateString = formatDate(date);
              const mealData = getMealForSlot(dateString, mealType);
              
              return (
                <div key={dateString} className="p-3 min-h-[120px] relative group">
                  {mealData ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 h-full relative">
                      <button
                        onClick={() => removeMealFromSlot(dateString, mealType)}
                        className="absolute top-1 right-1 p-1 text-emerald-600 hover:bg-emerald-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="text-sm font-medium text-emerald-900 line-clamp-2 mb-1">
                        {mealData.recipe.name}
                      </div>
                      <div className="text-xs text-emerald-700">
                        {mealData.meal.servings} serving{mealData.meal.servings !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-emerald-600 mt-1">
                        {mealData.recipe.prepTime + mealData.recipe.cookTime}m
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowRecipeSelector({ date: dateString, mealType })}
                      className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-colors group"
                    >
                      <Plus className="h-6 w-6" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Recipe Selector Modal */}
      {showRecipeSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Recipe for {showRecipeSelector.mealType} on {' '}
                  {new Date(showRecipeSelector.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => setShowRecipeSelector(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-96 p-6">
              {recipes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No recipes available. Add some recipes first!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {recipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => addMealToSlot(recipe.id, showRecipeSelector.date, showRecipeSelector.mealType)}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-left"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {recipe.imageUrl ? (
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🍽️
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{recipe.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{recipe.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{recipe.prepTime + recipe.cookTime}m</span>
                          <span>{recipe.servings} servings</span>
                          <span>{recipe.category}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}