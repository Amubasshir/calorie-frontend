import React, { useState } from 'react';
import { ArrowLeft, Share2, Facebook, Coffee as CoffeeIcon, Copy, Check, Info, Scale, Flame, Cookie, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';

const CoffeeDetail: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [servings, setServings] = useState('1');
  const caloriesPerServing = 1;

  const calculateCalories = () => {
    const amount = parseFloat(servings);
    if (isNaN(amount)) return 0;
    return Math.round(amount * caloriesPerServing);
  };

  const nutritionData = {
    calories: 1,
    protein: 0.1,
    carbs: 0,
    fat: 0,
    caffeine: 80,
    antioxidants: 200,
    minerals: {
      potassium: 40,
      magnesium: 7,
      calcium: 2
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Scopri le proprietà nutrizionali del Caffè Espresso su CalorieTracker!";
    
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

  const suggestedItems = [
    { name: 'Caffè americano', link: '/alimenti/caffe-americano' },
    { name: 'Caffè macchiato', link: '/alimenti/caffe-macchiato' },
    { name: 'Caffè decaffeinato', link: '/alimenti/caffe-decaffeinato' },
    { name: 'Cappuccino', link: '/alimenti/cappuccino' },
    { name: 'Caffè d\'orzo', link: '/alimenti/caffe-orzo' },
    { name: 'Caffè al ginseng', link: '/alimenti/caffe-ginseng' }
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
            <CoffeeIcon className="h-5 w-5" />
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Caffè espresso</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Bevanda calda</p>

          {/* Calorie Calculator */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-4 md:p-8 mb-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Calcola le Calorie
                </h2>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full inline-flex items-center gap-2 text-lg font-medium">
                  <Flame className="h-6 w-6 text-red-500" />
                  <span className="text-gray-900 dark:text-white">1 caloria per tazzina</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-4 py-3 md:px-6 md:py-4 text-base md:text-lg rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring focus:ring-red-200 text-center font-medium"
                    placeholder="Inserisci il numero di tazzine"
                  />
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-red-100 dark:bg-red-900/20 px-2 py-0.5 rounded text-xs md:text-sm font-medium text-red-600 dark:text-red-400">
                    tazzine
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
                      Una tazzina di caffè espresso (30ml) ha 1 caloria
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
                <span className="text-gray-600 dark:text-gray-300">Caffeina</span>
                <span className="font-medium">{nutritionData.caffeine}mg</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.caffeine / 100) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Antiossidanti</span>
                <span className="font-medium">{nutritionData.antioxidants}mg</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(nutritionData.antioxidants / 250) * 100}%` }}
                />
              </div>
            </div>

            {/* Minerals */}
            {Object.entries(nutritionData.minerals).map(([mineral, value]) => (
              <div key={mineral} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">{mineral.charAt(0).toUpperCase() + mineral.slice(1)}</span>
                  <span className="font-medium">{value}mg</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(value / 50) * 100}%` }}
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
          {suggestedItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between group hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                  <CoffeeIcon className="h-6 w-6 text-red-500" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                  {item.name}
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

export default CoffeeDetail;