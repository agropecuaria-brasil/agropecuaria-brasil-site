import React from 'react';
import Button from './Button';
import { useWhatsApp } from '../contexts/WhatsAppContext';

const SearchHelp: React.FC = () => {
  const { openModal } = useWhatsApp();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-[#F3F4F6] rounded-3xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Não encontrou o que procurava?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Temos um inventário completo e dinâmico. Chame nossa equipe no WhatsApp, teremos prazer em verificar o estoque e separar seu pedido.
          </p>
          <Button 
            variant="whatsapp"
            onClick={() => openModal("Olá, não encontrei o que procurava e gostaria de falar com um vendedor.", 'whatsapp_ajuda_nao_encontrou')}
          >
            Falar com um vendedor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchHelp;