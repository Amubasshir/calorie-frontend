import React from 'react';
import { Food } from '../../types';
import { PlusCircle, Info } from 'lucide-react';

interface FoodCardProps {
  food: Food;
  onClick: () => void;
}


const FoodCard: React.FC<FoodCardProps> = ({ food, onClick }) => {
    console.log({food});
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
        <img 
          src={food?.imageUrls[0]} 
          alt={food?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-medium">{food?.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Calories</span>
            <p className="font-semibold text-green-600 dark:text-green-400">{food?.nutritionPer100g?.calories} cal</p>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Serving</span>
            <p className="font-medium text-gray-900 dark:text-gray-200">{food?.commonPortions[0]?.weightInGrams}g</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Protein</span>
            <p className="font-medium text-gray-900 dark:text-gray-200">{food?.nutritionPer100g?.macros?.protein}g</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Carbs</span>
            <p className="font-medium text-gray-900 dark:text-gray-200">{food?.nutritionPer100g?.macros?.carbs}g</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Fat</span>
            <p className="font-medium text-gray-900 dark:text-gray-200">{food?.nutritionPer100g?.macros?.fat}g</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-full py-2 flex items-center justify-center transition-colors duration-300"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </button>
          <button 
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 transition-colors duration-300"
            aria-label="More information"
          >
            <Info className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;