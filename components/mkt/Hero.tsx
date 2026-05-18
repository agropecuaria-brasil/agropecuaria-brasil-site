import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1E232B]"
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,240,88,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(198,240,88,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none bg-[#C6F058] blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-5 pointer-events-none bg-[#C6F058] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-4xl">

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#2A303C] border border-[#C6F058]/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6F058] animate-pulse-lime inline-block" />
            <span className="text-[#C6F058] text-xs font-semibold tracking-widest uppercase">
              Agência de Marketing Digital
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
          >
            Somos{' '}
            <span className="text-[#C6F058]">consultores-</span>
            <br className="hidden sm:block" />
            <span className="text-[#C6F058]">curadores</span>{' '}
            de soluções de
            <br className="hidden lg:block" />
            {' '}Marketing Digital.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-2xl font-light text-[#C6F058] mb-6 tracking-wide"
          >
            Com o método{' '}
            <span className="font-bold">Plug and Play</span>.
          </motion.p>

          {/* Support text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl mb-10 font-light"
          >
            Chega de tentar gerenciar dezenas de ferramentas, agências e canais ao mesmo tempo.
            A MKT&amp;Play atua como sua parceira estratégica — curando as melhores soluções e
            integrando tudo de forma simples, eficiente e com foco em resultado real.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollTo('metodo')}
              className="group inline-flex items-center justify-center gap-2 bg-[#C6F058] text-[#1E232B] px-7 py-4 rounded-xl font-bold text-base hover:bg-[#d4f472] active:scale-95 transition-all shadow-[0_0_30px_rgba(198,240,88,0.2)]"
            >
              Conheça o Método
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('contato')}
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-4 rounded-xl font-semibold text-base hover:border-[#C6F058]/50 hover:text-[#C6F058] transition-all"
            >
              <Play className="w-4 h-4" />
              Fale Conosco
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6"
          >
            {[
              { value: '120+', label: 'Projetos entregues' },
              { value: '98%',  label: 'Satisfação dos clientes' },
              { value: '8x',   label: 'ROI médio alcançado' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1E232B] to-transparent pointer-events-none" />
    </section>
  );
}
