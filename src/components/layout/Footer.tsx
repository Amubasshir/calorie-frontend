import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} py-6 transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 1999-2025 Calorie.it il primo motore di ricerca delle calorie in Italia</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-green-500 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-green-500 transition-colors duration-300">Termini e Condizioni</a>
            <a href="#" className="text-sm hover:text-green-500 transition-colors duration-300">Contatti</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;