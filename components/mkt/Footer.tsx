import React from 'react';
import { Zap, Linkedin, Instagram, Twitter } from 'lucide-react';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const NAV = [
  { label: 'Início',   id: 'inicio'   },
  { label: 'Sobre',    id: 'sobre'    },
  { label: 'Método',   id: 'metodo'   },
  { label: 'Equipe',   id: 'equipe'   },
  { label: 'Clientes', id: 'clientes' },
  { label: 'Contato',  id: 'contato'  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E232B] border-t border-white/5">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <button
            onClick={() => scrollTo('inicio')}
            className="flex items-center gap-2.5 mb-4 group"
          >
            <div className="w-8 h-8 bg-[#C6F058] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Zap className="w-4 h-4 text-[#1E232B]" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              MKT<span className="text-[#C6F058]">&</span>PLAY
            </span>
          </button>
          <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs font-light">
            Curando as melhores soluções de marketing digital para o seu negócio
            crescer com consistência e previsibilidade.
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-6">
            {[
              { icon: Linkedin,  label: 'LinkedIn'  },
              { icon: Instagram, label: 'Instagram' },
              { icon: Twitter,   label: 'Twitter'   },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#6B7280] hover:text-[#C6F058] hover:bg-[#C6F058]/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
            Navegação
          </h4>
          <ul className="space-y-3">
            {NAV.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="text-[#6B7280] hover:text-[#C6F058] text-sm transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
            Fale Conosco
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="text-[#4B5563] block text-xs mb-0.5">E-mail</span>
              <span className="text-[#9CA3AF]">contato@mktplay.com.br</span>
            </li>
            <li>
              <span className="text-[#4B5563] block text-xs mb-0.5">WhatsApp</span>
              <span className="text-[#9CA3AF]">+55 (11) 99999-0000</span>
            </li>
            <li>
              <span className="text-[#4B5563] block text-xs mb-0.5">Instagram</span>
              <span className="text-[#9CA3AF]">@mktplay.agencia</span>
            </li>
          </ul>

          <div className="mt-8 p-4 bg-[#2A303C] rounded-xl border border-white/5">
            <p className="text-[#9CA3AF] text-xs leading-relaxed">
              <span className="text-[#C6F058] font-semibold">Primeira conversa gratuita.</span>
              {' '}30 minutos para mapearmos as oportunidades do seu negócio.
            </p>
            <button
              onClick={() => scrollTo('contato')}
              className="mt-3 text-[#C6F058] text-xs font-bold hover:underline"
            >
              Agendar agora →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#4B5563] text-xs">
          © {new Date().getFullYear()} MKT&amp;Play. Todos os direitos reservados.
        </p>
        <div className="flex gap-5">
          <button className="text-[#4B5563] hover:text-[#9CA3AF] text-xs transition-colors">
            Política de Privacidade
          </button>
          <button className="text-[#4B5563] hover:text-[#9CA3AF] text-xs transition-colors">
            Termos de Uso
          </button>
        </div>
      </div>
    </footer>
  );
}
