import React from 'react';
import { Dog, Sprout, Tractor, Syringe } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';

const categories = [
  {
    title: "Pets (Cães e Gatos)",
    description: "Rações premium, brinquedos, camas e acessórios para o seu melhor amigo.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop&fm=webp",
    icon: Dog
  },
  {
    title: "Animais de Produção",
    description: "Nutrição e equipamentos para bovinos, equinos, aves e suínos.",
    image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=600&auto=format&fit=crop&fm=webp",
    icon: Tractor
  },
  {
    title: "Plantação & Jardinagem",
    description: "Ferramentas, sementes, adubos e tratamento para o seu cultivo e lazer.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=600&auto=format&fit=crop&fm=webp",
    icon: Sprout
  },
  {
    title: "Farmácia Veterinária",
    description: "Medicamentos e vacinas com a orientação que você precisa e confia.",
    image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?q=80&w=600&auto=format&fit=crop&fm=webp",
    icon: Syringe
  }
];

const Products: React.FC = () => {
  const { openModal } = useWhatsApp();

  return (
    <section id="produtos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#24902C] font-bold uppercase tracking-wide text-sm">Vitrine da Loja</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#264788] mt-2">
            Tudo o que você precisa em um só lugar
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Trabalhamos com as melhores marcas do mercado para garantir a saúde do seu animal e a produtividade do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg bg-white h-full flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full z-20 shadow-md">
                   <cat.icon className="text-[#24902C]" size={20} />
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#264788] transition-colors">
                  {cat.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {cat.description}
                </p>
                <div className="mt-auto">
                  <button 
                    onClick={() => openModal({ 
                      id: `cat-${idx}`, 
                      name: cat.title,
                      category: 'Categoria',
                      price: 0,
                      image: cat.image
                    })}
                    className="gtm-btn-product-consult text-[#24902C] font-semibold text-sm hover:underline flex items-center gap-1 group/btn click-fix min-h-[44px] w-full"
                    data-gtm-label={`Consultar ${cat.title}`}
                  >
                    <span className="pointer-events-none">Consultar disponibilidade &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;