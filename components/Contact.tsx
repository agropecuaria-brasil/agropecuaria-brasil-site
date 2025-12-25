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
               {/* 
                  Aplica 'brightness-0' (preto total) e 'invert' (inverte para branco).
                  Isso garante que mesmo que a imagem seja colorida (ex: a do header),
                  ela apareça branca no rodapé.
               */}
               <img 
                 src={settings.logoFooter.url || "https://placehold.co/200x80/264788/FFFFFF/png?text=Agro+Brasil"} 
                 alt="Agropecuária Brasil" 
                 className="h-16 w-auto object-contain brightness-0 invert"
               />
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {settings.footerDescription}
            </p>
            <div className="flex space-x-4">
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-[#E5C808] hover:text-[#264788] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={settings.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-[#E5C808] hover:text-[#264788] transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#24902C] inline-block pb-2">Contato & Localização</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <span className="text-gray-300 text-sm whitespace-pre-line">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <div className="text-gray-300 text-sm flex flex-col">
                  <span>{contactInfo.phonePrimary}</span>
                  {contactInfo.phoneSecondary && <span>{contactInfo.phoneSecondary}</span>}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#E5C808] shrink-0" size={18} />
                <span className="text-gray-300 text-sm">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#24902C] inline-block pb-2">Horário de Funcionamento</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <div className="text-gray-300 text-sm">
                  <p className="font-semibold text-white">Segunda a Sábado</p>
                  <p>{contactInfo.openingHoursWeek}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-[#E5C808] mt-1 shrink-0" size={18} />
                <div className="text-gray-300 text-sm">
                  <p className="font-semibold text-white">Domingo</p>
                  <p>{contactInfo.openingHoursWeekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-gray-400">
            <p className="text-center md:text-left">
              © 2026 Agropecuária Brasil LTDA - CNPJ: 06.881.706-0001-96 | Todos os direitos reservados.
            </p>
            <span className="hidden md:block text-gray-600">|</span>
            <span className="text-[#E5C808] font-bold">v2.1 (Atualizado)</span>
            <span className="hidden md:block text-gray-600">|</span>
            <Link 
              to="/politica-privacidade" 
              className="hover:text-[#E5C808] transition-colors underline decoration-dotted underline-offset-2"
            >
              Política de Privacidade
            </Link>
            <span className="hidden md:block text-gray-600">|</span>
            <button 
              onClick={onOpenCookieSettings} 
              className="hover:text-[#E5C808] transition-colors underline decoration-dotted underline-offset-2"
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