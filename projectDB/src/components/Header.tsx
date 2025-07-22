import React, { useState } from 'react';
import { Sparkles, Menu, X, User, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Book Appointment', id: 'booking' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    onNavigate('home');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Luxe Beauty
              </h1>
              <p className="text-xs text-gray-500">Salon & Spa</p>
            </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-700 hover:text-pink-600'
                }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button
                    onClick={() => {
                      onNavigate('appointments');
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>My Appointments</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-2 text-left text-sm font-medium transition-colors ${currentPage === item.id
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
    </header >
  );
};