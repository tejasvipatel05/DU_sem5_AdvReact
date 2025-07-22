'use client';

import { Scissors, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    services: [
      'Hair Styling',
      'Color Services',
      'Skincare Treatments',
      'Makeup Services',
      'Bridal Packages',
      'Wellness Therapy'
    ],
    company: [
      'About Us',
      'Our Team',
      'Careers',
      'Press',
      'Awards',
      'Blog'
    ],
    support: [
      'Contact Us',
      'FAQ',
      'Booking Policy',
      'Gift Cards',
      'Reviews',
      'Newsletter'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-2 rounded-full">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="playfair text-2xl font-bold">Serene</h3>
                  <p className="text-sm text-gray-400 -mt-1">Beauty Studio</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform your natural beauty with our premium services and expert care. Where artistry meets elegance.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="playfair text-lg font-semibold mb-6">Services</h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-green-400 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="playfair text-lg font-semibold mb-6">Company</h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-green-400 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="playfair text-lg font-semibold mb-6">Support</h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-green-400 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="playfair text-2xl font-bold mb-4">Stay Beautiful</h4>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for beauty tips, exclusive offers, and the latest trends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="btn-primary px-8 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Serene Beauty Studio. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for beautiful souls
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;