import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contacts', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center">
                <Scissors className="h-6 w-6 text-white transform rotate-45" />
              </div>
            </div>
            <div>
              <span className={`text-2xl font-bold ${isScrolled ? 'text-sage-800' : 'text-white'} transition-colors`}>
                Bella
              </span>
              <div className={`text-sm font-light ${isScrolled ? 'text-sage-600' : 'text-white/80'} transition-colors`}>
                STUDIO
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  isScrolled ? 'text-sage-700 hover:text-sage-900' : 'text-white hover:text-stone-200'
                } transition-colors duration-300 font-medium text-sm uppercase tracking-wide`}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-2 text-sm">
              <span className={`${isScrolled ? 'text-sage-600' : 'text-white/60'}`}>UA</span>
              <span className={`${isScrolled ? 'text-sage-800' : 'text-white'} font-medium`}>EN</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isScrolled ? 'text-sage-800' : 'text-white'} transition-colors`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl rounded-2xl mt-4 py-6 mx-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-6 py-3 text-sage-700 hover:text-sage-900 hover:bg-sage-50 transition-colors font-medium text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;