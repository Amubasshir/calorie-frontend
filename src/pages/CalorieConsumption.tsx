import React, { useState } from 'react';
import { Flame, Calculator, Info, Search, Star } from 'lucide-react';

interface Activity {
  name: string;
  caloriesPerHour: number;
  popular?: boolean;
}

const CalorieConsumption: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activities: Activity[] = [
    // Popular activities first
    { name: 'Corsa (10 km/h)', caloriesPerHour: 600, popular: true },
    { name: 'Camminata veloce (6 km/h)', caloriesPerHour: 266, popular: true },
    { name: 'Nuoto (stile libero)', caloriesPerHour: 500, popular: true },
    { name: 'Ciclismo (16-19 km/h)', caloriesPerHour: 400, popular: true },
    { name: 'Yoga', caloriesPerHour: 200, popular: true },
    { name: 'Pilates', caloriesPerHour: 200, popular: true },
    { name: 'Calcio', caloriesPerHour: 466, popular: true },
    { name: 'Tennis', caloriesPerHour: 400, popular: true },
    // Regular activities
    { name: 'Aerobica ad alto impatto', caloriesPerHour: 533 },
    { name: 'Aerobica a basso impatto', caloriesPerHour: 266 },
    { name: 'Allenamento con i pesi', caloriesPerHour: 300 },
    { name: 'Andare in bicicletta (12-14 km/h)', caloriesPerHour: 266 },
    { name: 'Andare in bicicletta (14-16 km/h)', caloriesPerHour: 333 },
    { name: 'Andare in bicicletta (19-22 km/h)', caloriesPerHour: 466 },
    { name: 'Andare in bicicletta (22-25 km/h)', caloriesPerHour: 533 },
    { name: 'Andare in bicicletta (25-30 km/h)', caloriesPerHour: 666 },
    { name: 'Arrampicata', caloriesPerHour: 450 },
    { name: 'Badminton', caloriesPerHour: 350 },
    { name: 'Basket (partita)', caloriesPerHour: 466 },
    { name: 'Basket (allenamento)', caloriesPerHour: 400 },
    { name: 'Beach Volley', caloriesPerHour: 400 },
    { name: 'Boxe (ring)', caloriesPerHour: 800 },
    { name: 'Boxe (sacco)', caloriesPerHour: 400 },
    { name: 'Camminare (4 km/h)', caloriesPerHour: 133 },
    { name: 'Camminare (5 km/h)', caloriesPerHour: 200 },
    { name: 'Canottaggio (gara)', caloriesPerHour: 622 },
    { name: 'Canottaggio (moderato)', caloriesPerHour: 407 },
    { name: 'Corsa (8 km/h)', caloriesPerHour: 450 },
    { name: 'Corsa (9 km/h)', caloriesPerHour: 500 },
    { name: 'Corsa (11 km/h)', caloriesPerHour: 650 },
    { name: 'Corsa (12 km/h)', caloriesPerHour: 700 },
    { name: 'Corsa (13 km/h)', caloriesPerHour: 750 },
    { name: 'Corsa (14 km/h)', caloriesPerHour: 800 },
    { name: 'Corsa (16 km/h)', caloriesPerHour: 900 },
    { name: 'CrossFit', caloriesPerHour: 500 },
    { name: 'Danza aerobica', caloriesPerHour: 400 },
    { name: 'Danza ballroom', caloriesPerHour: 219 },
    { name: 'Danza moderna', caloriesPerHour: 333 },
    { name: 'Ellittica', caloriesPerHour: 400 },
    { name: 'Escursionismo', caloriesPerHour: 350 },
    { name: 'Fitness in acqua', caloriesPerHour: 300 },
    { name: 'Functional Training', caloriesPerHour: 450 },
    { name: 'Golf (con cart)', caloriesPerHour: 200 },
    { name: 'Golf (camminando)', caloriesPerHour: 300 },
    { name: 'Hockey su ghiaccio', caloriesPerHour: 500 },
    { name: 'Indoor Cycling', caloriesPerHour: 450 },
    { name: 'Judo', caloriesPerHour: 600 },
    { name: 'Karate', caloriesPerHour: 600 },
    { name: 'Kickboxing', caloriesPerHour: 600 },
    { name: 'Nordic Walking', caloriesPerHour: 300 },
    { name: 'Nuoto (dorso)', caloriesPerHour: 400 },
    { name: 'Nuoto (rana)', caloriesPerHour: 450 },
    { name: 'Nuoto (farfalla)', caloriesPerHour: 550 },
    { name: 'Paddle', caloriesPerHour: 350 },
    { name: 'Pallavolo', caloriesPerHour: 200 },
    { name: 'Pattinaggio su ghiaccio', caloriesPerHour: 300 },
    { name: 'Pattinaggio in linea', caloriesPerHour: 350 },
    { name: 'Ping Pong', caloriesPerHour: 200 },
    { name: 'Pugilato (allenamento)', caloriesPerHour: 500 },
    { name: 'Rugby', caloriesPerHour: 600 },
    { name: 'Salto con la corda', caloriesPerHour: 600 },
    { name: 'Sci di fondo', caloriesPerHour: 533 },
    { name: 'Sci (discesa)', caloriesPerHour: 400 },
    { name: 'Skateboard', caloriesPerHour: 250 },
    { name: 'Snowboard', caloriesPerHour: 350 },
    { name: 'Spinning', caloriesPerHour: 450 },
    { name: 'Squash', caloriesPerHour: 500 },
    { name: 'Step', caloriesPerHour: 400 },
    { name: 'Surf', caloriesPerHour: 200 },
    { name: 'Taekwondo', caloriesPerHour: 600 },
    { name: 'Tai Chi', caloriesPerHour: 200 },
    { name: 'Tennis da tavolo', caloriesPerHour: 250 },
    { name: 'Trekking', caloriesPerHour: 400 },
    { name: 'Vogatore', caloriesPerHour: 450 },
    { name: 'Volleyball', caloriesPerHour: 300 },
    { name: 'Zumba', caloriesPerHour: 400 }
  ].sort((a, b) => {
    // Sort by popularity first, then alphabetically
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return a.name.localeCompare(b.name);
  });

  const calculateCalories = () => {
    if (!weight || !duration || !selectedActivity) return 0;

    const activity = activities.find(a => a.name === selectedActivity);
    if (!activity) return 0;

    const weightNum = parseFloat(weight);
    const durationHours = parseFloat(duration) / 60; // Convert minutes to hours
    const baseCalories = activity.caloriesPerHour * durationHours;
    
    // Adjust calories based on weight (using 60kg as reference weight)
    const weightAdjustedCalories = baseCalories * (weightNum / 60);
    
    return Math.round(weightAdjustedCalories);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Flame className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Consumo Calorie</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                Calcola le Calorie
              </h2>

              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Peso (Kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Es: 70"
                    required
                    min="30"
                    max="200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tempo (in minuti)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Es: 30"
                    required
                    min="1"
                    max="1440"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Calcola</span>
                </button>
              </form>

              {showResults && selectedActivity && (
                <div className="mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-6 text-center">
                    <div className="mb-4">
                      <Flame className="h-12 w-12 text-blue-500 mx-auto" />
                    </div>
                    <div className="text-4xl font-bold text-blue-500 mb-2">
                      {calculateCalories()} kcal
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Calorie bruciate stimate
                    </p>
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>
                      Questi calcoli sono stime basate su valori medi. Il consumo effettivo di calorie può variare in base a diversi fattori come età, composizione corporea e intensità dell'esercizio.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activities List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Lista Attività
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca attività..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.name}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedActivity === activity.name
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedActivity(activity.name)}
                  >
                    <div className="flex items-center gap-2">
                      {activity.popular && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                      <span className="text-gray-900 dark:text-white">{activity.name}</span>
                    </div>
                    <span className="text-blue-500 font-medium">{activity.caloriesPerHour} kcal/ora</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieConsumption;