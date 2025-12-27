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

// 1. Crie a planilha e o script conforme instruções.
// 2. Publique como Web App (Quem pode acessar: "Qualquer pessoa").
// 3. Cole a URL gerada (terminada em /exec) abaixo:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztNOdTHhN4O1JgblALoihHyqr1R7-sgwrVenaqa-xfnAkFPg5dllnwKU6lxfR_GIIgCw/exec'; 

export const sendToGoogleSheets = async (data: LeadData): Promise<boolean> => {
  try {
    console.log('Enviando dados...', data);
    
    // Validação simples para evitar erro se a URL não for colada
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('COLE_SUA_URL')) {
      console.warn('GOOGLE_SCRIPT_URL não configurada em lib/sanity.ts. O lead não será salvo na planilha.');
      // Simulamos sucesso para não travar o usuário, mas avisamos no console
      return true;
    }

    // O 'no-cors' é necessário para enviar dados para o Google Apps Script sem erro de bloqueio de navegador.
    // Com 'no-cors', não recebemos resposta de sucesso/erro, então assumimos que foi enviado.
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