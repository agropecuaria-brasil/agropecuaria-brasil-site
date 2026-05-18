import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, GitMerge, TrendingUp } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const STEPS = [
  {
    phase: '01',
    icon:  Search,
    title: 'Diagnóstico',
    body:  'Mapeamos profundamente seu negócio, concorrentes, público e ecossistema atual para identificar as oportunidades reais de crescimento e os gargalos que travam seus resultados.',
    tags:  ['Análise de mercado', 'Benchmark', 'Auditoria digital'],
  },
  {
    phase: '02',
    icon:  Layers,
    title: 'Curadoria',
    body:  'Com base no diagnóstico, selecionamos as ferramentas, canais e fornecedores ideais para a sua realidade — descartamos o que não faz sentido e recomendamos o que gera valor real.',
    tags:  ['Seleção de ferramentas', 'Estratégia de canais', 'Mix de mídia'],
  },
  {
    phase: '03',
    icon:  GitMerge,
    title: 'Integração',
    body:  'Implementamos e conectamos tudo de forma operacional, garantindo que cada peça do seu marketing trabalhe em sinergia. Sem silos, sem dados perdidos, sem conflito de mensagens.',
    tags:  ['Setup técnico', 'Automações', 'Fluxos integrados'],
  },
  {
    phase: '04',
    icon:  TrendingUp,
    title: 'Aceleração',
    body:  'Gerenciamos, otimizamos e escalamos continuamente, com relatórios transparentes e ajustes estratégicos constantes. Crescimento previsível, não sorte.',
    tags:  ['Gestão contínua', 'Otimização de ROI', 'Relatórios claros'],
  },
];

export default function Methodology() {
  return (
    <section id="metodo" className="py-28 bg-[#1E232B] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,240,88,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(198,240,88,0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            {...FADE_UP}
            className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Nossa Abordagem
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            O Método{' '}
            <span className="text-[#C6F058]">Plug and Play</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Uma metodologia proprietária que transforma a complexidade do marketing digital
            em crescimento previsível — da estratégia à operacionalização.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Connector line (desktop) */}
          <div className="absolute top-14 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-[#C6F058]/20 via-[#C6F058]/40 to-[#C6F058]/20 hidden lg:block pointer-events-none" />

          {STEPS.map(({ phase, icon: Icon, title, body, tags }, i) => (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className="group relative bg-[#2A303C] border border-white/5 rounded-2xl p-7 hover:border-[#C6F058]/30 hover:shadow-[0_0_40px_rgba(198,240,88,0.06)] transition-all duration-300 flex flex-col"
            >
              {/* Phase badge + icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 rounded-xl bg-[#C6F058]/10 flex items-center justify-center group-hover:bg-[#C6F058]/20 transition-colors flex-shrink-0 z-10">
                  <Icon className="w-5 h-5 text-[#C6F058]" strokeWidth={1.8} />
                </div>
                <span className="text-[#C6F058]/40 font-extrabold text-2xl tabular-nums">{phase}</span>
              </div>

              <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed font-light flex-1">{body}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-[#C6F058]/70 bg-[#C6F058]/8 border border-[#C6F058]/15 rounded-full px-2.5 py-1 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-[#6B7280] text-sm mb-5">
            Pronto para aplicar o método no seu negócio?
          </p>
          <button
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#C6F058] text-[#1E232B] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#d4f472] active:scale-95 transition-all shadow-[0_0_30px_rgba(198,240,88,0.2)]"
          >
            Quero Simplificar Meu Marketing
          </button>
        </motion.div>
      </div>
    </section>
  );
}
