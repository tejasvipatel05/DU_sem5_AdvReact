import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'ALINA',
      text: 'The salon is very nice, the staff is very pleasant. I am satisfied with the services, now I am a regular customer. I recommend this salon, excellent service.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'VERONICA',
      text: 'Insanely satisfied! I received incredibly high-quality service from master Iryna. Thank you! The salon pleased me, I really recommend it!',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'INNA',
      text: 'The salon atmosphere is very pleasant, the craftsmen are excellent, I am delighted with the service! Highly recommend!',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'VALENTINA',
      text: 'Very satisfied with the quality of services. Maria took into account all my wishes and the manicure turned out perfect. I recommend her!',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'MARIA',
      text: 'I am in this salon for the first time. And only the best impressions remained! Had a pedicure - it\'s just a "bomb". I am super excited!',
      image: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'IREN',
      text: 'The staff is very attentive - every detail is thought out to the smallest level! Super satisfied, I will definitely come back for the next visit!',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-20 bg-stone-100 relative overflow-hidden">
      {/* Background organic shape */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-sage-600 rounded-br-[300px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-white">Our customers</h2>
          <div className="flex space-x-4">
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <h4 className="text-xl font-bold text-sage-800">{testimonial.name}</h4>
              </div>
              <p className="text-sage-600 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom image */}
        <div className="relative">
          <div className="w-full h-64 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Salon interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-coral-300/40 rounded-full"></div>
          <div className="absolute top-1/2 -left-4 w-16 h-16 bg-sage-300/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;