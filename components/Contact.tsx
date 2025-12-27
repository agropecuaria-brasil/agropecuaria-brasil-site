import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

interface ContactProps {
  onOpenCookieSettings?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenCookieSettings }) => {
  const { settings } = useContent();
  const { contactInfo } = settings;

  return (
    <footer id="contato" className="bg-[#264788] text-white pt-20 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-6 flex items-center">
               {settings.logoFooter?.url && (
                 <img 
                   src={settings.logoFooter.url} 
                   alt="Agropecuária Brasil" 
                   className="h-16 w-auto object-contain"
                   width="200"
                   height="80"
                   loading="lazy"
                 />
               )}
            </div>
            
            {/* Contraste melhorado: text-gray-100 é melhor que gray-200/300 em fundo azul escuro */}
            <p className="text-gray-100 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {settings.footerDescription}
            </p>
            <div className="flex space-x-4">
              {settings.instagramUrl && (
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-[#E5C808] hover:text-[#264788] transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Siga-nos no Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {settings.facebookUrl && (
                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-[#E5C808] hover:text-[#264788] transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Curta nossa página no Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#24902C] inline-block pb-2">Contato & Localização</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <span className="text-gray-100 text-sm whitespace-pre-line">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <div className="text-gray-100 text-sm flex flex-col">
                  <span>{contactInfo.phonePrimary}</span>
                  {contactInfo.phoneSecondary && <span>{contactInfo.phoneSecondary}</span>}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#E5C808] shrink-0" size={18} />
                <span className="text-gray-100 text-sm">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#24902C] inline-block pb-2">Horário de Funcionamento</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <div className="text-gray-100 text-sm">
                  <p className="font-semibold text-white">Segunda a Sábado</p>
                  <p>{contactInfo.openingHoursWeek}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <div className="text-gray-100 text-sm">
                  <p className="font-semibold text-white">Domingo</p>
                  <p>{contactInfo.openingHoursWeekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-gray-300">
            <p className="text-center md:text-left">
              © 2026 Agropecuária Brasil LTDA - CNPJ: 06.881.706-0001-96 | Todos os direitos reservados.
            </p>
            <span className="hidden md:block text-gray-500">|</span>
            <Link 
              to="/politica-privacidade" 
              className="hover:text-[#E5C808] transition-colors underline decoration-dotted underline-offset-2 min-h-[44px] md:min-h-0 flex items-center"
            >
              Política de Privacidade
            </Link>
            <span className="hidden md:block text-gray-500">|</span>
            <button 
              onClick={onOpenCookieSettings} 
              className="hover:text-[#E5C808] transition-colors underline decoration-dotted underline-offset-2 min-h-[44px] md:min-h-0"
            >
              Preferências de Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;