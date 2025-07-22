import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-stone-100 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-sage-600 rounded-bl-[200px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-coral-200/30 rounded-tr-[150px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Form */}
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold text-sage-800 leading-tight">
              Sign up online
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-4 bg-white border-0 rounded-2xl shadow-lg focus:ring-2 focus:ring-sage-400 focus:outline-none transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-sage-700 mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+380"
                  className="w-full px-4 py-4 bg-white border-0 rounded-2xl shadow-lg focus:ring-2 focus:ring-sage-400 focus:outline-none transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-mail"
                  className="w-full px-4 py-4 bg-white border-0 rounded-2xl shadow-lg focus:ring-2 focus:ring-sage-400 focus:outline-none transition-all duration-200"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-coral-500 text-white py-4 px-6 rounded-2xl font-medium hover:bg-coral-600 transition-colors duration-200 shadow-lg"
              >
                Submit
              </button>
            </form>

            {/* Decorative botanical element */}
            <div className="opacity-30">
              <svg width="120" height="80" viewBox="0 0 120 80" className="text-sage-600">
                <path d="M10 40 Q30 20, 50 40 T90 40" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="20" cy="35" r="6" fill="currentColor" opacity="0.4"/>
                <circle cx="40" cy="45" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="60" cy="35" r="5" fill="currentColor" opacity="0.3"/>
                <circle cx="80" cy="42" r="3" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beauty consultation"
                className="w-full h-full object-cover"
              />
              
              {/* Organic overlay */}
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage-600/30 rounded-tr-full"></div>
                <div className="absolute top-1/4 right-0 w-24 h-24 bg-coral-500/20 rounded-full"></div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-coral-200/40 rounded-full"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-sage-200/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;