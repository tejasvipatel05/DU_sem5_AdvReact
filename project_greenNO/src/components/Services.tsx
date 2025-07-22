import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'HAIRDRESSER SERVICES',
      description: "Women's, men's and children's haircuts, different complexity of hair dyeing, hair care",
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      buttonColor: 'bg-amber-400'
    },
    {
      title: 'MANICURE, PEDICURE',
      description: 'Classic, hardware, varnish coating, gel varnish coating, nails care',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
      buttonColor: 'bg-coral-400'
    },
    {
      title: 'MAKEUP',
      description: 'Day, evening, wedding makeup; lash makeup; correction and eyebrows coloring',
      image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
      buttonColor: 'bg-rose-400'
    },
    {
      title: 'COSMETOLOGY',
      description: 'Facial massage, ultrasonic cleaning, careful care for your skin',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600',
      buttonColor: 'bg-sage-400'
    }
  ];

  return (
    <section id="services" className="py-20 bg-stone-100 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-sage-600 rounded-bl-[200px] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-sage-800">Our services</h2>
          <div className="flex space-x-4">
            <button className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center hover:bg-sage-300 transition-colors">
              <ChevronLeft className="h-6 w-6 text-sage-700" />
            </button>
            <button className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center hover:bg-sage-300 transition-colors">
              <ChevronRight className="h-6 w-6 text-sage-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="relative h-80 rounded-3xl overflow-hidden mb-6 shadow-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-sage-800 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sage-600 leading-relaxed text-sm">
                  {service.description}
                </p>
                <button className={`${service.buttonColor} text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity`}>
                  Price
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;