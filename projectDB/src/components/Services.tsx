import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Star } from 'lucide-react';
import { Service } from '../types';
import { motion } from 'framer-motion';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'hair', name: 'Hair' },
    { id: 'facial', name: 'Facial' },
    { id: 'nails', name: 'Nails' },
    { id: 'massage', name: 'Massage' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'waxing', name: 'Waxing' }
  ];

  useEffect(() => {
    fetchServices();
  }, [selectedCategory]);

  // const fetchServices = async () => {
  //   try {

  //     const url = selectedCategory === 'all' 
  //     ? '/api/services' 
  //     : `/api/services?category=${selectedCategory}`;

  //     const response = await fetch(url);
  //     console.log("response.json():",response.json());

  //     const data = await response.json();

  //     console.log("lalalallalalallala");
  //     console.log("data:",data);

  //     setServices(data);
  //   } catch (error) {
  //     console.error('Error fetching services:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchServices = async () => {
    try {
      const url = selectedCategory === 'all'
        ? '/api/services'
        : `/api/services?category=${selectedCategory}`;

      const response = await fetch(url);

      const data = await response.json();

      console.log("Fetched data:", data);

      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of beauty and wellness services,
            each designed to enhance your natural beauty and boost your confidence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${selectedCategory === category.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                    <span className="text-sm font-semibold text-gray-900 capitalize">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        {service.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigate('booking')}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredServices.length === 0 && !isLoading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 text-lg">
              No services found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div >
  );
};