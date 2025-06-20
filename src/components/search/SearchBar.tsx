import React, { useState, useRef, useEffect } from 'react';
import { useFood } from '../../contexts/FoodContext';
import { Search, Camera, X, Clock } from 'lucide-react';
import SearchHistory from './SearchHistory';

interface SearchBarProps {
  onCameraClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCameraClick }) => {
  const { searchFood, addToHistory, searchHistory } = useFood();
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        console.log(query);
      searchFood(query);
      addToHistory(query);
      setShowHistory(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleHistoryItemClick = (historyQuery: string) => {
    setQuery(historyQuery);
    searchFood(historyQuery);
    setShowHistory(false);
  };

  const handleFocus = () => {
    if (searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    searchFood('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Cerca alimenti..."
            className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#e80f00] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium md:w-auto w-full flex items-center justify-center gap-2"
        >
          <Search className="h-5 w-5" />
          <span>Cerca</span>
        </button>
      </form>

      <button
        type="button"
        onClick={onCameraClick}
        className="w-full mt-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <Camera className="h-5 w-5" />
        <span>Scatta o Carica una foto</span>
      </button>

      {showHistory && searchHistory.length > 0 && (
        <div 
          ref={historyRef}
          className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10 border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
        >
          <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ricerche recenti
            </span>
          </div>
          <SearchHistory 
            searchHistory={searchHistory} 
            onHistoryItemClick={handleHistoryItemClick} 
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;