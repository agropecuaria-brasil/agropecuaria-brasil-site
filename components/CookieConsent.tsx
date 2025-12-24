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
  
  // Atualizei a chave para 'v3' para forçar o banner a aparecer novamente para você
  const STORAGE_KEY = 'agro_brasil_cookie_prefs_v3';
  
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
        timer = setTimeout(() => setShowBanner(true), 1500);
      }
    } else {
      timer = setTimeout(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setShowBanner(true);
        }
      }, 1500);
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
              <div className="bg-[#E9F5EC] p-3 rounded-full text-[#24902C] hidden sm:flex shrink-0">
                <Cookie size={24} />
              </div>
              
              <div className="flex-1">
                <h4 className="text-[#2C3E50] font-bold mb-2 text-base">
                  Sua privacidade importa
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Utilizamos cookies para personalizar sua experiência. Ao navegar, você concorda com nossa{' '}
                  <Link to="/politica-privacidade" className="text-[#24902C] font-semibold hover:underline">
                    Política de Privacidade
                  </Link>.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full bg-[#24902C] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#1e7a25] transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <span className="pointer-events-none">Aceitar e Continuar</span>
                  </button>
                  
                  <div className="flex justify-center">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-gray-400 font-medium hover:text-gray-600 underline decoration-gray-300 underline-offset-2 transition-colors"
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
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                 <Shield className="text-[#24902C]" size={24} />
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
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Fechar configurações"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Aqui você pode escolher quais categorias de cookies deseja permitir.
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-gray-50 opacity-80">
                  <div className="pr-4">
                    <h5 className="font-bold text-[#2C3E50] text-sm mb-1 flex items-center gap-2">
                      Estritamente Necessários
                      <span className="text-[10px] bg-[#264788] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Obrigatório</span>
                    </h5>
                    <p className="text-xs text-gray-500">Essenciais para o funcionamento do site, segurança e login.</p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" checked disabled className="sr-only" />
                    <div className="w-11 h-6 bg-[#24902C] rounded-full opacity-50 cursor-not-allowed"></div>
                    <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow translate-x-5"></div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:border-[#24902C] transition-colors">
                  <div className="pr-4">
                    <h5 className="font-bold text-[#2C3E50] text-sm mb-1">Cookies Analíticos</h5>
                    <p className="text-xs text-gray-500">Permitem analisar o tráfego e melhorar a performance do site.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#24902C]"></div>
                  </label>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:border-[#24902C] transition-colors">
                  <div className="pr-4">
                    <h5 className="font-bold text-[#2C3E50] text-sm mb-1">Marketing e Publicidade</h5>
                    <p className="text-xs text-gray-500">Usados para exibir ofertas e anúncios relevantes ao seu perfil.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#24902C]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDeclineAll}
                className="flex-1 bg-gray-100 text-gray-600 px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                <span className="pointer-events-none">Recusar Opcionais</span>
              </button>
              <button
                onClick={handleSaveSelection}
                className="flex-1 bg-[#264788] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#1e3a70] transition-colors shadow-sm"
              >
                <span className="pointer-events-none">Salvar Escolhas</span>
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-[#24902C] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#1e7a25] transition-colors shadow-sm flex items-center justify-center gap-2"
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