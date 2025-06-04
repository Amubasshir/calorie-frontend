import React, { createContext, useContext, useState, useEffect } from 'react';
import { Food, SearchHistory } from '../types';
import { mockFoodData } from '../utils/mockData';

interface FoodContextType {
  foods: Food[];
  searchResults: Food[];
  searchHistory: SearchHistory[];
  searchFood: (query: string) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  selectedFood: Food | null;
  setSelectedFood: (food: Food | null) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>(mockFoodData);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const searchFood = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = foods.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      const existing = prev.find(item => item.query === query);
      
      if (existing) {
        return [
          { query, timestamp: Date.now() },
          ...prev.filter(item => item.query !== query)
        ];
      } else {
        const newHistory = [
          { query, timestamp: Date.now() },
          ...prev
        ];
        return newHistory.slice(0, 10); // Keep only the last 10 searches
      }
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <FoodContext.Provider value={{
      foods,
      searchResults,
      searchHistory,
      searchFood,
      addToHistory,
      clearHistory,
      selectedFood,
      setSelectedFood
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = (): FoodContextType => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};