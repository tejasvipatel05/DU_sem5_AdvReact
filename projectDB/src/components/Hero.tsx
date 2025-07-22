import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Award, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '5000+', label: 'Happy Clients' },
    { icon: <Star className="h-6 w-6" />, value: '4.9', label: 'Average Rating' },
    { icon: <Award className="h-6 w-6" />, value: '15+', label: 'Years Experience' },
    { icon: <Calendar className="h-6 w-6" />, value: '50+', label: 'Services' }
  ];

{/* <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden flex-1 min-h-[calc(100vh-200px)] py-24"> */}


  return (
      <div className="min-h-[67vh] flex items-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-6 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto">

        {/* Left Image with floating cards */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Beauty treatment"
            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
          />

          {/* Rating Badge */}
          <motion.div
            className="absolute top-6 left-6 bg-white rounded-xl shadow-xl p-4 flex items-center space-x-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">4.9 Rating</p>
              <p className="text-sm text-gray-500">1,200+ Reviews</p>
            </div>
          </motion.div>

          {/* Award Badge */}
          <motion.div
            className="absolute bottom-6 right-6 bg-white rounded-xl shadow-xl p-4 flex items-center space-x-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Award Winner</p>
              <p className="text-sm text-gray-500">Best Salon 2024</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your Beauty,
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"> Perfected</span>
            </h1>
            <p className="text-lg text-gray-600">
              Experience luxury beauty treatments in our state-of-the-art salon. 
              From hair styling to skincare, we bring out your natural radiance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.8 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                    <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg">

                {stat.icon}
              </div>
              </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <motion.button
              onClick={() => onNavigate('booking')}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
            >
              Book Appointment
            </motion.button>
            <motion.button
              onClick={() => onNavigate('services')}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 border-2 border-pink-500 text-pink-600 font-semibold rounded-xl hover:bg-pink-50 transition-all duration-300"
            >
              View Services
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};