import React, { useState } from 'react';
import { ArrowLeft, Share2, Facebook, Apple as WhatsApp, Copy, Check, Info, Scale, Flame, Cookie, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';

const FoodDetail: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [grams, setGrams] = useState('100');
  const caloriesPer100g = 45;

  const calculateCalories = () => {
    const weight = parseFloat(grams);
    if (isNaN(weight)) return 0;
    return Math.round((weight / 100) * caloriesPer100g);
  };

  const nutritionData = {
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fiber: 2.4,
    sugar: 10.4,
    fat: 0.2,
    vitamins: {
      C: 4.6,
      B6: 0.041,
      K: 2.2
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Scopri le proprietà nutrizionali della Mela su CalorieTracker!";
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const suggestedFoods = [
    { name: 'Frittelle di mele', link: '/alimenti/frittelle-di-mele' },
    { name: 'Mele cotogne', link: '/alimenti/mele-cotogne' },
    { name: 'Mele cotte', link: '/alimenti/mele-cotte' },
    { name: 'Mele disidratate', link: '/alimenti/mele-disidratate' },
    { name: 'Mele secche', link: '/alimenti/mele-secche' },
    { name: 'Strudel di mele', link: '/alimenti/strudel-di-mele' },
    { name: 'Torta di mele', link: '/alimenti/torta-di-mele' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search Bar Section */}
      <div className="mb-8">
        <SearchBar onCameraClick={() => {}} />
      </div>

      {/* Navigation and Share */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/alimenti"
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Torna agli alimenti
        </Link>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShare('facebook')}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
            title="Condividi su Facebook"
          >
            <Facebook className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
            title="Condividi su WhatsApp"
          >
            <WhatsApp className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title={copied ? 'Link copiato!' : 'Copia link'}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mela</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Frutta fresca</p>

          {/* Calorie Calculator */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-4 md:p-8 mb-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Calcola le Calorie
                </h2>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full inline-flex items-center gap-2 text-lg font-medium">
                  <Flame className="h-6 w-6 text-red-500" />
                  <span className="text-gray-900 dark:text-white">45 calorie per 100g</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={grams}
                    onChange={(e) => setGrams(e.target.value)}
                    className="w-full px-4 py-3 md:px-6 md:py-4 text-base md:text-lg rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring focus:ring-red-200 text-center font-medium"
                    placeholder="Inserisci i grammi"
                  />
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-red-100 dark:bg-red-900/20 px-2 py-0.5 rounded text-xs md:text-sm font-medium text-red-600 dark:text-red-400">
                    grammi
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 text-center shadow-lg">
                  <div className="text-5xl md:text-7xl font-bold text-red-500 mb-1 md:mb-2 tracking-tight">
                    {calculateCalories()}
                  </div>
                  <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                    calorie
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full">
                    <Info className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Un frutto medio ha 90 calorie
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cookie className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Carboidrati</span>
              </div>
              <div className="text-xl font-bold text-yellow-500">{nutritionData.carbs}g</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Scale className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Proteine</span>
              </div>
              <div className="text-xl font-bold text-green-500">{nutritionData.protein}g</div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Info className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Grassi</span>
              </div>
              <div className="text-xl font-bold text-blue-500">{nutritionData.fat}g</div>
            </div>
          </div>

          {/* Additional Nutrition Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Valori Nutrizionali Dettagliati
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Fibre</span>
                <span className="font-medium">{nutritionData.fiber}g</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.fiber / 25) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Zuccheri</span>
                <span className="font-medium">{nutritionData.sugar}g</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-pink-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.sugar / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* Vitamins */}
            {Object.entries(nutritionData.vitamins).map(([vitamin, value]) => (
              <div key={vitamin} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Vitamina {vitamin}</span>
                  <span className="font-medium">{value}mg</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(value / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <span>Ti potrebbero interessare anche</span>
          <div className="flex-1 border-b border-gray-200 dark:border-gray-700 ml-4" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedFoods.map((food) => (
            <Link
              key={food.name}
              to={food.link}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between group hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                  <WhatsApp className="h-6 w-6 text-red-500" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                  {food.name}
                </h4>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;