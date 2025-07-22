import React from 'react';
import { Scissors, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      'Hair Styling & Cuts',
      'Waxing Services',
      'Manicure & Pedicure',
      'Bridal Makeover',
      'Nail Art Design',
      'Facial Treatments'
    ],
    quickLinks: [
      'About Us',
      'Our Team',
      'Gallery',
      'Testimonials',
      'Book Appointment',
      'Contact Us'
    ],
    policies: [
      'Privacy Policy',
      'Terms of Service',
      'Cancellation Policy',
      'Health & Safety',
      'Gift Cards',
      'Careers'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Scissors className="h-8 w-8 text-rose-400" />
              <span className="text-2xl font-bold">Bella Salon</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your beauty with our expert services. We're dedicated to making you look and feel your absolute best in a luxurious, welcoming environment.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">123 Beauty Street, Downtown, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">info@bellasalon.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Information</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.policies.map((policy, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-rose-400 transition-colors duration-200 text-sm"
                  >
                    {policy}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="bg-gray-800 p-2 rounded-full hover:bg-rose-400 transition-colors duration-200 group"
                    >
                      <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Subscribe to our newsletter for beauty tips and special offers.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-3 rounded-l-lg border border-gray-700 focus:outline-none focus:border-rose-400 flex-1 md:w-64"
              />
              <button className="bg-rose-400 text-white px-6 py-3 rounded-r-lg hover:bg-rose-500 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Bella Salon. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;