import React, { useState } from 'react';
import { Search, ChevronRight, Apple, Droplet, Pizza } from 'lucide-react';
import { useFood } from '../contexts/FoodContext';
import FoodCard from '../components/food/FoodCard';
import SearchBar from '../components/search/SearchBar';
import TrendingFoods from '../components/search/TrendingFoods';
import { Link } from 'react-router-dom';

const Foods: React.FC = () => {
  const { foods, setSelectedFood } = useFood();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'biscotti', name: 'BISCOTTI', examples: ['Biscotti all\'avena', 'Biscotti al cacao', 'Wafer alla nocciola', 'Cookies', 'Frollini', 'Digestive'] },
    { id: 'condimenti', name: 'CONDIMENTI', examples: ['Crema di latte (25%)', 'Margarina vegetale', 'Paprika', 'Olio di oliva', 'Aceto balsamico', 'Pesto'] },
    { id: 'carne', name: 'CARNE', examples: ['Capriolo', 'Lumaca', 'Canguro', 'Manzo', 'Pollo', 'Maiale'] },
    { id: 'carni-conservate', name: 'CARNI TRASFORMATE E CONSERVATE', examples: ['Prosciutto S. Daniele', 'Prosciutto cotto', 'Capocollo', 'Mortadella', 'Salame', 'Pancetta'] },
    { id: 'cereali', name: 'CEREALI', examples: ['Miglio decorticato', 'Fiocchi di mais', 'Mais bollito', 'Avena', 'Orzo', 'Farro'] },
    { id: 'dolci', name: 'DOLCI E DESSERT', examples: ['Pandoro', 'Pasta frolla', 'Cioccolatini', 'Tiramisù', 'Cannoli', 'Profiteroles'] },
    { id: 'dolcificanti', name: 'DOLCIFICANTI', examples: ['Miele di castagno', 'Dietor', 'Miele', 'Stevia', 'Sciroppo d\'acero', 'Zucchero di canna'] },
    { id: 'frutta', name: 'FRUTTA', examples: ['Papaya', 'Mela imperatore', 'Ananas', 'Banana', 'Arancia', 'Pera'] },
    { id: 'farine', name: 'FARINE', examples: ['Farina di mais', 'Farina di frumento', 'Farina di kamut', 'Farina integrale', 'Farina di riso', 'Farina di mandorle'] }
  ];

  const ctaButtons = [
    { icon: Apple, label: 'Calorie Alimenti', href: '/alimenti' },
    { icon: Droplet, label: 'Calorie Bevande', href: '/bevande' },
    { icon: Pizza, label: 'Calorie Fastfood', href: '/fastfood' }
  ];

  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Alimenti
        </h1>
        <SearchBar onCameraClick={() => {}} />
        <TrendingFoods />
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {/* Mobile: Only show category name and link */}
              <div className="md:hidden">
                <Link
                  to={`/alimenti/${category.id}`}
                  className="flex items-center justify-between group"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-500">
                    {category.name}
                  </h2>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                </Link>
              </div>

              {/* Desktop: Show category name and examples */}
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  {category.name}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {category.examples.map((example, index) => (
                    <Link
                      key={index}
                      to={`/alimenti/${category.id}/${example.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {example}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    to={`/alimenti/${category.id}`}
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                  >
                    <span>Visualizza Tutti</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {searchQuery && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Risultati della ricerca
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoods.map((food) => (
              <Link key={food.id} to={`/alimenti/${food.id}`}>
                <FoodCard
                  food={food}
                  onClick={() => setSelectedFood(food)}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile CTAs at the bottom */}
      <div className="md:hidden mt-8 space-y-3">
        {ctaButtons.map((button) => (
          <Link
            key={button.href}
            to={button.href}
            className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-red-500 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-red-100 dark:border-red-900/20"
          >
            <button.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">{button.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Foods;