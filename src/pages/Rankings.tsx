import React, { useState } from 'react';
import { Trophy, ArrowUpDown, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

interface RankingCategory {
  label: string;
  value: string;
  options?: RankingCategory[];
}

const Rankings: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortDirection, setSortDirection] = useState<'more' | 'less'>('more');

  const categories: RankingCategory[] = [
    {
      label: "Acido aspartico",
      value: "acido-aspartico",
      options: [
        { label: "Acido fitico", value: "acido-fitico" }
      ]
    },
    { label: "Acido glutamico", value: "acido-glutamico" },
    { label: "Acqua", value: "acqua" },
    { label: "Alanina", value: "alanina" },
    { label: "Alcool", value: "alcool" },
    { label: "Amido", value: "amido" },
    { label: "Arginina", value: "arginina" },
    { label: "Calcio", value: "calcio" },
    { label: "Calorie da Alcool", value: "calorie-da-alcool" },
    { label: "Calorie da Carboidrati", value: "calorie-da-carboidrati" },
    { label: "Calorie da Lipidi", value: "calorie-da-lipidi" },
    { label: "Calorie da Proteine", value: "calorie-da-proteine" },
    { label: "Carboidrati disponibili", value: "carboidrati-disponibili" },
    { label: "Colesterolo", value: "colesterolo" },
    { label: "Energia", value: "energia" },
    { label: "Ferro", value: "ferro" },
    { label: "Fibra totale", value: "fibra-totale" },
    { label: "Proteine", value: "proteine" },
    { label: "Vitamina C", value: "vitamina-c" },
    { label: "Vitamina D", value: "vitamina-d" },
    { label: "Vitamina E", value: "vitamina-e" },
    { label: "Zinco", value: "zinco" }
  ];

  const mockRankings = [
    { name: "Mandorle", value: "245mg", percentage: "98%" },
    { name: "Noci", value: "220mg", percentage: "88%" },
    { name: "Pistacchi", value: "210mg", percentage: "84%" },
    { name: "Nocciole", value: "200mg", percentage: "80%" },
    { name: "Semi di zucca", value: "190mg", percentage: "76%" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="h-8 w-8 text-green-500" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Classifiche Alimenti
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seleziona categoria
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="">Seleziona una categoria</option>
                  {categories.map((category) => (
                    <React.Fragment key={category.value}>
                      {category.options ? (
                        <optgroup label={category.label}>
                          {category.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      ) : (
                        <option value={category.value}>{category.label}</option>
                      )}
                    </React.Fragment>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transform rotate-90" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ordina per
              </label>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <button
                  onClick={() => setSortDirection('more')}
                  className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg border text-sm md:text-base ${
                    sortDirection === 'more'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>Più alto</span>
                </button>
                <button
                  onClick={() => setSortDirection('less')}
                  className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg border text-sm md:text-base ${
                    sortDirection === 'less'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <ArrowDown className="h-4 w-4" />
                  <span>Più basso</span>
                </button>
              </div>
            </div>
          </div>

          {selectedCategory && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-2 text-green-500">
                <ArrowUpDown className="h-5 w-5" />
                <h2 className="text-base md:text-lg font-semibold">
                  Alimenti con {sortDirection === 'more' ? 'più' : 'meno'} {categories.find(c => c.value === selectedCategory)?.label.toLowerCase()}
                </h2>
              </div>

              <div className="space-y-3">
                {(sortDirection === 'less' ? [...mockRankings].reverse() : mockRankings).map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 md:p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 dark:text-green-400 font-bold text-sm md:text-base">
                          #{index + 1}
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium text-sm md:text-base">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="text-green-600 dark:text-green-400 font-medium text-sm md:text-base">
                          {item.value}
                        </span>
                        <div className="w-20 md:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: sortDirection === 'more' ? item.percentage : `${100 - parseInt(item.percentage)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rankings;