import React, { createContext, useContext, useState, ReactNode } from 'react';
import WhatsAppModal from '../components/WhatsAppModal';
import { ProductData } from '../types';

interface WhatsAppContextData {
  openModal: (data?: string | ProductData) => void;
  openGroupModal: () => void; // Nova função para abrir modal do grupo
  closeModal: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextData>({} as WhatsAppContextData);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<ProductData | undefined>(undefined);
  const [isGroupVip, setIsGroupVip] = useState(false); // Estado para controlar se é fluxo de Grupo

  const openModal = (data?: string | ProductData) => {
    setIsGroupVip(false); // Garante que não é grupo
    if (typeof data === 'string') {
      setMessage(data);
      setProduct(undefined);
    } else if (typeof data === 'object' && data !== null) {
      setProduct(data);
      setMessage(undefined);
    } else {
      setMessage(undefined);
      setProduct(undefined);
    }
    setIsOpen(true);
  };

  const openGroupModal = () => {
    setIsGroupVip(true); // Ativa modo Grupo VIP
    setMessage(undefined);
    setProduct(undefined);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage(undefined);
    setProduct(undefined);
    setIsGroupVip(false);
  };

  return (
    <WhatsAppContext.Provider value={{ openModal, openGroupModal, closeModal }}>
      {children}
      <WhatsAppModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        customMessage={message} 
        product={product}
        isGroupVip={isGroupVip} // Passa a flag para o modal
      />
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => useContext(WhatsAppContext);