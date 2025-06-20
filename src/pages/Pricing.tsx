import React from 'react';
import { Camera, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscriptionService } from '../services/subscription.service';

const Pricing: React.FC = () => {
  const features = [
    '20 scansioni di alimenti al giorno',
    'Riconoscimento automatico del cibo',
    'Diario alimentare personalizzato',
    'Statistiche dettagliate'
  ];

  const handleProceed = async () => {
    try {
        const result = await subscriptionService.checkout("PIANO_PREMIUM");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    // Implement your logic for proceeding with the premium plan
    console.log('Proceeding to premium plan');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Piano Premium
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Sblocca tutte le funzionalità premium e monitora la tua alimentazione con precisione
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 text-center">
          <div className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mb-4">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            20 scansioni al giorno
          </h2>
          <div className="text-4xl font-bold text-white mb-4">
            €5.99
            <span className="text-lg font-normal text-white/80">/mese</span>
          </div>
          <button
            // to="/register"
            onClick={handleProceed}
            className="block w-full bg-white text-red-600 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors duration-300"
          >
            Inizia ora
          </button>
        </div>

        <div className="p-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
            <Star className="h-5 w-5 text-yellow-400" />
            Caratteristiche incluse
          </h3>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-500" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hai delle domande? {' '}
          <a href="#" className="text-red-500 hover:text-red-600">
            Contattaci
          </a>
        </p>
      </div>
    </div>
  );
};

export default Pricing;