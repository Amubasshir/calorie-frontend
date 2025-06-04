import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  CreditCard, 
  Bell, 
  LogOut,
  Trash2
} from 'lucide-react';

const Account: React.FC = () => {
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(true);

  const mockUserData = {
    name: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    subscriptionStart: '2024-01-15',
    plan: 'Premium',
    nextBilling: '2024-02-15'
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic
  };

  const handleCancelSubscription = () => {
    // Handle subscription cancellation
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{mockUserData.name}</h1>
              <p className="text-red-100">{mockUserData.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Subscription Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-500" />
              Abbonamento
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Piano attuale</span>
                <span className="font-medium text-gray-900 dark:text-white">{mockUserData.plan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Data di iscrizione</span>
                <span className="font-medium text-gray-900 dark:text-white">{mockUserData.subscriptionStart}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Prossimo addebito</span>
                <span className="font-medium text-gray-900 dark:text-white">{mockUserData.nextBilling}</span>
              </div>
              <button
                onClick={handleCancelSubscription}
                className="mt-4 w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                Cancella abbonamento
              </button>
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" />
              Cambia Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password attuale
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nuova password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conferma nuova password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Aggiorna Password
              </button>
            </form>
          </div>

          {/* Newsletter Preferences */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-500" />
              Preferenze Newsletter
            </h2>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <span className="text-gray-700 dark:text-gray-300">Ricevi aggiornamenti e consigli nutrizionali</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>

          {/* Account Actions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-red-500" />
              Azioni Account
            </h2>
            <div className="flex flex-col space-y-2">
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                Elimina Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;