import React from 'react';
import { Dog, Sprout, Tractor, Syringe, Fish, Cat } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useContent } from '../hooks/useContent';

const iconMap: Record<string, any> = {
  Dog, Sprout, Tractor, Syringe, Fish, Cat
};

const Products: React.FC = () => {
  const { openModal } = useWhatsApp();
  const { settings } = useContent();
  
  const showcaseItems = settings.showcaseItems || [];

  if (showcaseItems.length === 0) return null;

  return (
    <section id="produtos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Acessibilidade: Texto verde mais escuro (#1e7a25) para passar em contraste em fundo branco */}
          <h2 className="text-[#1e7a25] font-bold uppercase tracking-wide text-sm">Vitrine da Loja</h2>
          {/* Hierarquia correta: H2 para título da seção */}
          <p className="text-3xl md:text-4xl font-extrabold text-[#264788] mt-2">
            Tudo o que você precisa em um só lugar
          </p>
          {/* Acessibilidade: Cinza mais escuro (gray-600 -> gray-700) */}
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Trabalhamos com as melhores marcas do mercado para garantir a saúde do seu animal e a produtividade do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item, idx) => {
            const Icon = iconMap[item.icon] || Dog;
            return (
              <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg bg-white h-full flex flex-col border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="350" // Definir dimensão ajuda a reduzir CLS
                    height="250"
                    decoding="async"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full z-20 shadow-md">
                    <Icon className="text-[#1e7a25]" size={20} />
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  {/* Hierarquia: H3 para cards dentro da seção */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#264788] transition-colors">
                    {item.title}
                  </h3>
                  {/* Contraste melhorado */}
                  <p className="text-gray-700 text-sm mb-4 flex-grow font-medium">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => openModal({ 
                        id: `cat-${idx}`, 
                        name: item.title,
                        categories: ['Categoria'],
                        price: 0,
                        image: item.image
                      }, 'whatsapp_vitrine_produtos')}
                      // Acessibilidade: Botão com área de toque mínima de 44px e contraste verde escuro
                      className="gtm-btn-product-consult text-[#1e7a25] font-bold text-sm hover:underline flex items-center gap-1 group/btn click-fix min-h-[48px] w-full"
                      data-gtm-label={`Consultar ${item.title}`}
                      aria-label={`Consultar disponibilidade para ${item.title}`}
                    >
                      <span className="pointer-events-none">Consultar disponibilidade &rarr;</span>
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

export default Products;