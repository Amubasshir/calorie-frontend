import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, BookOpen, Crown, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navigation: React.FC = () => {
    const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'Alimenti', href: '/alimenti' },
    { label: 'Bevande', href: '/bevande' },
    { label: 'Fastfood', href: '/fastfood' },
    { label: 'Consumo calorie', href: '/consumo-calorie' },
    { label: 'Fabbisogno', href: '/fabbisogno' },
    { label: 'Classifiche', href: '/classifiche' },
    { label: 'Blog', href: '/blog' }
  ];

  const getAuthItems = () => {
    const items = [
      { label: 'Accedi', href: '/login', icon: User },
      { label: 'Registrati', href: '/register', icon: User },
      { label: 'Premium', href: '/pricing', icon: Crown }
    ];

    if (isAuthenticated) {
      items.splice(0, 2); // Remove login and register
      items.unshift(
        { label: 'Il mio diario', href: '/diario', icon: BookOpen }
      );
    }

    return items;
  };

  console.log({isAuthenticated});

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#e80f00] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Mobile Menu Header */}
        <div className="md:hidden flex justify-between items-center py-2">
          <div className="w-8" /> {/* Spacer for centering */}
          <Link to="/" className="font-bold text-lg">
            calorie.it
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none w-8 h-8 flex items-center justify-center"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="py-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`block py-2 px-4 hover:bg-red-600 transition-colors ${
                  isActive(item.href) ? 'bg-red-700' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-red-600 mt-2 pt-2">
              {getAuthItems().map((item, index) => (
                <Link
                  key={`auth-${index}`}
                  to={item.href}
                  className={`block py-2 px-4 hover:bg-red-600 transition-colors flex items-center ${
                    isActive(item.href) ? 'bg-red-700' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="w-full py-2 px-4 hover:bg-red-600 transition-colors flex items-center"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    <span>Modalità scura</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    <span>Modalità chiara</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between py-2">
          <ul className="flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  <Link
                    to={item.href}
                    className={`hover:text-red-100 transition-colors whitespace-nowrap ${
                      isActive(item.href) ? 'font-semibold text-red-100' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
                {index < menuItems.length - 1 && <li className="text-red-200">|</li>}
              </React.Fragment>
            ))}
          </ul>
          
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-1 hover:text-red-100 transition-colors px-3 py-1"
                aria-label={`Passa alla modalità ${theme === 'light' ? 'scura' : 'chiara'}`}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </button>
            </li>
            {getAuthItems().map((item, index) => (
              <li key={`auth-${index}`}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 hover:text-red-100 transition-colors px-3 py-1 ${
                    isActive(item.href) ? 'font-semibold text-red-100' : ''
                  } ${item.href === '/pricing' ? 'bg-yellow-500 text-white rounded-full hover:bg-yellow-400' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
        ))}
            {isAuthenticated && (
              <li className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 hover:text-red-100 transition-colors px-3 py-1"
                >
                  <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{user?.fullName?.slice(0, 1) || user?.email?.slice(0, 1)}</span>
                  </div>
                  <span>{user?.fullName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      Il mio account
                    </Link>
                    <Link
                      to="/diario"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      Diario alimentare
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={() => {
                        // Handle logout
                        setIsProfileOpen(false);
                        setIsAuthenticated(false);
                        navigate('/login')
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;