'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Marketing Executive',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'Absolutely phenomenal experience! The team at Serene transformed my look completely. The attention to detail and personalized service exceeded all my expectations. I felt pampered and beautiful.',
      service: 'Hair Color & Style',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      role: 'Fashion Designer',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'I\'ve been to many salons, but Serene is in a league of its own. The facial treatment left my skin glowing for weeks. The ambiance is so relaxing, and the staff is incredibly knowledgeable.',
      service: 'Premium Facial',
      date: '2024-01-20'
    },
    {
      id: 3,
      name: 'Jessica Chen',
      role: 'Bride-to-be',
      image: 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'Perfect for my wedding day! The makeup artist understood exactly what I wanted and made me feel like a princess. The whole bridal package was flawless - I couldn\'t have asked for better.',
      service: 'Bridal Makeup',
      date: '2024-02-01'
    },
    {
      id: 4,
      name: 'Amanda Foster',
      role: 'Business Owner',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'The massage therapy session was incredibly rejuvenating. I came in stressed and left feeling completely renewed. The therapeutic techniques and peaceful environment made all the difference.',
      service: 'Wellness Therapy',
      date: '2024-02-10'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-orange-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl animate-float delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-green-600 font-semibold text-lg playfair">Client Stories</span>
          <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            What Our Clients
            <span className="text-green-600"> Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from our valued clients about their transformative experiences at Serene Beauty Studio.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Client Image */}
              <div className="text-center animate-scale-in">
                <div className="relative inline-block">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-32 h-32 rounded-full object-cover shadow-xl mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-600 text-white rounded-full p-2">
                    <div className="flex items-center">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="playfair text-xl font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 mb-1">{testimonials[currentTestimonial].role}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <span>{testimonials[currentTestimonial].service}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(testimonials[currentTestimonial].date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center mt-8 space-x-2 animate-on-scroll">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-green-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 animate-on-scroll">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">⭐</span>
            </div>
            <div className="playfair text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">💬</span>
            </div>
            <div className="playfair text-3xl font-bold text-gray-900 mb-2">500+</div>
            <p className="text-gray-600">Happy Reviews</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🏆</span>
            </div>
            <div className="playfair text-3xl font-bold text-gray-900 mb-2">12+</div>
            <p className="text-gray-600">Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;