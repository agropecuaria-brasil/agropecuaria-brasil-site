import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Repeat2, BarChart2, Target } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const PILLARS = [
  {
    icon:  Sprout,
    title: 'Pequenas ações',
    body:  'Marketing de alto impacto não exige grandes explosões. Exige consistência. Executamos pequenas ações com excelência todos os dias.',
  },
  {
    icon:  Repeat2,
    title: 'Feitas todo dia',
    body:  'Marketing digital é como um ser vivo: não basta criar, é preciso alimentar diariamente. A consistência é o que gera resultados sustentáveis.',
  },
  {
    icon:  Target,
    title: 'Com excelência',
    body:  'Cada ação é pensada estrategicamente. Não fazemos por fazer — fazemos bem-feito, com método e propósito claro para o seu negócio.',
  },
  {
    icon:  BarChart2,
    title: 'Gerando resultado',
    body:  'O acúmulo de pequenas ações feitas com excelência resulta em crescimento real, mensurável e sustentável ao longo do tempo.',
  },
];

export default function Methodology() {
  return (
    <section id="metodo" className="py-28 bg-[#2A303C] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <motion.span {...FADE_UP} className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4">
              Nosso Método
            </motion.span>

            <motion.div
              {...FADE_UP}
              transition={{ ...FADE_UP.transition, delay: 0.1 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 bg-[#1E232B] border border-[#C6F058]/20 rounded-2xl px-6 py-4 mb-6">
                <span className="text-[#C6F058] font-extrabold text-4xl tracking-tight">PPC</span>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-white font-bold text-sm">Porção de</p>
                  <p className="text-white font-bold text-sm">Pequenas Coisas</p>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Pequenas ações feitas{' '}
                <span className="text-[#C6F058]">bem-feitas,</span>
                <br />
                todos os dias.
              </h2>
            </motion.div>

            <motion.p
              {...FADE_UP}
              transition={{ ...FADE_UP.transition, delay: 0.2 }}
              className="text-[#9CA3AF] text-lg leading-relaxed font-light"
            >
              Marketing digital é como um ser vivo — não basta apenas criá-lo, é preciso
              alimentá-lo diariamente. O método PPC consiste em executar pequenas ações
              de marketing com excelência, de forma consistente e diária, gerando
              resultados sustentáveis ao longo do tempo.
            </motion.p>
          </div>

          {/* Visual PPC ring */}
          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.25 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#C6F058]/15 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-[#C6F058]/10" />

              {/* Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <span className="text-[#C6F058] font-extrabold text-5xl tracking-tight leading-none">PPC</span>
                <span className="text-white/40 text-xs mt-2 uppercase tracking-widest font-medium">Método Proprietário</span>
              </div>

              {/* Orbiting labels */}
              {['WEB', 'CRM', 'MARCA', 'ADS', 'SOCIAL', 'WTSAP'].map((label, i) => {
                const angle = (i / 6) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 110;
                const x = 144 + r * Math.cos(rad);
                const y = 144 + r * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{ left: x, top: y }}
                  >
                    <div className="bg-[#1E232B] border border-[#C6F058]/20 rounded-lg px-2 py-1">
                      <span className="text-[#C6F058] text-[10px] font-bold tracking-wider">{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="group bg-[#1E232B] border border-white/5 rounded-2xl p-7 hover:border-[#C6F058]/25 hover:shadow-[0_0_40px_rgba(198,240,88,0.06)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#C6F058]/10 flex items-center justify-center mb-5 group-hover:bg-[#C6F058]/20 transition-colors">
                <Icon className="w-5 h-5 text-[#C6F058]" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-base mb-3">{title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed font-light">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />
    </section>
  );
}
