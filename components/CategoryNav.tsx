import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, 
  Dog, Cat, Bird, Fish, Rat, 
  Utensils, Bone, Syringe, 
  Shirt, Bed, SprayCan, 
  Tractor, Turtle, ShowerHead,
  Tag, Puzzle
} from 'lucide-react';

const categories = [
  { name: 'Cães', icon: Dog },
  { name: 'Gatos', icon: Cat },
  { name: 'Pássaros', icon: Bird },
  { name: 'Peixes', icon: Fish },
  { name: 'Répteis', icon: Turtle },
  { name: 'Grande Porte', icon: Tractor }, 
  { name: 'Roedores', icon: Rat },
  { name: 'Rações', icon: Utensils },
  { name: 'Petiscos', icon: Bone },
  { name: 'Medicamentos', icon: Syringe },
  { name: 'Higiene', icon: ShowerHead },
  { name: 'Acessórios', icon: Tag },
  { name: 'Brinquedos', icon: Puzzle },
  { name: 'Roupas', icon: Shirt },
  { name: 'Caminhas', icon: Bed },
  { name: 'Dedetização', icon: SprayCan }
];

const CategoryNav: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(4);
      else setItemsPerPage(6);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => { nextSlide(); }, 3000);
    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage, isPaused]);

  const nextSlide = () => {
    setStartIndex((prev) => {
      const maxIndex = categories.length - itemsPerPage;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setStartIndex((prev) => {
      const maxIndex = categories.length - itemsPerPage;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <section 
      className="bg-gray-50 py-10 relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Navegação de Categorias"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-12 relative">
        
        <h2 className="sr-only">Categorias de Produtos</h2>

        <button 
          onClick={prevSlide}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 text-[#24902C] p-3 rounded-full shadow-lg hover:bg-[#24902C] hover:text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Categoria Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        {/* CLS FIX: min-height-[180px] aumentado para garantir que não haja cortes ou pulos */}
        <div className="overflow-hidden py-4 -my-4 min-h-[180px]">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` 
            }}
          >
            {categories.map((cat, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-2 box-border select-none"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="bg-white rounded-2xl py-6 px-2 text-center transition-all duration-300 border-2 border-transparent cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:border-[#E5C808] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(36,144,44,0.15)] h-full min-h-[160px] flex flex-col items-center justify-center group/card">
                  <div 
                     className="pointer-events-none w-[64px] h-[64px] bg-[#E9F5EC] rounded-full flex items-center justify-center mb-3 text-[#24902C] transition-colors duration-300 group-hover/card:bg-[#24902C] group-hover/card:text-white"
                     style={{ pointerEvents: 'none' }}
                  >
                    <cat.icon size={32} />
                  </div>
                  {/* CLS FIX: min-h-[40px] para o texto e leading-tight para evitar pulos quando a fonte carrega */}
                  <div className="min-h-[40px] flex items-center justify-center w-full px-1">
                    <span 
                        className="pointer-events-none font-bold text-[#2C3E50] font-sans text-sm md:text-base leading-tight block w-full break-words"
                        style={{ pointerEvents: 'none' }}
                    >
                        {cat.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={nextSlide}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 text-[#24902C] p-3 rounded-full shadow-lg hover:bg-[#24902C] hover:text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Próxima Categoria"
        >
          <ChevronRight size={24} />
        </button>

      </div>
    </section>
  );
};

export default CategoryNav;