import React from 'react';
import { Food } from '../../types';
import FoodCard from '../food/FoodCard';

interface SearchResultsProps {
  results: Food[];
  onSelectFood: (food: Food) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelectFood }) => {
  if (results.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((food) => (
          <FoodCard 
            key={food.id} 
            food={food} 
            onClick={() => onSelectFood(food)} 
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;