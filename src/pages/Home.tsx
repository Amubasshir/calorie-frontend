import React, { useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';
import CameraView from '../components/camera/CameraView';
import FoodRecognition from '../components/camera/FoodRecognition';
import NutritionInfo from '../components/food/NutritionInfo';
import TrendingFoods from '../components/search/TrendingFoods';
import { useFood } from '../contexts/FoodContext';
import { Food } from '../types';

const Home: React.FC = () => {
  const { searchResults, setSelectedFood, selectedFood } = useFood();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognizedFoods, setRecognizedFoods] = useState<Food[]>([]);
  
  const handleCameraClick = () => {
    setShowCamera(true);
  };
  
  const handleCameraClose = () => {
    setShowCamera(false);
    setCapturedImage(null);
  };

  console.log({capturedImage});
  
  const handleImageCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setShowCamera(false);
  };
  
  const handleFoodRecognized = (foods: Food[]) => {
    setRecognizedFoods(foods);
    setCapturedImage(null);
  };
  
  const handleRecognitionClose = () => {
    setCapturedImage(null);
    setRecognizedFoods([]);
  };
  
  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
  };
  
  const handleCloseNutritionInfo = () => {
    setSelectedFood(null);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12 text-center">
        <div className="mb-6">
          <img 
            src="/calorie-logo.png" 
            alt="Calorie Logo" 
            className="h-12 mx-auto mb-2 hidden md:block"
          />
          <h1 className="text-lg font-medium text-gray-900 dark:text-white hidden md:block">
            Dal 1999 il motore di ricerca per <span className="text-red-500">dimagrire</span>
          </h1>
        </div>
        
        <SearchBar onCameraClick={handleCameraClick} />
        <TrendingFoods />
      </section>
      
      <SearchResults 
        results={searchResults.length > 0 ? searchResults : recognizedFoods} 
        onSelectFood={handleSelectFood}
      />
      
      {showCamera && (
        <CameraView 
          onClose={handleCameraClose} 
          onCapture={handleImageCapture} 
        />
      )}
      
      {capturedImage && (
        <FoodRecognition 
          imageSrc={capturedImage} 
          onClose={handleRecognitionClose}
          onFoodRecognized={handleFoodRecognized}
        />
      )}
      
      {selectedFood && (
        <NutritionInfo 
          food={selectedFood} 
          onClose={handleCloseNutritionInfo} 
        />
      )}
    </div>
  );
};

export default Home;