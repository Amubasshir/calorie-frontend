import React from 'react';
import { Food } from '../../types';
import { X, PlusCircle, MinusCircle } from 'lucide-react';

interface NutritionInfoProps {
  food: Food;
  onClose: () => void;
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ food, onClose }) => {
  const [quantity, setQuantity] = React.useState(1);
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 0.5);
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(0.5, prev - 0.5));
  };
  
  // Calculate nutrition based on quantity
  const calculatedNutrition = {
    calories: Math.round(food.calories * quantity),
    protein: Math.round(food.protein * quantity * 10) / 10,
    carbs: Math.round(food.carbs * quantity * 10) / 10,
    fat: Math.round(food.fat * quantity * 10) / 10,
    sugar: Math.round((food.sugar || 0) * quantity * 10) / 10,
    fiber: Math.round((food.fiber || 0) * quantity * 10) / 10,
    sodium: Math.round((food.sodium || 0) * quantity)
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="relative">
          <img 
            src={food.image} 
            alt={food.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{food.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {food.brand || "Generic"}
          </p>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 dark:text-gray-300">Serving Size</span>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Decrease quantity"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
                <span className="mx-3 font-medium min-w-[40px] text-center">
                  {quantity} {food.serving}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Increase quantity"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Calories</span>
              <span className="font-bold text-green-600 dark:text-green-400">{calculatedNutrition.calories}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Protein</span>
                <span className="font-medium">{calculatedNutrition.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Carbs</span>
                <span className="font-medium">{calculatedNutrition.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Fat</span>
                <span className="font-medium">{calculatedNutrition.fat}g</span>
              </div>
              
              {food.sugar !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Sugar</span>
                  <span className="font-medium">{calculatedNutrition.sugar}g</span>
                </div>
              )}
              
              {food.fiber !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Fiber</span>
                  <span className="font-medium">{calculatedNutrition.fiber}g</span>
                </div>
              )}
              
              {food.sodium !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Sodium</span>
                  <span className="font-medium">{calculatedNutrition.sodium}mg</span>
                </div>
              )}
            </div>
          </div>
          
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-300">
            Add to Daily Total
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfo;