import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Food } from '../../types';
import { mockFoodData } from '../../utils/mockData';
import { dataURLtoFile } from '../../utils/dataURLToFile';
import { imageAnalysisService } from '../../services/imageAnalysis.service';

interface FoodRecognitionProps {
  imageSrc: string;
  onClose: () => void;
  onFoodRecognized: (foods: Food[]) => void;
}

const FoodRecognition: React.FC<FoodRecognitionProps> = ({ 
  imageSrc, 
  onClose, 
  onFoodRecognized 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [recognizedFoods, setRecognizedFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate AI food recognition process
  useEffect(() => {
    const file = dataURLtoFile(imageSrc as string);
    console.log({file, imageSrc});
      const analyzedFood = async () => {
    const formData = new FormData();
    formData.append('image', file);
        try {
            const result = await imageAnalysisService.analysisImage(formData)
console.log("i am from image", {result});
        } catch (error) {
            console.log({error});
        }
      }

      analyzedFood();


    // const analyzeFood = async () => {
    //   try {
    //     // This is where you would normally call an actual food recognition API
    //     // For now, we'll just simulate it with a timeout and mock data
    //     await new Promise(resolve => setTimeout(resolve, 2500));
        
    //     // Randomly select 1-3 food items from our mock database
    //     const numberOfItems = Math.floor(Math.random() * 3) + 1;
    //     const selectedFoods: Food[] = [];
        
    //     const availableFoods = [...mockFoodData];
        
    //     for (let i = 0; i < numberOfItems; i++) {
    //       if (availableFoods.length === 0) break;
          
    //       const randomIndex = Math.floor(Math.random() * availableFoods.length);
    //       selectedFoods.push(availableFoods[randomIndex]);
    //       availableFoods.splice(randomIndex, 1);
    //     }
        
    //     setRecognizedFoods(selectedFoods);
    //     setIsAnalyzing(false);
        
    //     // Only fire the callback if we found foods
    //     if (selectedFoods.length > 0) {
    //       onFoodRecognized(selectedFoods);
    //     }
    //   } catch (err) {
    //     console.error('Error analyzing food:', err);
    //     setError('Failed to analyze food image. Please try again.');
    //     setIsAnalyzing(false);
    //   }
    // };
    
    // analyzeFood();
  }, [imageSrc, onFoodRecognized]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center">
        {isAnalyzing ? (
          <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin mb-4 text-green-500 mx-auto" />
            <h2 className="text-white text-xl font-semibold mb-2">Analyzing your food...</h2>
            <p className="text-gray-300">Our AI is looking at your image to identify foods and calculate nutrition information.</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <AlertCircle className="h-16 w-16 mb-4 text-red-500 mx-auto" />
            <h2 className="text-white text-xl font-semibold mb-2">Recognition Error</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={onClose}
              className="mt-6 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : recognizedFoods.length === 0 ? (
          <div className="text-center">
            <AlertCircle className="h-16 w-16 mb-4 text-yellow-500 mx-auto" />
            <h2 className="text-white text-xl font-semibold mb-2">No Foods Detected</h2>
            <p className="text-gray-300">We couldn't identify any foods in your image. Please try again with a clearer photo.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <h2 className="text-white text-xl font-semibold mb-4">Recognized Foods</h2>
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={imageSrc} 
                alt="Food capture" 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-gray-900 font-medium mb-2">Detected Items:</h3>
                <ul className="space-y-2">
                  {recognizedFoods.map((food, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{food.name}</span>
                      <span className="text-green-600 font-medium">{food.calories} cal</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Calories:</span>
                    <span className="text-green-600">
                      {recognizedFoods.reduce((total, food) => total + food.calories, 0)} cal
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodRecognition;