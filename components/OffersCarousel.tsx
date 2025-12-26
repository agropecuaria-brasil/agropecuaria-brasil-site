import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useContent } from '../hooks/useContent';
import WhatsAppIcon from './WhatsAppIcon';

const OffersCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isPaused, setIsPaused] = useState(false); // Estado para pausar no hover
  const { openModal } = useWhatsApp();
  const { products } = useContent(); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efeito para Loop Eterno (Auto-play)
  useEffect(() => {
    if (isPaused || !products || products.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 segundos

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, isPaused, products]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= products.length - itemsPerPage ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? products.length - itemsPerPage : prev - 1));
  };

  // Se não houver produtos (Produção sem cadastro), não renderiza nada
  if (!products || products.length === 0) return null;

  return (
    <section id="ofertas" className="bg-[#E9F5EC] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="mb-10">
          <h2 className="text-[#24902C] text-sm font-bold uppercase tracking-wider mb-2">Imperdível</h2>
          <h3 className="text-[#2C3E50] text-3xl font-extrabold">Ofertas Especiais</h3>
        </div>

        <div 
           className="relative group"
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}
        >
          {products.length > itemsPerPage && (
            <button 
              onClick={prevSlide} 
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full text-[#24902C] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Oferta Anterior"
            >
                <ChevronLeft />
            </button>
          )}
          
          <div className="overflow-hidden py-4 px-1">
            <div className="flex gap-0 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}>
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerPage}%` }}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 h-full flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all relative">
                    {product.badge && <span className="absolute top-4 left-4 z-10 bg-[#E5C808] text-[#264788] text-[11px] font-bold px-3 py-1 rounded-full">{product.badge}</span>}
                    <div className="h-[200px] flex items-center justify-center mb-4"><img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" /></div>
                    <div className="flex flex-col flex-grow">
                      
                      {/* Tratamento para múltiplas categorias */}
                      <span className="text-xs text-[#6D7B8C] font-bold uppercase mb-1">
                        {Array.isArray(product.categories) 
                           ? product.categories.join(' • ') 
                           : product.categories || 'Geral'}
                      </span>
                      
                      <h4 className="text-[#2C3E50] font-bold text-lg mb-3 line-clamp-2">{product.name}</h4>
                      <div className="mt-auto">
                        {product.oldPrice && <span className="text-sm text-gray-400 line-through">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>}
                        <span className="block text-2xl font-extrabold text-[#24902C] mb-4">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                        <button 
                          onClick={() => openModal(product)} 
                          className="gtm-btn-offer-buy w-full py-4 border-2 border-gray-100 rounded-xl font-bold text-[#2C3E50] hover:bg-[#24902C] hover:text-white transition-all flex items-center justify-center click-fix min-h-[48px]"
                          data-gtm-label="Compre Agora"
                        >
                          <span className="flex items-center gap-2 pointer-events-none">
                             <WhatsAppIcon size={18} />
                             Compre Agora
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {products.length > itemsPerPage && (
             <button 
                onClick={nextSlide} 
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full text-[#24902C] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label="Próxima Oferta"
             >
                <ChevronRight />
             </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OffersCarousel;