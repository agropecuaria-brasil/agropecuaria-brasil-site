import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const Testimonials: React.FC = () => {
  const { testimonials, settings } = useContent();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const interval = setInterval(() => { nextSlide(); }, 5000);
    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, isPaused, testimonials.length]);

  const nextSlide = () => {
    setStartIndex((prev) => {
      const maxIndex = testimonials.length - itemsPerPage;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setStartIndex((prev) => {
      const maxIndex = testimonials.length - itemsPerPage;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          {/* Contraste ajustado: text-gray-500 */}
          <h2 className="text-gray-600 text-sm font-bold uppercase tracking-widest mb-3">
            Depoimentos de Clientes
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#264788] font-['Montserrat']">
            O que dizem sobre a <span className="text-[#24902C]">Agropecuária Brasil?</span>
          </h3>
          <div className="w-24 h-1.5 bg-[#E5C808] mx-auto mt-6 rounded-full"></div>
        </div>

        <div 
          className="relative group px-2 md:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.length > itemsPerPage && (
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 text-[#264788] p-3 rounded-full shadow-lg hover:bg-[#264788] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:flex min-w-[48px] min-h-[48px] items-center justify-center"
              aria-label="Depoimento Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="overflow-hidden py-4 -my-4">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}
            >
              {testimonials.map((review) => (
                <div 
                  key={review.id}
                  className="flex-shrink-0 px-3 box-border"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#E5C808]/30 flex flex-col h-full select-none">
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} size={18} fill="#E5C808" className="text-[#E5C808]" />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-500">
                        {review.rating ? review.rating.toFixed(1) : "5.0"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      {review.avatar ? (
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#264788] font-bold text-lg shrink-0 shadow-sm border border-gray-100">
                          {review.name.charAt(0)}
                        </div>
                      )}
                      
                      <div>
                          <h4 className="font-bold text-gray-900 leading-none">{review.name}</h4>
                          {/* Contraste melhorado: text-gray-400 para text-gray-500 */}
                          <span className="text-xs text-gray-500 capitalize">
                             {review.source === 'google' ? 'Via Google' : review.source === 'facebook' ? 'Via Facebook' : 'Cliente Verificado'}
                          </span>
                      </div>
                    </div>

                    {/* Contraste melhorado */}
                    <p className="text-gray-700 leading-relaxed text-sm italic flex-grow">
                      "{review.text}"
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 text-right">
                       Avaliado {review.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > itemsPerPage && (
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 text-[#264788] p-3 rounded-full shadow-lg hover:bg-[#264788] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:flex min-w-[48px] min-h-[48px] items-center justify-center"
              aria-label="Próximo Depoimento"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(0, testimonials.length - itemsPerPage + 1) }).map((_, idx) => (
             <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === startIndex ? 'bg-[#24902C] w-6' : 'bg-gray-300 hover:bg-[#E5C808]'
                }`}
                aria-label={`Ir para slide de depoimento ${idx + 1}`}
             />
          ))}
        </div>

        <div className="mt-10 text-center">
            <a 
              href={settings.googleReviewsUrl || "https://www.google.com/maps"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#264788] font-semibold hover:text-[#24902C] transition-colors min-h-[48px]"
            >
                {/* GTM Fix */}
                <span className="pointer-events-none flex items-center gap-2">
                    Ver todas as avaliações no Google
                    <ExternalLink size={14} />
                </span>
            </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;