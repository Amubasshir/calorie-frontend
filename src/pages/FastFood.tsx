import React from 'react';
import { Pizza } from 'lucide-react';

const FastFood: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Pizza className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fast Food</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Contenuto in arrivo...
        </p>
      </div>
    </div>
  );
};

export default FastFood;