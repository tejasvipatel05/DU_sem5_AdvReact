'use client';

import { useEffect, useRef, useState } from 'react';
import { Scissors, Sparkles, Palette, Heart, ArrowRight, Clock, DollarSign } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      icon: Scissors,
      title: 'Hair Styling',
      subtitle: 'Cut • Color • Style',
      description: 'Transform your look with our expert hair stylists. From precision cuts to vibrant colors and elegant styling.',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '60-120 min',
      price: 'From $80',
      features: ['Consultation', 'Wash & Cut', 'Style & Finish', 'Aftercare Tips']
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'Skincare',
      subtitle: 'Facial • Treatments',
      description: 'Rejuvenate your skin with our luxurious facial treatments tailored to your skin type and concerns.',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '45-90 min',
      price: 'From $65',
      features: ['Skin Analysis', 'Deep Cleansing', 'Custom Treatment', 'Moisturizing']
    },
    {
      id: 3,
      icon: Palette,
      title: 'Makeup',
      subtitle: 'Special Events • Bridal',
      description: 'Look stunning for any occasion with our professional makeup artistry and beauty consultation.',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '30-90 min',
      price: 'From $50',
      features: ['Color Matching', 'Application', 'Touch-up Kit', 'Photo Ready']
    },
    {
      id: 4,
      icon: Heart,
      title: 'Wellness',
      subtitle: 'Massage • Aromatherapy',
      description: 'Relax and unwind with our therapeutic massage and wellness treatments for complete rejuvenation.',
      image: 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '60-120 min',
      price: 'From $90',
      features: ['Consultation', 'Therapeutic Massage', 'Aromatherapy', 'Relaxation']
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-green-600 font-semibold text-lg playfair">Our Services</span>
          <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Comprehensive Beauty
            <span className="text-green-600"> Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our full range of premium beauty services, each designed to enhance your natural radiance and boost your confidence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`animate-on-scroll delay-${index * 100} group cursor-pointer`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <service.icon className="w-6 h-6 text-green-600" />
                  </div>
                  
                  {/* Hover Content */}
                  <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-500 ${
                    hoveredService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="flex items-center font-semibold text-green-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {service.price}
                        </div>
                      </div>
                      <div className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-green-600 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="playfair text-2xl font-bold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-green-600 font-medium text-sm">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <button className="w-full bg-gray-100 hover:bg-green-600 text-gray-700 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-on-scroll">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Look?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Book a consultation with our expert team and discover the perfect beauty treatments tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary inline-flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Book Consultation
              </button>
              <button className="px-8 py-4 text-gray-700 hover:text-green-600 transition-colors border-2 border-gray-300 rounded-full hover:border-green-600">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;