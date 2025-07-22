import React from 'react';
import { Star, Award, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block text-rose-300">Beauty</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience luxury beauty services with our expert stylists. From bridal makeovers to everyday elegance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-rose-400 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-rose-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Book Appointment
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-200">
              View Services
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-white">
              <Star className="h-6 w-6 text-rose-300" fill="currentColor" />
              <span className="text-lg font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white">
              <Users className="h-6 w-6 text-rose-300" />
              <span className="text-lg font-semibold">1000+ Clients</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white">
              <Award className="h-6 w-6 text-rose-300" />
              <span className="text-lg font-semibold">5+ Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;