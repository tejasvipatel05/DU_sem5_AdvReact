import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-stone-100">
      {/* Background Organic Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-sage-600 rounded-bl-[200px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-sage-500/20 rounded-tr-[150px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl lg:text-8xl font-bold text-sage-800 leading-none mb-6">
                BELLA STUDIO
              </h1>
              <p className="text-lg text-sage-700 max-w-md leading-relaxed">
                Our beauty salon successfully provides quality services in the field of beauty and cosmetology, carefully caring of each client
              </p>
            </div>
            
            <button className="bg-coral-500 text-white px-8 py-4 rounded-full font-medium hover:bg-coral-600 transition-colors duration-300 shadow-lg">
              Consultation
            </button>

            {/* Small Image */}
            <div className="relative w-48 h-64 rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Hair styling"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content - Main Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beauty treatment"
                className="w-full h-full object-cover"
              />
              
              {/* Organic overlay shapes */}
              <div className="absolute inset-0">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-sage-600/30 rounded-tl-full"></div>
                <div className="absolute top-1/4 left-0 w-24 h-24 bg-coral-500/20 rounded-full"></div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sage-200 rounded-full opacity-60"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-coral-200 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-20">
        <a href="#" className="block w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <Facebook className="h-5 w-5 text-white" />
        </a>
        <a href="#" className="block w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <MessageCircle className="h-5 w-5 text-white" />
        </a>
        <a href="#" className="block w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <Instagram className="h-5 w-5 text-white" />
        </a>
      </div>

      {/* Decorative botanical elements */}
      <div className="absolute bottom-20 left-20 opacity-30">
        <svg width="120" height="80" viewBox="0 0 120 80" className="text-sage-600">
          <path d="M10 40 Q30 20, 50 40 T90 40" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="20" cy="35" r="8" fill="currentColor" opacity="0.3"/>
          <circle cx="40" cy="45" r="6" fill="currentColor" opacity="0.4"/>
          <circle cx="60" cy="35" r="7" fill="currentColor" opacity="0.3"/>
          <circle cx="80" cy="42" r="5" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;