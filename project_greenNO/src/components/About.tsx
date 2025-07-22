import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const advantages = [
    {
      title: 'QUALITY COSMETICS',
      description: 'We cooperate only with proven reliable brands and we work with the latest technologies',
      icon: '✓'
    },
    {
      title: 'SECURE SERVICE',
      description: 'Safety of our customers is the most important and solid requirement in our beauty salon',
      icon: '✓'
    },
    {
      title: 'COOL TEAM',
      description: 'We employ only highly qualified experienced craftsmen, which are well understood what is style',
      icon: '✓'
    }
  ];

  return (
    <section id="about" className="py-20 bg-stone-100 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-sage-600 rounded-br-[300px]"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-coral-200/30 rounded-tl-[200px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Salon team"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-coral-300/40 rounded-full"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage-300/30 rounded-full"></div>
            
            {/* Botanical decoration */}
            <div className="absolute bottom-16 right-16 opacity-40">
              <svg width="80" height="60" viewBox="0 0 80 60" className="text-white">
                <path d="M10 30 Q25 15, 40 30 T70 30" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="25" r="4" fill="currentColor" opacity="0.6"/>
                <circle cx="30" cy="35" r="3" fill="currentColor" opacity="0.7"/>
                <circle cx="45" cy="25" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="60" cy="32" r="3" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              About us
            </h2>
            
            <div className="space-y-6 text-white/90">
              <p className="text-lg leading-relaxed">
                The main feature of our beauty salon is modern innovative efficient technologies and solid service principles.
              </p>
              <p className="text-lg leading-relaxed">
                We offer a full range of services from haircuts to cosmetology and body care. There are always promotions and discounts for our regular customers.
              </p>
              <p className="text-lg leading-relaxed">
                Our highly professional staff is always ready to offer our customers a complete set of treatments for hair, face and body care. We will pick a suitable care just for you
              </p>
            </div>

            {/* Decorative botanical element */}
            <div className="opacity-30">
              <svg width="100" height="60" viewBox="0 0 100 60" className="text-white">
                <path d="M10 30 Q30 15, 50 30 T90 30" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="20" cy="25" r="3" fill="currentColor" opacity="0.4"/>
                <circle cx="35" cy="35" r="2.5" fill="currentColor" opacity="0.5"/>
                <circle cx="50" cy="25" r="3.5" fill="currentColor" opacity="0.3"/>
                <circle cx="65" cy="32" r="2" fill="currentColor" opacity="0.6"/>
                <circle cx="80" cy="28" r="2.5" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="relative">
          <h3 className="text-4xl lg:text-5xl font-bold text-sage-800 mb-12">Our advantages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-sage-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 left-4 w-12 h-12 bg-coral-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                
                <div className="pt-8">
                  <h4 className="text-xl font-bold mb-4">{advantage.title}</h4>
                  <p className="text-white/90 leading-relaxed">{advantage.description}</p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-tl-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;