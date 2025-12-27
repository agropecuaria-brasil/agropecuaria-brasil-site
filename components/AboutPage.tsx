import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import Button from './Button';
import { useWhatsApp } from '../contexts/WhatsAppContext';
import { useContent } from '../hooks/useContent';

const AboutPage: React.FC = () => {
  const { openModal } = useWhatsApp();
  const { settings } = useContent();
  const { contactInfo } = settings;

  return (
    <div className="bg-white pt-40 pb-20 animate-in fade-in duration-500 font-sans">
      <div className="text-center mb-10 px-4">
        <span className="text-[#E5C808] font-extrabold uppercase tracking-widest text-sm block mb-2">DESDE 1997</span>
        <h1 className="text-[#2C3E50] text-3xl md:text-5xl font-extrabold font-['Montserrat']">Conheça Nossa Loja Física</h1>
        <div className="w-24 h-1.5 bg-[#24902C] mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden relative mb-12 shadow-[0_20px_40px_rgba(36,144,44,0.15)] group">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1920&auto=format&fit=crop" alt="Loja" className="w-full h-full object-cover" />
          <div className="absolute bottom-6 left-6 text-white font-bold text-lg flex items-center gap-2"><MapPin size={24} className="text-[#E5C808]" /> São Carlos - SP</div>
        </div>

        <div className="bg-[#F8FBF9] rounded-3xl p-8 md:p-12 border border-[#e0eadd] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h3 className="text-2xl font-bold text-[#264788] mb-8 font-['Montserrat'] flex items-center gap-2"><MapPin className="text-[#E5C808]" /> Venha nos visitar</h3>
            <div className="space-y-8">
               <div className="flex gap-4">
                 <div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-1">Endereço</h4>
                    <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-1">Horários</h4>
                    <p className="text-gray-600">Segunda a Sábado: {contactInfo.openingHoursWeek}</p>
                    <p className="text-gray-600">Domingo: {contactInfo.openingHoursWeekend}</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-1">Contatos</h4>
                    <p className="text-gray-600">{contactInfo.phonePrimary}</p>
                    <p className="text-gray-600">{contactInfo.email}</p>
                 </div>
               </div>
            </div>
            <div className="mt-10">
               <Button variant="whatsapp" fullWidth className="md:w-auto py-4 text-lg shadow-lg" onClick={() => openModal("Olá, gostaria de saber como chegar na loja física.", 'whatsapp_pagina_sobre')}>
                 Falar no WhatsApp
               </Button>
            </div>
          </div>
          <div className="h-full min-h-[350px] w-full bg-white p-2 rounded-2xl shadow-md border border-gray-200">
            <iframe 
                src={contactInfo.googleMapsEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '12px', minHeight: '350px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;