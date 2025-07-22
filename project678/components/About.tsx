'use client';

import { useEffect, useRef } from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
              }, index * 200);
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

  const advantages = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest products and latest techniques to ensure exceptional results.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our highly trained professionals bring years of experience and artistic vision.'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Convenient scheduling with early morning and evening appointments available.'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Every treatment is customized to enhance your unique beauty and preferences.'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-100/30 organic-shape"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/20 organic-shape-2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="animate-on-scroll">
              <span className="text-green-600 font-semibold text-lg playfair">About Our Studio</span>
              <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Where Beauty Meets
                <span className="text-green-600"> Artistry</span>
              </h2>
            </div>
            
            <div className="animate-on-scroll space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Step into our serene sanctuary where modern techniques blend with timeless beauty rituals. Our award-winning studio has been transforming lives through personalized beauty experiences for over a decade.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                From precision haircuts to luxurious spa treatments, we offer a comprehensive range of services designed to enhance your natural beauty. Our commitment to excellence and attention to detail sets us apart in the industry.
              </p>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 playfair">12+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 playfair">2K+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 playfair">15+</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Collage */}
          <div className="animate-on-scroll">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover-lift">
                    <img
                      src="https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Salon Interior"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover-lift">
                    <img
                      src="https://images.pexels.com/photos/3851949/pexels-photo-3851949.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Hair Styling"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover-lift">
                    <img
                      src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Makeup Application"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover-lift">
                    <img
                      src="https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Skincare Treatment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white rounded-2xl p-6 shadow-2xl animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold playfair">4.9★</div>
                  <div className="text-sm opacity-90">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="mt-24">
          <div className="text-center mb-12 animate-on-scroll">
            <h3 className="playfair text-3xl font-bold text-gray-900 mb-4">Why Choose Serene</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes our beauty studio the preferred choice for discerning clients who value quality and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className={`text-center animate-on-scroll delay-${index * 100} hover-lift bg-gray-50 rounded-2xl p-8`}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="playfair text-xl font-semibold text-gray-900 mb-3">
                  {advantage.title}
                </h4>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;