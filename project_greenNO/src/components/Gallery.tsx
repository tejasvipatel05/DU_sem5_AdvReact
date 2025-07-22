import React from 'react';

const Gallery = () => {
  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Facial treatment',
      className: 'col-span-1 row-span-2 rounded-tl-[60px]'
    },
    {
      src: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Nail care',
      className: 'col-span-1 row-span-1 rounded-tr-[40px]'
    },
    {
      src: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Hair styling',
      className: 'col-span-1 row-span-1'
    },
    {
      src: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Makeup',
      className: 'col-span-1 row-span-1 rounded-bl-[40px]'
    },
    {
      src: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Beauty treatment',
      className: 'col-span-1 row-span-1 rounded-br-[60px]'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-stone-100 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-coral-200/20 rounded-bl-[200px]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-sage-200/30 rounded-tr-[150px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl lg:text-6xl font-bold text-sage-800 mb-16">Our works</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-[600px] mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.className} overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group cursor-pointer`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-transparent border-2 border-sage-600 text-sage-600 px-8 py-4 rounded-full font-medium hover:bg-sage-600 hover:text-white transition-colors duration-300">
            See more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;