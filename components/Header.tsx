import React, { useState, useEffect } from 'react';
import { Menu, X, Truck, Package, Calendar, Award } from 'lucide-react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import WhatsAppIcon from './WhatsAppIcon';

const iconMap: Record<string, any> = {
  Truck, Package, Calendar, Award
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { openModal } = useWhatsApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, announcements } = useContent();

  useEffect(() => {
    if (announcements.length === 0) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);

  // Recupera o ícone dinâmico do mapa
  const currentIconName = announcements[currentAnnouncement]?.icon || 'Calendar';
  const ActiveIcon = iconMap[currentIconName] || Calendar;

  // Função ajustada para prevenir comportamento padrão, forçar scroll e ATUALIZAR URL
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    setIsOpen(false);
    
    // Atualiza a URL no navegador manualmente (History API) para manter ex: /contato ou /#contato
    // Como estamos usando HashRouter, a URL é /#home, /#produtos etc.
    // O href já vem como '/#produtos', então window.location.hash faria o serviço, mas queremos scroll suave.
    
    const targetId = href.startsWith('/') ? href.substring(1) : href; // Pega '#loja'
    
    // Se estiver na home
    if (location.pathname === '/' || location.pathname === '') {
       // Atualiza a URL visualmente
       window.history.pushState({}, '', href);
       
       const el = document.querySelector(targetId);
       if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
       // Se não estiver na home, navega para a home com a hash
       navigate(href);
       // O componente Hero ou ScrollToTop pode lidar com o scroll após a navegação
       setTimeout(() => {
          const el = document.querySelector(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
       }, 300);
    }
  };

  const navItems = [
    { label: 'Início', href: '/#home', type: 'anchor' },
    { label: 'Produtos', href: '/#produtos', type: 'anchor' },
    { label: 'Ofertas', href: '/#ofertas', type: 'anchor' },
    { label: 'Sobre', href: '/#sobre', type: 'anchor' },
    { label: 'Depoimentos', href: '/#depoimentos', type: 'anchor' },
    { label: 'Contato', href: '/#loja', type: 'anchor' }, 
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex flex-col shadow-md transition-all duration-300 font-sans">
      
      {/* Top Bar */}
      <div className="bg-[#24902C] text-white py-2.5 px-4 w-full relative z-50 h-10 flex items-center justify-center overflow-hidden">
        <div 
          className={`flex items-center gap-2 transition-opacity duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
           {announcements.length > 0 && (
             <>
               <ActiveIcon size={18} className="text-[#E5C808]" strokeWidth={2.5} />
               <span className="text-xs md:text-sm font-semibold tracking-wide">
                 {announcements[currentAnnouncement]?.text}
               </span>
             </>
           )}
        </div>
      </div>

      <div className="bg-white h-24 w-full relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="hidden md:flex justify-between items-center h-full">
            
            {/* Logo */}
            <div className="flex-shrink-0 h-full py-2 flex items-center">
               <Link to="/" className="h-full flex items-center" aria-label="Ir para página inicial">
                 {settings.logoHeader?.url ? (
                   <img 
                     src={settings.logoHeader.url} 
                     alt="Logo Agropecuária Brasil" 
                     className="h-full w-auto object-contain max-h-16"
                   />
                 ) : (
                   <span className="text-2xl font-bold text-[#24902C] tracking-tighter">Agropecuária Brasil</span>
                 )}
               </Link>
            </div>

            <nav className="flex space-x-8">
              {navItems.map((item) => (
                item.type === 'route' ? (
                  <Link 
                    key={item.label}
                    to={item.href}
                    className="text-base font-medium text-gray-700 hover:text-[#24902C] hover:font-bold transition-all relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#24902C] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-base font-medium text-gray-700 hover:text-[#24902C] hover:font-bold transition-all relative group cursor-pointer"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#24902C] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              ))}
            </nav>

            <div className="flex items-center">
               <button 
                 onClick={() => openModal()}
                 className="gtm-btn-header-budget flex items-center justify-center px-6 py-2.5 rounded-full bg-[#24902C] text-white font-semibold hover:bg-[#1e7a25] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 click-fix"
               >
                  <span className="flex items-center gap-2 pointer-events-none">
                    <WhatsAppIcon size={20} />
                    <span>Faça seu Orçamento</span>
                  </span>
               </button>
            </div>
          </div>

          <div className="md:hidden flex justify-between items-center h-full">
            <div className="flex items-center h-full py-3">
              <Link to="/" className="h-full flex items-center" aria-label="Ir para página inicial">
                 {settings.logoHeader?.url ? (
                   <img 
                     src={settings.logoHeader.url} 
                     alt="Logo" 
                     className="h-full w-auto object-contain max-h-12"
                   />
                 ) : (
                   <span className="text-lg font-bold text-[#24902C] tracking-tighter">Agropecuária Brasil</span>
                 )}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-3 rounded-md text-gray-700 hover:bg-gray-100 min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-[calc(6rem+40px)] left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-30 animate-in slide-in-from-top-5 duration-200">
          <div className="py-2 px-4 space-y-1">
            {navItems.map((item) => (
                item.type === 'route' ? (
                  <Link 
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-[#24902C] hover:bg-gray-50 px-4 py-4 rounded-lg min-h-[48px]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-lg font-medium text-gray-700 hover:text-[#24902C] hover:bg-gray-50 px-4 py-4 rounded-lg min-h-[48px]"
                  >
                    {item.label}
                  </a>
                )
            ))}
            <button
              onClick={() => { setIsOpen(false); openModal(); }}
              className="gtm-btn-header-budget block w-full text-center bg-[#24902C] text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center shadow-sm click-fix min-h-[48px]"
            >
              <span className="flex items-center justify-center gap-2 pointer-events-none">
                <WhatsAppIcon size={20} />
                Faça seu Orçamento
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;