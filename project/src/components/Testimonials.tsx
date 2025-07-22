import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Jessica Chen',
      role: 'Bride',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Bella Salon made my wedding day absolutely perfect! Sarah did an incredible job with my bridal makeover. I felt like a princess, and the makeup lasted all day through tears of joy.',
      service: 'Bridal Makeover'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Regular Client',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'I\'ve been coming to Bella Salon for over two years now. The team is professional, friendly, and always makes me feel pampered. My nails have never looked better!',
      service: 'Nail Art & Manicure'
    },
    {
      name: 'Amanda Thompson',
      role: 'First-time Client',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'I was nervous about getting a major hair change, but Emma guided me through everything. The result exceeded my expectations! I\'ve never felt more confident.',
      service: 'Hair Styling & Color'
    },
    {
      name: 'Priya Sharma',
      role: 'Beauty Enthusiast',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The facial treatment at Bella Salon is pure luxury. My skin has never looked better, and the relaxing atmosphere makes it feel like a mini vacation every time.',
      service: 'Facial Treatment'
    },
    {
      name: 'Rachel Kim',
      role: 'Professional',
      image: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'As a busy professional, I appreciate how Bella Salon accommodates my schedule. The quality of service is consistently excellent, and I always leave feeling refreshed.',
      service: 'Express Services'
    },
    {
      name: 'Sophie Williams',
      role: 'Special Event',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'For my graduation party, Maya created the most stunning nail art design. It was exactly what I envisioned and received so many compliments. Absolutely talented team!',
      service: 'Custom Nail Art'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have to say about their experience at Bella Salon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-12 w-12 text-rose-400" />
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Service Badge */}
              <div className="mb-4">
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.service}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Book your appointment today and experience the Bella Salon difference.
            </p>
            <button className="bg-white text-rose-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Schedule Your Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;