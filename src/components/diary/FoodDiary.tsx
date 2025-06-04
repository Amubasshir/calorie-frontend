import React from 'react';
import { Plus, BarChart, Calendar, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FoodDiary: React.FC = () => {
  const meals = [
    {
      name: 'Colazione',
      time: '08:00',
      calories: 350,
      items: [
        {
          name: 'Yogurt greco',
          calories: 150,
          image: 'https://images.pexels.com/photos/5946606/pexels-photo-5946606.jpeg'
        },
        {
          name: 'Mela',
          calories: 95,
          image: 'https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg'
        },
        {
          name: 'Cereali',
          calories: 105,
          image: 'https://images.pexels.com/photos/543730/pexels-photo-543730.jpeg'
        }
      ]
    },
    {
      name: 'Spuntino',
      time: '10:30',
      calories: 150,
      items: [
        {
          name: 'Banana',
          calories: 150,
          image: 'https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg'
        }
      ]
    },
    {
      name: 'Pranzo',
      time: '13:00',
      calories: 650,
      items: [
        {
          name: 'Petto di pollo',
          calories: 165,
          image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
        },
        {
          name: 'Quinoa',
          calories: 222,
          image: 'https://images.pexels.com/photos/543730/pexels-photo-543730.jpeg'
        },
        {
          name: 'Spinaci',
          calories: 23,
          image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg'
        }
      ]
    }
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const targetCalories = 2000;
  const remainingCalories = targetCalories - totalCalories;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Calendar className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Il Mio Diario Alimentare
            </h2>
          </div>
          <Link
            to="/pricing"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center gap-2"
          >
            <Camera className="h-5 w-5" />
            <span>Sblocca Scanner</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Calorie assunte</p>
            <p className="text-2xl font-bold text-red-500">{totalCalories}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Obiettivo giornaliero</p>
            <p className="text-2xl font-bold text-green-500">{targetCalories}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Calorie rimanenti</p>
            <p className="text-2xl font-bold text-blue-500">{remainingCalories}</p>
          </div>
        </div>

        <div className="space-y-6">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{meal.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium text-red-500">{meal.calories} cal</p>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {meal.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="h-24 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs">{item.calories} cal</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <BarChart className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Statistiche Settimanali
          </h2>
        </div>
        
        <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Grafico statistiche (da implementare)</p>
        </div>
      </div>
    </div>
  );
};

export default FoodDiary;