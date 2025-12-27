import React from 'react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useContent } from '../hooks/useContent';
import WhatsAppIcon from './WhatsAppIcon';

const PromoBanners: React.FC = () => {
  const { openModal } = useWhatsApp();
  const { promoBanners } = useContent();

  // Função auxiliar para tratar links
  const getSafeLink = (link: string) => {
    if (!link) return '#';
    // Se for âncora (#) ou caminho relativo (/), mantém como está
    if (link.startsWith('#') || link.startsWith('/')) return link;
    // Se já tiver protocolo, mantém
    if (link.match(/^https?:\/\//)) return link;
    // Se não tiver protocolo, assume que é site externo e adiciona https://
    return `https://${link}`;
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {promoBanners.map((banner, index) => {
            const isTransparent = banner.bgColor === 'transparent';
            
            // Se for "Apenas Imagem", o banner inteiro vira um link
            if (banner.onlyImage) {
              const safeLink = getSafeLink(banner.link || '#');
              const isExternal = safeLink.startsWith('http');
              const target = isExternal ? '_blank' : '_self';

              return (
                <a 
                  key={index}
                  href={safeLink}
                  target={target}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  // Mobile: Altura automática com aspecto ajustado. Desktop: Altura fixa.
                  className="relative min-h-[200px] h-auto md:h-72 rounded-3xl overflow-hidden shadow-lg group isolate block w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer aspect-[16/9] md:aspect-auto"
                  style={{ backgroundColor: isTransparent ? 'transparent' : banner.bgColor }}
                  aria-label={banner.title || "Banner Promocional"}
                >
                  <div className="absolute inset-0 w-full h-full z-0">
                     <img 
                       src={banner.bgImage} 
                       alt={banner.title} 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                       loading="lazy"
                       width="800"
                       height="400"
                       decoding="async"
                     />
                  </div>
                </a>
              );
            }

            // Se NÃO for "Apenas Imagem", mantém o layout com texto e botão WhatsApp
            
            // Corrige o gradiente: Se for transparente, não aplica gradiente inválido.
            const gradientStyle = isTransparent 
              ? {} 
              : { background: `linear-gradient(to right, ${banner.bgColor} 15%, ${banner.bgColor}95 45%, transparent 80%)` };

            return (
              <div 
                key={index}
                // Mobile: min-h define altura mínima, mas deixa crescer. Desktop: h-72 fixo.
                className="relative min-h-[280px] md:h-72 rounded-3xl overflow-hidden shadow-lg group isolate flex flex-col justify-center"
                style={{ backgroundColor: isTransparent ? 'transparent' : banner.bgColor }}
              >
                <div className="absolute inset-0 w-full h-full z-0">
                   <img 
                     src={banner.bgImage} 
                     alt={banner.title} 
                     // Mobile: object-center para focar melhor. Desktop: object-right.
                     className="w-full h-full object-cover object-center md:object-right transform group-hover:scale-105 transition-transform duration-700"
                     loading="lazy"
                     width="800"
                     height="400"
                     decoding="async"
                   />
                </div>
                
                {/* Overlay de Gradiente */}
                <div 
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={gradientStyle}
                ></div>

                {/* Container de Texto: Aumentado para 90% no mobile e reduzido padding */}
                <div className="relative z-20 w-full flex flex-col justify-center p-6 md:p-10 max-w-[90%] md:max-w-[65%]">
                  {/* Título menor no mobile (text-2xl) e maior no desktop (text-3xl) */}
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight drop-shadow-sm" style={{ color: banner.textColor }}>
                    {banner.title}
                  </h3>
                  
                  {banner.subtitle && (
                    <p className="font-medium mb-5 md:mb-6 text-sm md:text-base leading-snug max-w-xs" style={{ color: banner.textColor, opacity: 0.9 }}>
                      {banner.subtitle}
                    </p>
                  )}
                  
                  <div>
                    <button 
                       onClick={() => openModal(`Olá, vi o banner "${banner.title}" e gostaria de saber mais!`)}
                       className="gtm-btn-promo-banner inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 min-h-[44px] click-fix"
                       style={{ 
                         backgroundColor: banner.buttonText === 'CONFIRA' ? '#264788' : '#FFFFFF', 
                         color: banner.buttonText === 'CONFIRA' ? '#FFFFFF' : '#24902C' 
                       }}
                       data-gtm-label={banner.buttonText}
                    >
                      <span className="flex items-center gap-2 pointer-events-none">
                        <WhatsAppIcon size={18} />
                        {banner.buttonText}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default PromoBanners;