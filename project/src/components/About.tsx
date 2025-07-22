import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '1000+', label: 'Happy Clients' },
    { icon: Award, number: '5+', label: 'Years Experience' },
    { icon: Clock, number: '24/7', label: 'Customer Support' },
    { icon: Heart, number: '100%', label: 'Satisfaction Rate' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Master Stylist & Owner',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Hair Styling', 'Bridal Makeup', 'Color Expert']
    },
    {
      name: 'Emma Wilson',
      role: 'Senior Esthetician',
      image: 'https://images.pexels.com/photos/8129903/pexels-photo-8129903.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Facial Treatments', 'Skin Care', 'Anti-Aging']
    },
    {
      name: 'Maya Patel',
      role: 'Nail Art Specialist',
      image: 'https://images.pexels.com/photos/8129921/pexels-photo-8129921.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Nail Art', 'Gel Extensions', 'Manicure']
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        {/* About Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 mx-4 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Bella Salon
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded with a passion for beauty and excellence, Bella Salon has been transforming lives through exceptional beauty services. Our team of skilled professionals is dedicated to providing personalized care in a luxurious, welcoming environment.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe that beauty is unique to each individual, and our mission is to enhance your natural features while helping you feel confident and radiant. From everyday styling to special occasion makeovers, we're here to make you look and feel your absolute best.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-rose-400">
                <Award className="h-5 w-5" />
                <span className="font-medium">Certified Professionals</span>
              </div>
              <div className="flex items-center space-x-2 text-rose-400">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Premium Products</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Salon Interior"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-rose-400 text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-rose-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-100 transition-colors">
                  <IconComponent className="h-8 w-8 text-rose-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our talented professionals bring years of experience and passion to every service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
              <p className="text-rose-400 font-medium mb-3">{member.role}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;