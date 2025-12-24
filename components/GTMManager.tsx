import React, { useEffect } from 'react';
import { useContent } from '../hooks/useContent';

const GTMManager: React.FC = () => {
  const { settings } = useContent();

  useEffect(() => {
    // Não faz nada se ainda estiver carregando, se não tiver ID, ou se for o ID placeholder
    if (!settings.gtmId || settings.gtmId === 'GTM-XXXXXX') return;

    const gtmId = settings.gtmId;

    // 1. Injeta o Script no <head>
    if (!document.getElementById('gtm-script')) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`;
      document.head.insertBefore(script, document.head.firstChild);
    }

    // 2. Injeta o <noscript> no <body> (Logo após a abertura da tag body)
    if (!document.getElementById('gtm-noscript')) {
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
    }
  }, [settings.gtmId]);

  return null;
};

export default GTMManager;