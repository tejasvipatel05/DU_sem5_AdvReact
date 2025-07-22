'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, Heart, Share2 } from 'lucide-react';

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
              }, index * 100);
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

  const categories = [
    { id: 'all', label: 'All Work', count: 24 },
    { id: 'hair', label: 'Hair Styling', count: 12 },
    { id: 'makeup', label: 'Makeup', count: 8 },
    { id: 'skincare', label: 'Skincare', count: 4 }
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'hair',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Elegant Updo',
      description: 'Perfect for special occasions',
      likes: 127,
      size: 'large'
    },
    {
      id: 2,
      category: 'makeup',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Glamour Makeup',
      description: 'Red carpet ready look',
      likes: 89,
      size: 'medium'
    },
    {
      id: 3,
      category: 'hair',
      image: 'https://images.pexels.com/photos/3851949/pexels-photo-3851949.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Color Transformation',
      description: 'Brunette to blonde balayage',
      likes: 156,
      size: 'medium'
    },
    {
      id: 4,
      category: 'skincare',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Glowing Skin',
      description: 'Post-facial radiance',
      likes: 73,
      size: 'small'
    },
    {
      id: 5,
      category: 'hair',
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Beach Waves',
      description: 'Effortless summer style',
      likes: 94,
      size: 'small'
    },
    {
      id: 6,
      category: 'makeup',
      image: 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Natural Glow',
      description: 'Everyday beauty enhanced',
      likes: 112,
      size: 'large'
    },
    {
      id: 7,
      category: 'hair',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Pixie Cut',
      description: 'Bold and beautiful',
      likes: 68,
      size: 'medium'
    },
    {
      id: 8,
      category: 'makeup',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Smokey Eyes',
      description: 'Classic evening look',
      likes: 143,
      size: 'small'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2';
      default:
        return '';
    }
  };

  return (
    <section ref={sectionRef} id="gallery" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-orange-100/20 organic-shape"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-100/25 organic-shape-2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-green-600 font-semibold text-lg playfair">Our Portfolio</span>
          <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Beauty in Every
            <span className="text-green-600"> Creation</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our gallery of transformations and artistic creations. Each image tells a story of beauty, confidence, and our commitment to excellence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`animate-on-scroll delay-${index * 100} group cursor-pointer ${getSizeClasses(item.size)}`}
              onMouseEnter={() => setHoveredImage(item.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                  hoveredImage === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  {/* Content */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="playfair text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{item.description}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {categories.find(cat => cat.id === item.category)?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12 animate-on-scroll">
          <button className="btn-primary">
            View Complete Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;