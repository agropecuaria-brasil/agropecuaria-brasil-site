// Utilitário simples para Google Tag Manager
// Em produção, substitua pelo seu ID real
export const GTM_ID = 'GTM-DEMO';

export const gtmEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Inicializa o dataLayer se não existir
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Push do evento
    (window as any).dataLayer.push({
      event: eventName,
      ...eventParams
    });
    
    // Log para desenvolvimento (opcional)
    console.log(`[GTM] Event: ${eventName}`, eventParams);
  }
};