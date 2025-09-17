import React, { useState, useEffect } from 'react';
import { ChefHat, Calendar, ShoppingCart, Plus, Search, Filter } from 'lucide-react';
import { Recipe, MealPlan } from './types/Recipe';
import { RecipeCard } from './components/RecipeCard';
import { RecipeForm } from './components/RecipeForm';
import { MealPlanner } from './components/MealPlanner';
import { ShoppingList } from './components/ShoppingList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', []);
  const [mealPlan, setMealPlan] = useLocalStorage<MealPlan[]>('mealPlan', []);
  const [activeTab, setActiveTab] = useState<'recipes' | 'planner' | 'shopping'>('recipes');
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(recipes.map(r => r.category))];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setRecipes([...recipes, newRecipe]);
    setShowRecipeForm(false);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    setEditingRecipe(null);
    setShowRecipeForm(false);
  };

  const deleteRecipe = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setMealPlan(mealPlan.filter(m => m.recipeId !== id));
  };

  const tabs = [
    { id: 'recipes' as const, label: 'Recipes', icon: ChefHat },
    { id: 'planner' as const, label: 'Meal Planner', icon: Calendar },
    { id: 'shopping' as const, label: 'Shopping List', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ChefHat className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Recipe Manager</h1>
            </div>
            
            <nav className="flex space-x-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            {/* Recipe Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Recipes</h2>
                <p className="text-gray-600 mt-1">{recipes.length} recipes saved</p>
              </div>
              <button
                onClick={() => setShowRecipeForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Recipe</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={(recipe) => {
                    setEditingRecipe(recipe);
                    setShowRecipeForm(true);
                  }}
                  onDelete={deleteRecipe}
                />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterCategory !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by adding your first recipe!'
                  }
                </p>
                {!searchTerm && filterCategory === 'all' && (
                  <button
                    onClick={() => setShowRecipeForm(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Your First Recipe
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'planner' && (
          <MealPlanner
            recipes={recipes}
            mealPlan={mealPlan}
            onUpdateMealPlan={setMealPlan}
          />
        )}

        {activeTab === 'shopping' && (
          <ShoppingList
            recipes={recipes}
            mealPlan={mealPlan}
          />
        )}
      </main>

      {/* Recipe Form Modal */}
      {showRecipeForm && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={editingRecipe ? updateRecipe : addRecipe}
          onCancel={() => {
            setShowRecipeForm(false);
            setEditingRecipe(null);
          }}
        />
      )}
    </div>
  );
}

export default App;