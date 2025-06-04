import React, { useState } from 'react';
import { useFood } from '../../contexts/FoodContext';
import { Sparkles, Apple, Droplet, Pizza, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingFoods: React.FC = () => {
  const { searchFood } = useFood();
  const [showTrendingModal, setShowTrendingModal] = useState(false);

  const trendingFoods = [
    'FAGE Total 0%',
    'Pane comune',
    'Insalata Catalonga',
    'Crispy McBacon',
    'Patate al forno',
    'Noci fresche',
    'Pane casereccio',
    { name: 'Mele', link: '/alimenti/mele' },
    'Special K',
    { name: 'Caffè', link: '/alimenti/caffe-espresso' }
  ];

  const ctaButtons = [
    { icon: Apple, label: 'Calorie Alimenti', href: '/alimenti' },
    { icon: Droplet, label: 'Calorie Bevande', href: '/bevande' },
    { icon: Pizza, label: 'Calorie Fastfood', href: '/fastfood' },
    { icon: Search, label: 'I Più Cercati', onClick: () => setShowTrendingModal(true) }
  ];

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      {/* Desktop: Show trending foods and CTAs */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 mb-3 px-2">
          <Sparkles className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Ricerche popolari
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 px-2 mb-6">
          {trendingFoods.map((food, index) => {
            if (typeof food === 'string') {
              return (
                <button
                  key={food}
                  onClick={() => searchFood(food)}
                  className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                >
                  {food}
                </button>
              );
            } else {
              return (
                <Link
                  key={food.name}
                  to={food.link}
                  className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                >
                  {food.name}
                </Link>
              );
            }
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="grid grid-cols-3 gap-4">
          {ctaButtons.slice(0, 3).map((button) => (
            <Link
              key={button.href}
              to={button.href}
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-red-500 px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-red-100 dark:border-red-900/20"
            >
              <button.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{button.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile: Show CTA buttons */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {ctaButtons.map((button, index) => {
          if (button.onClick) {
            return (
              <button
                key={index}
                onClick={button.onClick}
                className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-red-500 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-red-100 dark:border-red-900/20"
              >
                <button.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{button.label}</span>
              </button>
            );
          }
          return (
            <Link
              key={button.href}
              to={button.href}
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-red-500 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-red-100 dark:border-red-900/20"
            >
              <button.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{button.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Trending Modal */}
      {showTrendingModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ricerche popolari
                </h3>
              </div>
              <button
                onClick={() => setShowTrendingModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {trendingFoods.map((food, index) => {
                  if (typeof food === 'string') {
                    return (
                      <button
                        key={food}
                        onClick={() => {
                          searchFood(food);
                          setShowTrendingModal(false);
                        }}
                        className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                      >
                        {food}
                      </button>
                    );
                  } else {
                    return (
                      <Link
                        key={food.name}
                        to={food.link}
                        onClick={() => setShowTrendingModal(false)}
                        className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                      >
                        {food.name}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingFoods;