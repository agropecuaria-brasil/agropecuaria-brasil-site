import React, { useState } from 'react';
import { X, Loader2, ShoppingBag, Send, Users } from 'lucide-react';
import { ProductData, LeadData } from '../types';
import { sendToGoogleSheets } from '../lib/sanity';
import { useContent } from '../hooks/useContent';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  customMessage?: string;
  product?: ProductData;
  isGroupVip?: boolean;
  source?: string; // Nova prop
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, customMessage, product, isGroupVip = false, source }) => {
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

    // Define a origem final. Se for VIP, força 'newsletter' (ou mantém a lógica anterior), 
    // caso contrário usa a source passada ou fallback para 'whatsapp_modal'
    const finalSource = isGroupVip ? 'newsletter' : (source || 'whatsapp_modal');

    // 1. Configurar dados para envio
    const leadData: LeadData = {
      ...formData,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
      source: finalSource,
      // Define a aba da planilha baseado no tipo de modal
      sheetName: isGroupVip ? 'Grupo VIP Leads' : 'WhatsApp Leads', 
      message: isGroupVip 
        ? 'Solicitação de entrada no Grupo VIP' 
        : (product ? `Interesse em: ${product.name} (R$ ${product.price?.toFixed(2)})` : customMessage || 'Início de atendimento')
    };

    // Enviar para Google Sheets (Backend) - Não espera resposta para não travar UX
    sendToGoogleSheets(leadData).catch(err => console.error("Erro silencioso ao salvar lead", err));

    // 2. Redirecionar
    setTimeout(() => {
      if (isGroupVip) {
        // Redireciona para o Link do Grupo (definido no Sanity)
        const groupUrl = settings.whatsappGroupUrl || '#';
        window.open(groupUrl, '_blank');
      } else {
        // Redireciona para o WhatsApp de Atendimento Padrão
        let finalMessage = '';
        if (product) {
          const priceText = product.price ? ` por R$ ${product.price.toFixed(2).replace('.', ',')}` : '';
          finalMessage = `Olá! Me chamo ${formData.name}. Gostaria de saber mais sobre o produto: *${product.name}*${priceText} que vi no site.`;
        } else {
          const baseMessage = customMessage || `Olá! Me chamo ${formData.name}. Vim do site e preciso de atendimento.`;
          finalMessage = `${baseMessage}`;
        }

        // Adiciona o sufixo invisível no site, mas visível na mensagem do WhatsApp
        finalMessage += " _(NÃO APAGUE essa mensagem para o correto atendimento)_";

        const encodedMessage = encodeURIComponent(finalMessage);
        window.open(`https://wa.me/${settings.whatsappGlobal}?text=${encodedMessage}`, '_blank');
      }

      setIsLoading(false);
      setFormData({ name: '', email: '', phone: '' });
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-[#E5C808] min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6 font-bold text-xl text-[#264788]">
          {isGroupVip ? 'Entrar no Grupo VIP' : 'Iniciar Atendimento'}
        </div>

        {isGroupVip && (
          <div className="mb-6 text-center text-sm text-gray-600 bg-[#E9F5EC] p-4 rounded-xl border border-green-100">
             <p>Preencha seus dados abaixo para liberar seu acesso exclusivo às ofertas do grupo.</p>
          </div>
        )}

        {!isGroupVip && product && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5 flex items-center gap-3">
             <ShoppingBag size={20} className="text-[#24902C]" />
             <div className="overflow-hidden">
               <p className="text-[10px] uppercase font-bold text-gray-500">Interesse em:</p>
               <p className="text-[#264788] font-bold text-sm truncate">{product.name}</p>
             </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nome Completo</label>
            <input 
              type="text" required placeholder="Digite seu nome" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-[#24902C] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">E-mail</label>
            <input 
              type="email" required placeholder="Digite seu e-mail" 
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-[#24902C] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">WhatsApp / Telefone</label>
            <input 
              type="tel" required placeholder="(DDD) 99999-9999" 
              value={formData.phone} onChange={handlePhoneChange}
              maxLength={15}
              className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-[#24902C] transition-colors"
            />
          </div>

          <button 
            type="submit" disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transform active:scale-95 transition-all mt-2 min-h-[48px] ${
              isGroupVip 
                ? "gtm-btn-vip-submit bg-[#E5C808] text-[#264788] hover:bg-[#d4b907]" 
                : "gtm-btn-whatsapp-submit bg-[#24902C] text-white hover:bg-[#1e7a25]"
            }`}
          >
             {/* GTM Fix: pointer-events-none para garantir leitura do texto do botão */}
             <span className="pointer-events-none flex items-center gap-2 justify-center w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : 
                  (isGroupVip ? <>Entrar no Grupo <Users size={18} /></> : <>Iniciar Conversa <Send size={18} /></>)
                }
             </span>
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-2">
            Seus dados estão seguros.
          </p>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppModal;