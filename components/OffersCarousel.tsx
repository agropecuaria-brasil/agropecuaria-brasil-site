import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useContent } from '../hooks/useContent';
import WhatsAppIcon from './WhatsAppIcon';

const OffersCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
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

  useEffect(() => {
    if (isPaused || !products || products.length === 0) return;
    
    // Intervalo aumentado para 5s para reduzir Main Thread work
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 

    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, isPaused, products]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= products.length - itemsPerPage ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? products.length - itemsPerPage : prev - 1));
  };

  if (!products || products.length === 0) return null;

  return (
    <section id="ofertas" className="bg-[#E9F5EC] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="mb-10">
          {/* Contraste: Verde mais escuro */}
          <h2 className="text-[#1e7a25] text-sm font-bold uppercase tracking-wider mb-2">Imperdível</h2>
          {/* Hierarquia: Era H3, mas não tinha H2 antes se considerar o H2 acima como subtitulo. Ajustando estrutura. */}
          <p className="text-[#2C3E50] text-3xl font-extrabold">Ofertas Especiais</p>
        </div>

        <div 
           className="relative group"
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}
        >
          {products.length > itemsPerPage && (
            <button 
              onClick={prevSlide} 
              // Acessibilidade: Botão 48x48px mínimo para toque
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full text-[#1e7a25] shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity min-w-[48px] min-h-[48px] flex items-center justify-center border border-gray-100"
              aria-label="Ver oferta anterior"
            >
                <ChevronLeft size={24} />
            </button>
          )}
          
          <div className="overflow-hidden py-4 px-1">
            <div className="flex gap-0 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}>
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerPage}%` }}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 h-full flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all relative">
                    
                    {/* Contraste do Badge: Texto escuro no amarelo */}
                    {product.badge && <span className="absolute top-4 left-4 z-10 bg-[#E5C808] text-[#264788] text-[11px] font-extrabold px-3 py-1 rounded-full">{product.badge}</span>}
                    
                    <div className="h-[200px] flex items-center justify-center mb-4 relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain" 
                        loading="lazy"
                        width="350"
                        height="350"
                        decoding="async"
                      />
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      
                      {/* Contraste: Cinza mais escuro para categoria */}
                      <span className="text-xs text-[#546b82] font-bold uppercase mb-1">
                        {Array.isArray(product.categories) 
                           ? product.categories.join(' • ') 
                           : product.categories || 'Geral'}
                      </span>
                      
                      {/* Hierarquia: H3 para nome do produto */}
                      <h3 className="text-[#2C3E50] font-bold text-lg mb-3 line-clamp-2 min-h-[56px]">{product.name}</h3>
                      
                      <div className="mt-auto">
                        {/* Contraste: Preço antigo mais visível */}
                        {product.oldPrice && <span className="text-sm text-gray-500 line-through font-medium">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>}
                        
                        {/* Contraste: Preço novo em verde escuro */}
                        <span className="block text-2xl font-extrabold text-[#1e7a25] mb-4">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                        
                        <button 
                          onClick={() => openModal(product, 'whatsapp_carrossel_ofertas')} 
                          // Acessibilidade: Botão com texto escuro para contraste no fundo transparente/branco e hover acessível
                          className="gtm-btn-offer-buy w-full py-4 border-2 border-gray-200 rounded-xl font-bold text-[#2C3E50] hover:bg-[#1e7a25] hover:border-[#1e7a25] hover:text-white transition-all flex items-center justify-center click-fix min-h-[48px]"
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
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full text-[#1e7a25] shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity min-w-[48px] min-h-[48px] flex items-center justify-center border border-gray-100"
                aria-label="Ver próxima oferta"
             >
                <ChevronRight size={24} />
             </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OffersCarousel;