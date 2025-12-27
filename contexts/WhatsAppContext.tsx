import React, { createContext, useContext, useState, ReactNode } from 'react';
import WhatsAppModal from '../components/WhatsAppModal';
import { ProductData } from '../types';

interface WhatsAppContextData {
  openModal: (data?: string | ProductData, source?: string) => void;
  openGroupModal: () => void; 
  closeModal: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextData>({} as WhatsAppContextData);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<ProductData | undefined>(undefined);
  const [isGroupVip, setIsGroupVip] = useState(false); 
  const [source, setSource] = useState<string>('whatsapp_modal'); // Estado para armazenar a origem

  const openModal = (data?: string | ProductData, customSource?: string) => {
    setIsGroupVip(false);
    
    // Define a origem (default: 'whatsapp_modal' se não informado)
    setSource(customSource || 'whatsapp_modal');

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
    setIsGroupVip(true); 
    setSource('newsletter_grupo_vip'); // Origem específica para o grupo VIP
    setMessage(undefined);
    setProduct(undefined);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage(undefined);
    setProduct(undefined);
    setIsGroupVip(false);
    setSource('whatsapp_modal'); // Reseta para o padrão
  };

  return (
    <WhatsAppContext.Provider value={{ openModal, openGroupModal, closeModal }}>
      {children}
      <WhatsAppModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        customMessage={message} 
        product={product}
        isGroupVip={isGroupVip}
        source={source} // Passa a origem para o modal
      />
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => useContext(WhatsAppContext);