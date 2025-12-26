import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageView } from '../types';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onNavigate?: (page: PageView) => void;
  isOpenExternal?: boolean; 
  onCloseExternal?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate, isOpenExternal, onCloseExternal }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Atualizei a chave para 'v4' para garantir novas preferências
  const STORAGE_KEY = 'agro_brasil_cookie_prefs_v4';
  
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let timer: ReturnType<typeof setTimeout>;

    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
        setShowBanner(false);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
        timer = setTimeout(() => setShowBanner(true), 2500); // Delay maior para não bloquear LCP
      }
    } else {
      timer = setTimeout(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setShowBanner(true);
        }
      }, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpenExternal) {
      setShowModal(true);
      setShowBanner(false);
    }
  }, [isOpenExternal]);

  const savePreferences = (newPrefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    
    setPreferences(newPrefs);
    setShowBanner(false);
    setShowModal(false);
    
    if (onCloseExternal) onCloseExternal();
  };

  const handleAcceptAll = () => {
    const allEnabled = { necessary: true, analytics: true, marketing: true };
    savePreferences(allEnabled);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    savePreferences(onlyNecessary);
  };

  const handleSaveSelection = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; 
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && !showModal && (
        <div className="fixed bottom-4 left-4 z-[60] max-w-md w-[calc(100%-32px)] md:w-auto animate-in slide-in-from-bottom-5 fade-in duration-700 font-sans">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-6 relative">
            <div className="flex items-start gap-4">
              <div className="bg-[#E9F5EC] p-3 rounded-full text-[#1e7a25] hidden sm:flex shrink-0">
                <Cookie size={24} />
              </div>
              
              <div className="flex-1">
                <h4 className="text-[#2C3E50] font-bold mb-2 text-base">
                  Sua privacidade importa
                </h4>
                {/* Contraste: Gray-600 para melhor leitura */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Utilizamos cookies para personalizar sua experiência. Ao navegar, você concorda com nossa{' '}
                  <Link to="/politica-privacidade" className="text-[#1e7a25] font-bold hover:underline">
                    Política de Privacidade
                  </Link>.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full bg-[#1e7a25] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#165c1b] transition-all shadow-md transform hover:-translate-y-0.5 min-h-[48px]"
                  >
                    <span className="pointer-events-none">Aceitar e Continuar</span>
                  </button>
                  
                  <div className="flex justify-center">
                    <button
                        onClick={() => setShowModal(true)}
                        // Acessibilidade: Contraste corrigido (text-gray-600) e underline mais visível
                        className="text-sm text-gray-700 font-semibold hover:text-black underline decoration-gray-400 underline-offset-4 transition-colors min-h-[48px] flex items-center px-4"
                      >
                        <span className="pointer-events-none">Gerenciar preferências</span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                 <Shield className="text-[#1e7a25]" size={24} />
                 <h3 className="text-xl font-bold text-[#2C3E50] font-['Montserrat']">Preferências de Cookies</h3>
              </div>
              <button 
                onClick={() => {
                   setShowModal(false);
                   if (!localStorage.getItem(STORAGE_KEY)) {
                     setShowBanner(true);
                   }
                   if (onCloseExternal) onCloseExternal();
                }}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label="Fechar configurações de cookies"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Aqui você pode escolher quais categorias de cookies deseja permitir.
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-gray-50 opacity-80">
                  <div className="pr-4">
                    <h5 className="font-bold text-[#2C3E50] text-sm mb-1 flex items-center gap-2">
                      Estritamente Necessários
                      <span className="text-[10px] bg-[#264788] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Obrigatório</span>
                    </h5>
                    <p className="text-xs text-gray-600">Essenciais para o funcionamento do site, segurança e login.</p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" checked disabled className="sr-only" aria-label="Cookies necessários (sempre ativo)" />
                    <div className="w-11 h-6 bg-[#1e7a25] rounded-full opacity-50 cursor-not-allowed"></div>
                    <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow translate-x-5"></div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:border-[#1e7a25] transition-colors">
                  <div className="pr-4">
                    <h5 className="font-bold text-[#2C3E50] text-sm mb-1">Cookies Analíticos</h5>
                    <p className="text-xs text-gray-600">Permitem analisar o tráfego e melhorar a performance do site.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      aria-label="Ativar cookies analíticos"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e7a25]"></div>
                  </label>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:border-[#1e7a25] transition-colors">
                  <div className="pr-4">
                    <h5 className="font-bold text-[#2C3E50] text-sm mb-1">Marketing e Publicidade</h5>
                    <p className="text-xs text-gray-600">Usados para exibir ofertas e anúncios relevantes ao seu perfil.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      aria-label="Ativar cookies de marketing"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e7a25]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDeclineAll}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors min-h-[48px]"
              >
                <span className="pointer-events-none">Recusar Opcionais</span>
              </button>
              <button
                onClick={handleSaveSelection}
                className="flex-1 bg-[#264788] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#1e3a70] transition-colors shadow-sm min-h-[48px]"
              >
                <span className="pointer-events-none">Salvar Escolhas</span>
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-[#1e7a25] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#165c1b] transition-colors shadow-sm flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span className="pointer-events-none flex items-center gap-2">
                  Aceitar Tudo
                  <Check size={18} />
                </span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;