import React, { useState, Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import GTMManager from './components/GTMManager';
import SEOManager from './components/SEOManager'; // Novo componente de SEO
import { WhatsAppProvider } from './contexts/WhatsAppContext';
import { Loader2 } from 'lucide-react';
import { useContent } from './hooks/useContent';

// --- LAZY LOADING (Carregamento sob demanda) ---
const PromoBanners = lazy(() => import('./components/PromoBanners'));
const OffersCarousel = lazy(() => import('./components/OffersCarousel'));
const Values = lazy(() => import('./components/Values'));
const Manifesto = lazy(() => import('./components/Manifesto'));
const Products = lazy(() => import('./components/Products'));
const Contact = lazy(() => import('./components/Contact'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const BrandCarousel = lazy(() => import('./components/BrandCarousel'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const VisitUs = lazy(() => import('./components/VisitUs'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));
const WhatsAppLandingPage = lazy(() => import('./components/WhatsAppLandingPage'));

// Componente inteligente de Scroll
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const targetId = hash.replace('#', '');
    const attemptScroll = (attempts: number) => {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        if (attempts > 0) {
          setTimeout(() => attemptScroll(attempts - 1), 100);
        }
      }
    };
    attemptScroll(20);
  }, [pathname, hash, key]);

  return null;
};

// Loader visual simples
const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center bg-gray-50/50">
    <Loader2 className="w-8 h-8 text-[#24902C] animate-spin opacity-50" />
  </div>
);

// Layout padrão
const DefaultLayout = ({ children }: { children?: React.ReactNode }) => {
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  return (
    <>
       <Header />
       <main>
        {children}
       </main>
       
       <Suspense fallback={<div className="h-20 bg-[#264788]" />}>
          <Contact onOpenCookieSettings={() => setIsCookieSettingsOpen(true)} />
       </Suspense>
       
       <FloatingWhatsApp />
       <BackToTop />
       <CookieConsent 
          isOpenExternal={isCookieSettingsOpen}
          onCloseExternal={() => setIsCookieSettingsOpen(false)}
        />
    </>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <CategoryNav />
    
    <Suspense fallback={<SectionLoader />}>
      <Products />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <BrandCarousel />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <PromoBanners />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <OffersCarousel />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <Manifesto />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <Values />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <Testimonials />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <VisitUs />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <Newsletter />
    </Suspense>
  </>
);

function App() {
  return (
    <WhatsAppProvider>
      <GTMManager />
      <SEOManager /> {/* Gerencia Favicon e Imagem do WhatsApp dinamicamente */}
      
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-[#E5C808] selection:text-[#264788]">
          <Routes>
            {/* Páginas Especiais */}
            <Route 
              path="/whatsapp/meta" 
              element={
                <Suspense fallback={<SectionLoader />}>
                  <WhatsAppLandingPage source="meta_ads" title="Fale com a Agropecuária Brasil" />
                </Suspense>
              } 
            />
            <Route 
              path="/whatsapp/google" 
              element={
                <Suspense fallback={<SectionLoader />}>
                  <WhatsAppLandingPage source="google_ads" title="Fale com a Agropecuária Brasil" />
                </Suspense>
              } 
            />

            {/* Rotas Padrão */}
            <Route path="/" element={<DefaultLayout><HomePage /></DefaultLayout>} />
            <Route path="/politica-privacidade" element={
              <DefaultLayout>
                <Suspense fallback={<SectionLoader />}>
                  <PrivacyPolicyPage />
                  <Newsletter />
                </Suspense>
              </DefaultLayout>
            } />
          </Routes>
        </div>
      </Router>
    </WhatsAppProvider>
  );
}

export default App;