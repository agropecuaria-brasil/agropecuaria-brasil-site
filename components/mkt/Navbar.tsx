import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Início',   id: 'inicio' },
  { label: 'Sobre',    id: 'sobre' },
  { label: 'Método',   id: 'metodo' },
  { label: 'Equipe',   id: 'equipe' },
  { label: 'Clientes', id: 'clientes' },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1E232B]/95 backdrop-blur-md shadow-[0_1px_0_rgba(198,240,88,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => handleNav('inicio')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 bg-[#C6F058] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Zap className="w-4.5 h-4.5 text-[#1E232B]" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight leading-none">
            MKT<span className="text-[#C6F058]">&</span>PLAY
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-[#9CA3AF] hover:text-[#C6F058] transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contato')}
            className="bg-[#C6F058] text-[#1E232B] px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#d4f472] active:scale-95 transition-all"
          >
            Fale Conosco
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#1E232B] border-t border-white/5 px-6 pt-4 pb-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-[#9CA3AF] hover:text-[#C6F058] transition-colors text-sm font-medium text-left py-1"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contato')}
              className="mt-2 bg-[#C6F058] text-[#1E232B] px-5 py-3 rounded-lg font-semibold text-sm w-full"
            >
              Fale Conosco
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
