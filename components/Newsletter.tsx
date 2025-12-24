import React from 'react';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Newsletter: React.FC = () => {
  const { openGroupModal } = useWhatsApp();

  return (
    <section className="relative bg-gradient-to-br from-[#24902C] to-[#1e7a25] py-20 overflow-hidden">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E5C808]/10 rounded-full blur-3xl"></div>
         {/* Marca d'água gigante do WhatsApp */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 rotate-12">
            <WhatsAppIcon size={500} />
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-[#E5C808] font-bold text-xs md:text-sm mb-8 border border-white/10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
           <Sparkles size={16} />
           <span className="tracking-wide uppercase">Clube de Vantagens</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 font-['Montserrat'] leading-tight drop-shadow-sm">
          Ofertas Exclusivas na <br className="hidden md:block" /> Palma da Sua Mão
        </h2>
        
        <p className="text-green-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Entre para o nosso <strong>Grupo VIP no WhatsApp</strong>. Receba avisos de promoções, ofertas e novidades antes de todo mundo.
          <br/><span className="text-sm opacity-70 font-normal mt-2 block">(Sem spam, apenas o que interessa para você e seu pet)</span>
        </p>
        
        <div className="flex flex-col items-center gap-4">
            {/* Botão Principal - Agora abre o Modal */}
            <button 
              onClick={openGroupModal}
              id="btn-vip-group"
              className={`
                gtm-btn-vip-group click-fix
                relative z-20 cursor-pointer
                group
                px-10 py-5 rounded-full 
                bg-[#E5C808] text-[#264788] 
                transition-all duration-300
                shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(229,200,8,0.4)]
                hover:-translate-y-1 hover:bg-[#ffe01b] hover:scale-105
                flex items-center justify-center
                min-w-[300px]
                border-none outline-none
              `}
              data-gtm-label="Entrar Grupo VIP"
            >
              <span 
                className="pointer-events-none flex items-center gap-3 font-extrabold text-lg uppercase tracking-wide"
                style={{ pointerEvents: 'none' }}
              >
                 <WhatsAppIcon size={28} />
                 QUERO ENTRAR NO GRUPO
              </span>
            </button>
            
            <p className="text-white/60 text-xs mt-6">
              Ao entrar você concorda com a nossa <Link to="/politica-privacidade" className="underline decoration-[#E5C808]/50 hover:text-[#E5C808] transition-colors">política de privacidade</Link>.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;