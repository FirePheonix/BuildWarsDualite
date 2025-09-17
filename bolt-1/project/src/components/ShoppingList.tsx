import React, { useState, useMemo } from 'react';
import { ShoppingCart, Check, Plus, Trash2 } from 'lucide-react';
import { Recipe, MealPlan, ShoppingItem } from '../types/Recipe';

interface ShoppingListProps {
  recipes: Recipe[];
  mealPlan: MealPlan[];
}

export function ShoppingList({ recipes, mealPlan }: ShoppingListProps) {
  const [customItems, setCustomItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const shoppingItems = useMemo(() => {
    const ingredientMap = new Map<string, { amount: number; unit: string; category?: string }>();

    // Process meal plan ingredients
    mealPlan.forEach((meal) => {
      const recipe = recipes.find(r => r.id === meal.recipeId);
      if (!recipe) return;

      const servingMultiplier = meal.servings / recipe.servings;

      recipe.ingredients.forEach((ingredient) => {
        const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
        const adjustedAmount = ingredient.amount * servingMultiplier;

        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key)!;
          existing.amount += adjustedAmount;
        } else {
          ingredientMap.set(key, {
            amount: adjustedAmount,
            unit: ingredient.unit,
            category: 'Meal Plan'
          });
        }
      });
    });

    // Convert to shopping items
    const generatedItems: ShoppingItem[] = Array.from(ingredientMap.entries()).map(([key, data]) => {
      const name = key.split('-').slice(0, -1).join('-');
      return {
        id: key,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        amount: Math.round(data.amount * 100) / 100, // Round to 2 decimal places
        unit: data.unit,
        checked: checkedItems.has(key),
        category: data.category
      };
    });

    return [...generatedItems, ...customItems];
  }, [recipes, mealPlan, customItems, checkedItems]);

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const addCustomItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      amount: 1,
      unit: 'item',
      checked: false,
      category: 'Custom'
    };

    setCustomItems([...customItems, newItem]);
    setNewItemName('');
  };

  const removeCustomItem = (itemId: string) => {
    setCustomItems(customItems.filter(item => item.id !== itemId));
    const newCheckedItems = new Set(checkedItems);
    newCheckedItems.delete(itemId);
    setCheckedItems(newCheckedItems);
  };

  const clearCheckedItems = () => {
    const checkedCustomItems = customItems
      .filter(item => checkedItems.has(item.id))
      .map(item => item.id);
    
    setCustomItems(customItems.filter(item => !checkedItems.has(item.id)));
    setCheckedItems(new Set());
  };

  const groupedItems = shoppingItems.reduce((groups, item) => {
    const category = item.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, ShoppingItem[]>);

  const completedCount = shoppingItems.filter(item => checkedItems.has(item.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shopping List</h2>
          <p className="text-gray-600 mt-1">
            {shoppingItems.length} items • {completedCount} completed
          </p>
        </div>

        {completedCount > 0 && (
          <button
            onClick={clearCheckedItems}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Completed</span>
          </button>
        )}
      </div>

      {/* Add Custom Item */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Custom Item</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
            placeholder="Add custom item..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={addCustomItem}
            disabled={!newItemName.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Shopping List */}
      {shoppingItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items in your shopping list</h3>
          <p className="text-gray-600">
            Add some meals to your meal planner or add custom items to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                <p className="text-sm text-gray-600">
                  {items.length} item{items.length !== 1 ? 's' : ''} • {' '}
                  {items.filter(item => checkedItems.has(item.id)).length} completed
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors ${
                      checkedItems.has(item.id) ? 'opacity-60' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        checkedItems.has(item.id)
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300 hover:border-emerald-400'
                      }`}
                    >
                      {checkedItems.has(item.id) && <Check className="h-4 w-4" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${
                        checkedItems.has(item.id) ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.amount} {item.unit}
                      </div>
                    </div>

                    {item.category === 'Custom' && (
                      <button
                        onClick={() => removeCustomItem(item.id)}
                        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress Summary */}
      {shoppingItems.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Shopping Progress</span>
            <span className="text-sm text-gray-600">
              {completedCount} of {shoppingItems.length} items
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${shoppingItems.length > 0 ? (completedCount / shoppingItems.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}