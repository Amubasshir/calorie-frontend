import React from 'react';
import { SearchHistory as SearchHistoryType } from '../../types';
import { Clock, X } from 'lucide-react';
import { useFood } from '../../contexts/FoodContext';

interface SearchHistoryProps {
  searchHistory: SearchHistoryType[];
  onHistoryItemClick: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ 
  searchHistory, 
  onHistoryItemClick 
}) => {
  const { clearHistory } = useFood();
  
  if (searchHistory.length === 0) {
    return null;
  }
  
  return (
    <div>
      <ul>
        {searchHistory.map((item, index) => (
          <li 
            key={`${item.query}-${index}`} 
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
            onClick={() => onHistoryItemClick(item.query)}
          >
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">{item.query}</span>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={clearHistory}
          className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300 flex items-center justify-center"
        >
          <X className="h-3 w-3 mr-1" />
          Cancella ricerche recenti
        </button>
      </div>
    </div>
  );
};

export default SearchHistory;