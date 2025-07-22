import React from 'react';
import { Scissors, Sparkles, Heart, Crown, Palette, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Hair Styling & Cuts',
      description: 'Professional haircuts, styling, coloring, and treatments tailored to your unique style.',
      price: 'From $50',
      features: ['Consultation', 'Wash & Cut', 'Styling', 'Treatment'],
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Sparkles,
      title: 'Waxing Services',
      description: 'Gentle and effective hair removal services for smooth, silky skin that lasts.',
      price: 'From $25',
      features: ['Face Waxing', 'Body Waxing', 'Brazilian', 'Eyebrow Shaping'],
      image: 'https://images.pexels.com/photos/6663527/pexels-photo-6663527.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Heart,
      title: 'Manicure & Pedicure',
      description: 'Pamper your hands and feet with our luxury nail care treatments.',
      price: 'From $35',
      features: ['Classic Manicure', 'Gel Polish', 'Nail Art', 'Cuticle Care'],
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Crown,
      title: 'Bridal Makeover',
      description: 'Complete bridal beauty package for your special day with trial sessions.',
      price: 'From $200',
      features: ['Hair Styling', 'Makeup', 'Trial Session', 'Touch-ups'],
      image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Palette,
      title: 'Nail Art Design',
      description: 'Creative and intricate nail designs to express your personality.',
      price: 'From $45',
      features: ['Custom Designs', 'Gel Extensions', '3D Art', 'Seasonal Themes'],
      image: 'https://images.pexels.com/photos/1038829/pexels-photo-1038829.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Star,
      title: 'Facial Treatments',
      description: 'Rejuvenating facial treatments for healthy, glowing skin.',
      price: 'From $65',
      features: ['Deep Cleansing', 'Anti-Aging', 'Hydrating', 'Exfoliation'],
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Indulge in our comprehensive range of beauty services, crafted to enhance your natural beauty and boost your confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 md:px-10 lg:px-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <IconComponent className="h-6 w-6 text-rose-400" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-rose-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {service.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-rose-400 text-white py-3 rounded-lg hover:bg-rose-500 transition-colors duration-200 font-medium">
                    Book This Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;