'use client';

import { useState } from 'react';
import { BookOpen, User, Search, Bell, Menu, X, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-30 bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                ✨ Enchanted Library
              </h1>
              <p className="text-gray-600 font-medium">Where knowledge meets magic ⚡</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              📚 Browse Books
            </Link>
            <Link href="/favorites" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
              ❤️ My Favorites
            </Link>
            <Link href="/reading-list" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              📖 Reading List
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover:scale-110 transition-transform duration-200">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                3
              </Badge>
            </Button>

            {/* Profile Link */}
            <Link href="/profile">
              <Button variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:scale-105 transition-all duration-200">
                <User className="w-4 h-4 mr-2" />
                My Profile
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-gray-200 pt-6 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                📚 Browse Books
              </Link>
              <Link 
                href="/favorites" 
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ❤️ My Favorites
              </Link>
              <Link 
                href="/reading-list" 
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                📖 Reading List
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                👤 My Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}