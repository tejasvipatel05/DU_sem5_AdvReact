import React from 'react';
import { Scissors, Facebook, MessageCircle, Instagram, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    'About us',
    'Services', 
    'Gallery',
    'Contacts'
  ];

  return (
    <footer className="bg-sage-600 text-white relative overflow-hidden">
      {/* Address Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-4xl lg:text-5xl font-bold mb-12">Our address</h3>
          
          {/* Map placeholder with organic shape */}
          <div className="relative h-64 bg-sage-500 rounded-3xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-white/80" />
                <p className="text-white/90 text-lg">Interactive Map Location</p>
                <p className="text-white/70">Odesa, Shishkina, 60B</p>
              </div>
            </div>
            
            {/* Decorative organic overlay */}
            <div className="absolute bottom-0 right-0 w-48 h-32 bg-white/10 rounded-tl-full"></div>
            <div className="absolute top-0 left-1/4 w-24 h-24 bg-coral-400/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-sage-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Scissors className="h-6 w-6 text-sage-600 transform rotate-45" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Bella</span>
                  <div className="text-sm font-light opacity-80">STUDIO</div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <p className="text-white/80">Ridnostudio@gmail.com</p>
              <p className="text-white/80">Odesa, Shishkina, 60B</p>
              <p className="text-white/80">+380 (63) 723 12 10</p>
            </div>

            {/* Social Media */}
            <div>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
            <p>© 2023 created by Zhanna Varylova. All rights reserved.</p>
            <p className="mt-2 md:mt-0">*Pictures were taken from https://ru.freepik.com/ for educational purposes.</p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-coral-500 text-white rounded-full shadow-lg hover:bg-coral-600 transition-colors duration-200 flex items-center justify-center">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;