import { createClient } from '@sanity/client';
import { LeadData } from '../types';

// Configuração do Sanity
export const sanityClient = createClient({
  projectId: 'qrklcww2', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-03-20',
  ignoreBrowserTokenWarning: true, // Evita avisos no console sobre token em ambiente browser
  perspective: 'published', // Garante que apenas conteúdo publicado seja buscado
});

export const urlFor = (source: any) => {
  if (!source || !source.asset) return '';
  return source.asset.url;
};

// --- INTEGRAÇÃO COM GOOGLE SHEETS (VIA APPS SCRIPT) ---

// 1. Cole aqui a URL que você gerou no Google Apps Script (Web App URL)
// Deve parecer com: https://script.google.com/macros/s/AKfycbx.../exec
const GOOGLE_SCRIPT_URL = ''; 

export const sendToGoogleSheets = async (data: LeadData): Promise<boolean> => {
  try {
    console.log('Enviando dados...', data);
    
    // Se a URL não estiver configurada, apenas simula o sucesso (para desenvolvimento)
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('GOOGLE_SCRIPT_URL não configurada em lib/sanity.ts. Simulando envio.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }

    // O 'no-cors' é necessário para enviar dados para o Google Apps Script sem erro de bloqueio
    // Porém, com 'no-cors', não conseguimos ler a resposta (response.ok), então assumimos sucesso se não der erro de rede.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return true;
  } catch (error) {
    console.error('Erro ao enviar lead:', error);
    return false;
  }
};