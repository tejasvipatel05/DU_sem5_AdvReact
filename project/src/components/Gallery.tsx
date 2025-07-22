import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Nail Art Design',
      category: 'Nail Art'
    },
    {
      src: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Hair Styling',
      category: 'Hair'
    },
    {
      src: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Bridal Makeup',
      category: 'Bridal'
    },
    {
      src: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Facial Treatment',
      category: 'Skincare'
    },
    {
      src: 'https://images.pexels.com/photos/1038829/pexels-photo-1038829.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Nail Design',
      category: 'Nail Art'
    },
    {
      src: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Hair Color',
      category: 'Hair'
    },
    {
      src: 'https://images.pexels.com/photos/6663527/pexels-photo-6663527.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Eyebrow Waxing',
      category: 'Waxing'
    },
    {
      src: 'https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Salon Interior',
      category: 'Salon'
    },
    {
      src: 'https://images.pexels.com/photos/8129903/pexels-photo-8129903.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Beauty Treatment',
      category: 'Skincare'
    }
  ];

  const categories = ['All', 'Hair', 'Nail Art', 'Bridal', 'Skincare', 'Waxing', 'Salon'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const maxIndex = filteredImages.length - 1;
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? maxIndex : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === maxIndex ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-8xl mx-auto px-4 sm:mx-6 lg:mx-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Work Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the artistry and transformation we bring to every client. Browse through our portfolio of stunning makeovers and beauty creations.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-rose-400 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-400 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium bg-rose-400 px-3 py-1 rounded-full mb-2">
                    {image.category}
                  </div>
                  <div className="text-lg font-semibold">{image.alt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="text-center mt-4 text-white">
                <div className="text-sm bg-rose-400 px-3 py-1 rounded-full inline-block mb-2">
                  {filteredImages[selectedImage].category}
                </div>
                <div className="text-lg font-semibold">
                  {filteredImages[selectedImage].alt}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;