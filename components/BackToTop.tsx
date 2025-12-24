
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Monitora a rolagem da página
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) { // Aumentei um pouco o scroll necessário para aparecer
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função para rolar suavemente até o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed z-30 
        bottom-28 md:bottom-32 
        right-5 md:right-8 
        p-2.5 
        rounded-full 
        bg-white/90 backdrop-blur-sm 
        text-[#264788] 
        border border-gray-100
        shadow-[0_4px_10px_rgba(0,0,0,0.1)] 
        transition-all duration-500 ease-in-out
        transform 
        hover:bg-[#264788] hover:text-white hover:-translate-y-1 hover:shadow-lg
        focus:outline-none
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
      `}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
};

export default BackToTop;
