import React, { useState } from 'react';
import { Loader2, Send, ShieldCheck, ArrowLeft } from 'lucide-react';
import { sendToGoogleSheets } from '../lib/sanity';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';

interface WhatsAppLandingPageProps {
  source: 'meta_ads' | 'google_ads';
  title: string;
}

const WhatsAppLandingPage: React.FC<WhatsAppLandingPageProps> = ({ source, title }) => {
  const { settings } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Função de máscara para telefone (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, '($1');
    }
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Define a mensagem baseada na origem
    let messageTemplate = '';
    
    if (source === 'meta_ads') {
      messageTemplate = `Olá! Me chamo ${formData.name}. Vim de um anúncio do META e preciso de atendimento _(NÃO APAGUE essa mensagem para o correto atendimento)_`;
    } else {
      messageTemplate = `Olá! Me chamo ${formData.name}. Vim de um anúncio do Google e preciso de atendimento _(NÃO APAGUE essa mensagem para o correto atendimento)_`;
    }

    // 1. Enviar para Google Sheets
    const leadData = {
      ...formData,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
      source: source,
      sheetName: 'WhatsApp Leads', // Salva na mesma aba dos leads de WhatsApp
      message: source === 'meta_ads' ? 'Anúncio Meta (Facebook/Instagram)' : 'Anúncio Google'
    };

    // Dispara o salvamento sem bloquear a UX
    sendToGoogleSheets(leadData).catch(err => console.error("Erro ao salvar lead de anúncio", err));

    // 2. Redirecionar para WhatsApp
    setTimeout(() => {
      const encodedMessage = encodeURIComponent(messageTemplate);
      window.location.href = `https://wa.me/${settings.whatsappGlobal}?text=${encodedMessage}`;
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#264788]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-50"></div>
        {/* Círculo decorativo */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#24902C]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Header do Card */}
        <div className="bg-gray-50 p-6 text-center border-b border-gray-100 flex flex-col items-center">
           <Link to="/" className="mb-4 transition-transform hover:scale-105">
             <img 
               src={settings.logoHeader.url} 
               alt="Agropecuária Brasil" 
               className="h-12 w-auto object-contain"
             />
           </Link>
           <h1 className="text-xl md:text-2xl font-extrabold text-[#264788] font-['Montserrat']">
             {title}
           </h1>
           <p className="text-sm text-gray-500 mt-2">
             Preencha seus dados para ser atendido por um especialista agora mesmo.
           </p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Nome Completo</label>
              <input 
                type="text" required placeholder="Digite seu nome" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#24902C] focus:bg-white transition-all text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">E-mail</label>
              <input 
                type="email" required placeholder="Digite seu e-mail" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#24902C] focus:bg-white transition-all text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">WhatsApp / Telefone</label>
              <input 
                type="tel" required placeholder="(DDD) 99999-9999" 
                value={formData.phone} onChange={handlePhoneChange}
                maxLength={15}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#24902C] focus:bg-white transition-all text-gray-800 font-medium"
              />
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full py-4 bg-[#24902C] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#1e7a25] shadow-lg shadow-green-200 transform active:scale-95 transition-all mt-4"
            >
               {/* GTM Fix: pointer-events-none para garantir leitura do texto do botão */}
              <span className="pointer-events-none flex items-center gap-2 justify-center w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : <>Iniciar Conversa <Send size={20} /></>}
              </span>
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4 bg-gray-50 p-2 rounded-lg">
              <ShieldCheck size={14} className="text-[#24902C]" />
              Seus dados estão 100% seguros.
            </div>
          </form>
        </div>
      </div>

      <Link 
        to="/" 
        className="relative z-10 mt-8 flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Voltar para o site oficial
      </Link>
    </div>
  );
};

export default WhatsAppLandingPage;