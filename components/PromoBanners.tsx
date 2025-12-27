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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
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
                  className="relative h-64 md:h-72 rounded-3xl overflow-hidden shadow-lg group isolate block w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
            // Se for cor sólida, aplica o gradiente de legibilidade.
            const gradientStyle = isTransparent 
              ? {} 
              : { background: `linear-gradient(to right, ${banner.bgColor} 10%, ${banner.bgColor}90 35%, transparent 70%)` };

            return (
              <div 
                key={index}
                className="relative h-64 md:h-72 rounded-3xl overflow-hidden shadow-lg group isolate"
                style={{ backgroundColor: isTransparent ? 'transparent' : banner.bgColor }}
              >
                <div className="absolute inset-0 w-full h-full z-0">
                   <img 
                     src={banner.bgImage} 
                     alt={banner.title} 
                     className="w-full h-full object-cover object-right transform group-hover:scale-105 transition-transform duration-700"
                     loading="lazy"
                     width="800"
                     height="400"
                     decoding="async"
                   />
                </div>
                
                {/* Overlay de Gradiente (Apenas se não for transparente) */}
                <div 
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={gradientStyle}
                ></div>

                <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-10 max-w-[65%]">
                  <h3 className="text-3xl font-extrabold mb-2 leading-tight drop-shadow-sm" style={{ color: banner.textColor }}>
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="font-medium mb-6 text-sm md:text-base leading-snug max-w-xs" style={{ color: banner.textColor, opacity: 0.9 }}>
                      {banner.subtitle}
                    </p>
                  )}
                  <div>
                    <button 
                       onClick={() => openModal(`Olá, vi o banner "${banner.title}" e gostaria de saber mais!`)}
                       className="gtm-btn-promo-banner inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 min-h-[44px] click-fix"
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