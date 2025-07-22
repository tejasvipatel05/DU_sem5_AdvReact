'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Beauty Avenue', 'Downtown District', 'New York, NY 10001'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@serenebeauty.com', 'booking@serenebeauty.com'],
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat-Sun: 10:00 AM - 6:00 PM'],
      action: 'Book Now'
    }
  ];

  const services = [
    'Hair Styling & Color',
    'Skincare & Facials',
    'Makeup & Beauty',
    'Wellness & Massage',
    'Bridal Services',
    'Consultation'
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 organic-shape animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/20 organic-shape-2 animate-float delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-green-600 font-semibold text-lg playfair">Get In Touch</span>
          <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Book Your Beauty
            <span className="text-green-600"> Experience</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to transform your look? Contact us today to schedule your consultation and discover the perfect beauty treatments for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <h3 className="playfair text-2xl font-bold text-gray-900 mb-8">
              Visit Our Studio
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className={`bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 animate-on-scroll delay-${index * 100}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                      <div className="space-y-1 text-gray-600">
                        {info.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                      <button className="text-green-600 hover:text-green-700 font-medium mt-2 transition-colors">
                        {info.action} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 animate-on-scroll">
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500">Click to view full map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="animate-on-scroll">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h3 className="playfair text-2xl font-bold text-gray-900 mb-2">
                Book Your Appointment
              </h3>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h4 className="playfair text-xl font-bold text-gray-900 mb-2">
                    Booking Request Sent!
                  </h4>
                  <p className="text-gray-600">
                    We'll contact you soon to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your beauty goals or any special requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;