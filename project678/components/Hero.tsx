'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Sparkles, Calendar } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl animate-float delay-200"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 right-10 w-24 h-24 bg-pink-200/25 rounded-full blur-2xl animate-float delay-500"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
          }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-green-700 mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Beauty Experience
              </div>
            </div>
            
            <h1 className="playfair text-responsive-xl font-bold text-gray-900 mb-6 animate-fade-in-up delay-200">
              Transform Your
              <span className="block text-green-600">
                Natural Beauty
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up delay-300">
              Experience premium beauty services in our luxurious studio. From expert hairstyling to rejuvenating treatments, we enhance your natural radiance with personalized care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-400">
              <button className="btn-primary inline-flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </button>
              <button className="px-8 py-4 text-gray-700 hover:text-green-600 transition-colors border-2 border-gray-300 rounded-full hover:border-green-600">
                View Services
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in-right delay-300">
            <div className="relative">
              {/* Background Shape */}
              <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-green-400/20 to-orange-400/10 rounded-full blur-3xl animate-float"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Beauty Studio"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -left-6 top-20 bg-white rounded-2xl p-4 shadow-xl animate-float delay-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">500+</p>
                      <p className="text-sm text-gray-600">Happy Clients</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-8 bottom-32 bg-white rounded-2xl p-4 shadow-xl animate-float delay-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <p className="font-semibold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;