import React, { useState } from 'react';
import { Scale, Calculator } from 'lucide-react';

const NutritionalNeeds: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a || !activityLevel) return;

    // Mifflin-St Jeor Formula
    let bmr = gender === 'male'
      ? (10 * w) + (6.25 * h) - (5 * a) + 5
      : (10 * w) + (6.25 * h) - (5 * a) - 161;

    // Activity multiplier
    const multipliers = {
      sedentary: 1.2,      // Very little activity
      light: 1.375,        // Light activity
      moderate: 1.55,      // Moderate activity
      very: 1.725,         // Very active
      extra: 1.9           // Extra active
    };

    bmr *= multipliers[activityLevel as keyof typeof multipliers];
    setResult(Math.round(bmr));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBMR();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Scale className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Calcola il tuo fabbisogno calorico giornaliero
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sesso
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value as 'male')}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Uomo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value as 'female')}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Donna</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              min="30"
              max="200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Altezza (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              min="100"
              max="250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Età (anni)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              min="15"
              max="100"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Attività svolta
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activity"
                  value="sedentary"
                  checked={activityLevel === 'sedentary'}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Attività molto ridotta (pochissimo movimento)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activity"
                  value="light"
                  checked={activityLevel === 'light'}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Attività poco ridotta (poco movimento)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activity"
                  value="moderate"
                  checked={activityLevel === 'moderate'}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Attività modesta (qualche esercizio a settimana)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activity"
                  value="very"
                  checked={activityLevel === 'very'}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Attività molto elevata (corsa, palestra, step)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activity"
                  value="extra"
                  checked={activityLevel === 'extra'}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Attività straordinaria (sport agonistici)
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            <span>Calcola fabbisogno</span>
          </button>
        </form>

        {result && (
          <div className="mt-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Risultati fabbisogno giornaliero
              </h2>
              <div className="text-4xl font-bold text-yellow-500">
                {result} Cal
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionalNeeds;