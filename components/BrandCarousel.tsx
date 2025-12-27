import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const BrandCarousel: React.FC = () => {
  const { brands } = useContent();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(3);
      else setItemsPerPage(5);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || brands.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, isPaused, brands.length]);

  const nextSlide = () => {
    setStartIndex((prev) => {
      const maxIndex = brands.length - itemsPerPage;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setStartIndex((prev) => {
      const maxIndex = brands.length - itemsPerPage;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  if (brands.length === 0) return null;

  return (
    <section id="marcas" className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-[#264788] text-2xl md:text-3xl font-bold font-['Montserrat']">
            Nossas Marcas Parceiras
          </h2>
          <div className="w-16 h-1 bg-[#E5C808] mx-auto mt-3 rounded-full"></div>
        </div>

        <div 
          className="relative group px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {brands.length > itemsPerPage && (
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 text-[#264788] rounded-full shadow-md flex items-center justify-center hover:bg-[#264788] hover:text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 min-w-[48px] min-h-[48px]"
              aria-label="Marca Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="overflow-hidden -mx-2 py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` 
              }}
            >
              {brands.map((brand, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 px-2 box-border select-none"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="bg-white border border-gray-200 rounded-xl h-28 flex items-center justify-center p-4 hover:border-[#E5C808] hover:shadow-lg transition-all duration-300 cursor-pointer grayscale hover:grayscale-0">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="pointer-events-none max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                      style={{ pointerEvents: 'none' }}
                      width="200"
                      height="100"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {brands.length > itemsPerPage && (
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 text-[#264788] rounded-full shadow-md flex items-center justify-center hover:bg-[#264788] hover:text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 min-w-[48px] min-h-[48px]"
              aria-label="Próxima Marca"
            >
              <ChevronRight size={24} />
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;