import React, { useEffect } from 'react';
import { useContent } from '../hooks/useContent';

const SEOManager: React.FC = () => {
  const { settings } = useContent();

  useEffect(() => {
    // 1. Atualizar Favicon
    if (settings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.favicon;
    }

    // 2. Atualizar Título da Página e OG:Title
    if (settings.title) {
      document.title = settings.title;
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', settings.title);
    }

    // 3. Atualizar Descrição (Meta e OG)
    if (settings.footerDescription) {
       // Limpa quebras de linha e limita caracteres para SEO
       const cleanDesc = settings.footerDescription.replace(/\n/g, ' ').substring(0, 155) + "...";
       
       const metaDesc = document.querySelector('meta[name="description"]');
       if (metaDesc) metaDesc.setAttribute('content', cleanDesc);
       
       const ogDesc = document.querySelector('meta[property="og:description"]');
       if (ogDesc) ogDesc.setAttribute('content', cleanDesc);
    }

    // 4. Atualizar Imagem de Compartilhamento (WhatsApp/Facebook)
    // Usa o Logo do Header como imagem de destaque
    if (settings.logoHeader?.url) {
       let ogImage = document.querySelector('meta[property="og:image"]');
       
       // Se a tag não existir no HTML, cria ela dinamicamente
       if (!ogImage) {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          document.head.appendChild(ogImage);
       }
       
       // Define a URL do logo
       ogImage.setAttribute('content', settings.logoHeader.url);
    }

  }, [settings]);

  return null;
};

export default SEOManager;