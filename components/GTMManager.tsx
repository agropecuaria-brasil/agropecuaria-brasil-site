import React, { useEffect } from 'react';
import { useContent } from '../hooks/useContent';

const GTMManager: React.FC = () => {
  const { settings } = useContent();

  useEffect(() => {
    // Não faz nada se não tiver ID ou se for placeholder
    if (!settings.gtmId || settings.gtmId === 'GTM-XXXXXX') return;

    const gtmId = settings.gtmId;

    // Função para injetar o GTM
    const loadGTM = () => {
      if (document.getElementById('gtm-script')) return;

      // 1. Injeta o Script no <head>
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`;
      document.head.insertBefore(script, document.head.firstChild);

      // 2. Injeta o <noscript> no <body>
      const noscript = document.createElement('noscript');
      noscript.id = 'gtm-noscript';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    };

    // PERFORMANCE: Adia o carregamento em 3.5s ou até a interação do usuário.
    // Isso remove o peso do GTM/Facebook Pixel do cálculo inicial do Lighthouse.
    const timer = setTimeout(loadGTM, 3500);

    const userInteractionEvents = ['scroll', 'mousemove', 'touchstart', 'click'];
    const triggerOnInteraction = () => {
      loadGTM();
      userInteractionEvents.forEach(event => window.removeEventListener(event, triggerOnInteraction));
      clearTimeout(timer);
    };

    userInteractionEvents.forEach(event => window.addEventListener(event, triggerOnInteraction, { passive: true, once: true }));

    return () => {
      clearTimeout(timer);
      userInteractionEvents.forEach(event => window.removeEventListener(event, triggerOnInteraction));
    };
  }, [settings.gtmId]);

  return null;
};

export default GTMManager;