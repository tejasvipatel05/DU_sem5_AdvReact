import React from 'react';
import { Award, Users, Heart, Star, Clock, Shield } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-pink-600" />,
      title: 'Award-Winning Team',
      description: 'Our certified professionals have won multiple beauty industry awards'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: '5000+ Happy Clients',
      description: 'Trusted by thousands of satisfied customers across the city'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Premium Products',
      description: 'We use only the finest, cruelty-free beauty products'
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: '4.9 Star Rating',
      description: 'Consistently rated as the top beauty salon in the area'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Flexible Hours',
      description: 'Open 7 days a week with extended evening hours'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Safety First',
      description: 'Highest hygiene standards and safety protocols'
    }
  ];

  const team = [
    {
      name: 'Sarah Williams',
      role: 'Senior Hair Stylist',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '8 years',
      specialty: 'Hair Color & Cutting'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Lead Esthetician',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '6 years',
      specialty: 'Facial Treatments'
    },
    {
      name: 'Jessica Chen',
      role: 'Nail Technician',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '5 years',
      specialty: 'Nail Art & Design'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Luxe Beauty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over 15 years, we've been dedicated to enhancing natural beauty 
            and providing exceptional salon experiences in a luxurious, welcoming environment.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2009 by master stylist Elena Rodriguez, Luxe Beauty began as a 
                small neighborhood salon with a big vision: to create a space where beauty 
                meets artistry, and every client leaves feeling confident and radiant.
              </p>
              <p>
                What started as a passion project has grown into the city's premier beauty 
                destination, known for our innovative techniques, premium products, and 
                personalized service that makes every visit special.
              </p>
              <p>
                Today, our team of certified professionals continues to push the boundaries 
                of beauty, staying ahead of trends while honoring the timeless principles 
                of excellent service and client care.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Salon interior"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">15+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Luxe Beauty?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Expert Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-pink-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Experience:</strong> {member.experience}</p>
                    <p><strong>Specialty:</strong> {member.specialty}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.9</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h3>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To empower every client to look and feel their absolute best through exceptional 
            beauty services, innovative techniques, and a commitment to excellence that goes 
            beyond expectations. We believe that beauty is personal, and our mission is to 
            help you discover and celebrate your unique radiance.
          </p>
        </div>
      </div>
    </div>
  );
};