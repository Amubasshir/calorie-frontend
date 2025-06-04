import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Recupera Password</h2>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center">
        Inserisci il tuo indirizzo email e ti invieremo le istruzioni per reimpostare la password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="La tua email"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          <span>Invia istruzioni</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ricordi la password?{' '}
          <a href="/login" className="text-red-500 hover:text-red-600 font-medium">
            Accedi
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;