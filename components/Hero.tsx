
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { ArrowRight, MapPin } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openModal } = useWhatsApp();
  const navigate = useNavigate();
  const { settings } = useContent();
  const heroSlides = settings.heroSlides || [];

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleScrollToStore = () => {
    const section = document.getElementById('loja');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#loja');
    }
  };

  // Mapeia o tema selecionado no Sanity para classes Tailwind
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'green':
        return {
          gradient: "from-[#24902C]/95 via-[#24902C]/70 to-black/20",
          textColor: "text-white",
          badgeStyle: "bg-[#E5C808]/20 border-[#E5C808] text-[#E5C808]",
          whatsappBtn: "!bg-[#E5C808] !text-[#264788] hover:!bg-[#d4b907]",
          outlineBtn: "!text-white !border-white hover:!bg-white hover:!text-[#24902C]"
        };
      case 'yellow':
        return {
          gradient: "from-[#E5C808]/95 via-[#E5C808]/70 to-black/10",
          textColor: "text-[#264788]",
          badgeStyle: "bg-[#24902C]/10 border-[#24902C] text-[#24902C]",
          whatsappBtn: "", // Verde padrão
          outlineBtn: "!text-[#264788] !border-[#264788] hover:!bg-[#264788] hover:!text-white"
        };
      case 'white':
        return {
          gradient: "from-white via-white/80 to-transparent",
          textColor: "text-[#264788]",
          badgeStyle: "bg-[#24902C]/10 border-[#24902C] text-[#24902C]",
          whatsappBtn: "",
          outlineBtn: "!text-[#264788] !border-[#264788] hover:!bg-[#264788] hover:!text-white"
        };
      case 'blue':
      default:
        return {
          gradient: "from-[#264788]/95 via-[#264788]/70 to-black/20",
          textColor: "text-white",
          badgeStyle: "bg-[#E5C808]/20 border-[#E5C808] text-[#E5C808]",
          whatsappBtn: "",
          outlineBtn: "!text-white !border-white hover:!bg-white hover:!text-[#264788]"
        };
    }
  };

  if (heroSlides.length === 0) return null;

  const currentSlide = heroSlides[currentIndex];
  const styles = getThemeStyles(currentSlide.theme);

  return (
    <section id="home" className="relative h-[720px] flex items-center overflow-hidden bg-[#264788] pt-[136px]">
      
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => {
          const slideStyles = getThemeStyles(slide.theme);
          // Apenas a primeira imagem deve ter prioridade alta para melhorar o LCP
          const isFirstSlide = index === 0;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover hidden md:block"
                fetchPriority={isFirstSlide ? "high" : "auto"}
                loading={isFirstSlide ? "eager" : "lazy"}
              />
               <img 
                src={slide.mobileImage || slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover md:hidden"
                fetchPriority={isFirstSlide ? "high" : "auto"}
                loading={isFirstSlide ? "eager" : "lazy"}
              />
               <div className={`absolute inset-0 bg-gradient-to-r ${slideStyles.gradient} z-10`}></div>
            </div>
          );
        })}
      </div>

      {/* Conteúdo */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 md:pb-32 transition-colors duration-1000">
        <div className="max-w-2xl">
          
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full border font-semibold text-sm mb-6 backdrop-blur-sm shadow-sm transition-all duration-1000 ${styles.badgeStyle}`}>
            <MapPin size={16} className="mr-2" />
            Em São Carlos - SP <span className="mx-3 opacity-60">•</span> Desde 1997
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-sm transition-colors duration-1000 ${styles.textColor}`}>
             <span dangerouslySetInnerHTML={{ __html: (currentSlide.title || "").replace(/\n/g, '<br/>') }} />
          </h1>
          
          <p className={`text-lg md:text-xl mb-8 max-w-lg leading-relaxed drop-shadow-sm font-medium transition-colors duration-1000 ${styles.textColor === 'text-white' ? 'text-gray-100' : 'text-gray-700'}`}>
            {currentSlide.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="whatsapp" 
              className={`w-full sm:w-auto text-lg gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all ${styles.whatsappBtn}`}
              onClick={() => openModal()}
            >
              Pedir pelo WhatsApp
            </Button>
            
            <Button 
              variant="outline" 
              className={`w-full sm:w-auto text-lg gap-2 backdrop-blur-sm bg-white/5 transition-all duration-1000 ${styles.outlineBtn}`}
              onClick={handleScrollToStore}
            >
              Conhecer a Loja <ArrowRight size={20} />
            </Button>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-24 md:h-32 lg:h-48 text-white fill-current" preserveAspectRatio="none"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>
    </section>
  );
};

export default Hero;
