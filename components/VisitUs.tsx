import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import Button from './Button';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useContent } from '../hooks/useContent';

const VisitUs: React.FC = () => {
  const { openModal } = useWhatsApp();
  const { settings } = useContent();
  const { contactInfo } = settings;

  return (
    <section id="loja" className="py-10 md:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Principal - Agora Branco para contrastar com o fundo cinza */}
        <div className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Coluna da Esquerda: Informações */}
          <div>
            <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-[#E5C808]" size={28} />
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#264788] font-['Montserrat']">
                  Venha nos visitar
                </h3>
            </div>

            <div className="space-y-8">
               {/* Item: Endereço */}
               <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-[#F8FBF9] flex items-center justify-center text-[#24902C] shadow-sm border border-gray-50 shrink-0 group-hover:bg-[#24902C] group-hover:text-white transition-colors duration-300">
                    <MapPin size={22} />
                 </div>
                 <div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-1">Endereço</h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {contactInfo.address}
                    </p>
                 </div>
               </div>

               {/* Item: Horários */}
               <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-[#F8FBF9] flex items-center justify-center text-[#24902C] shadow-sm border border-gray-50 shrink-0 group-hover:bg-[#24902C] group-hover:text-white transition-colors duration-300">
                    <Clock size={22} />
                 </div>
                 <div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-1">Horários</h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      Segunda a Sábado: {contactInfo.openingHoursWeek}
                    </p>
                    <p className="text-gray-500 text-sm md:text-base">
                      Domingo: {contactInfo.openingHoursWeekend}
                    </p>
                 </div>
               </div>

               {/* Item: Contatos */}
               <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-[#F8FBF9] flex items-center justify-center text-[#24902C] shadow-sm border border-gray-50 shrink-0 group-hover:bg-[#24902C] group-hover:text-white transition-colors duration-300">
                    <Phone size={22} />
                 </div>
                 <div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-1">Contatos</h4>
                    <div className="flex flex-col mb-1">
                        <p className="text-gray-600 text-sm md:text-base">
                          {contactInfo.phonePrimary}
                        </p>
                        {contactInfo.phoneSecondary && (
                           <p className="text-gray-600 text-sm md:text-base">
                             {contactInfo.phoneSecondary}
                           </p>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm md:text-base flex items-center gap-1">
                      {contactInfo.email}
                    </p>
                 </div>
               </div>
            </div>

            <div className="mt-10">
               <Button 
                 variant="whatsapp" 
                 onClick={() => openModal("Olá, gostaria de saber como chegar na loja física.", 'whatsapp_visite_nos_loja')}
                 className="w-full md:w-auto py-4 px-8 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
               >
                 Falar no WhatsApp
               </Button>
            </div>
          </div>

          {/* Coluna da Direita: Mapa */}
          <div className="relative h-full min-h-[400px] w-full bg-gray-50 p-3 rounded-2xl shadow-inner border border-gray-200 rotate-1 hover:rotate-0 transition-transform duration-500">
            <iframe 
              src={contactInfo.googleMapsEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '12px', minHeight: '380px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Agropecuária Brasil"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisitUs;