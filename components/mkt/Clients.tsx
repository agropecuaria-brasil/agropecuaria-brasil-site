import React from 'react';
import { motion } from 'framer-motion';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

// Marcas reais dos históricos dos fundadores
const BRANDS = [
  { name: 'Volkswagen',   abbr: 'VW',  sector: 'Automotivo'  },
  { name: 'Fiat',         abbr: 'FT',  sector: 'Automotivo'  },
  { name: 'Sony',         abbr: 'SN',  sector: 'Tecnologia'  },
  { name: 'Pão de Açúcar',abbr: 'GPA', sector: 'Varejo'      },
  { name: 'Ambev',        abbr: 'AB',  sector: 'Bebidas'      },
  { name: 'Banco Santander',abbr:'SAN', sector: 'Financeiro' },
  { name: 'AccorHotels',  abbr: 'AC',  sector: 'Hotelaria'   },
  { name: 'Seara',        abbr: 'SR',  sector: 'Alimentos'   },
  { name: 'China in Box', abbr: 'CB',  sector: 'Food Service'},
  { name: 'Tecnisa',      abbr: 'TC',  sector: 'Construção'  },
  { name: 'Brastemp',     abbr: 'BP',  sector: 'Eletros'     },
  { name: 'Extra',        abbr: 'EX',  sector: 'Varejo'      },
];

const DORES_PME = [
  'Custo proibitivo de agências tradicionais',
  'Falta de tempo para gerir o marketing',
  'Desperdício de verba sem estratégia',
  'Marketing inconsistente e sem resultado',
  'Dificuldade em medir o ROI',
  'Falta de expertise especializada',
];

export default function Clients() {
  return (
    <section id="clientes" className="py-28 bg-[#2A303C] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <motion.span {...FADE_UP} className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4">
            Credenciais
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            Expertise construída em{' '}
            <span className="text-[#C6F058]">grandes marcas</span>
          </motion.h2>
        </div>

        <motion.p
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.2 }}
          className="text-[#9CA3AF] text-lg leading-relaxed font-light text-center max-w-2xl mx-auto mb-16"
        >
          A inteligência de marketing construída em duas décadas junto às maiores marcas
          do Brasil — agora democratizada para PMEs que querem crescer com consistência.
        </motion.p>

        {/* Brand logos */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {BRANDS.map(({ name, abbr, sector }) => (
            <motion.div
              key={name}
              variants={{
                hidden:  { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="group bg-[#1E232B]/60 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 hover:border-[#C6F058]/30 hover:bg-[#1E232B] transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-[#C6F058]/10 flex items-center justify-center transition-colors">
                <span className="text-white/25 group-hover:text-[#C6F058] font-extrabold text-xs tracking-tight transition-colors">
                  {abbr}
                </span>
              </div>
              <p className="text-white/25 group-hover:text-white/60 text-[11px] font-semibold text-center transition-colors leading-tight">
                {name}
              </p>
              <p className="text-white/10 group-hover:text-[#C6F058]/40 text-[9px] uppercase tracking-wide transition-colors">
                {sector}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* PME pain points — why we built this */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div {...FADE_UP} transition={{ ...FADE_UP.transition, delay: 0.2 }}>
            <span className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4">
              Por que a MKT&amp;Play existe
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              As dores que resolvemos todo dia
            </h3>
            <p className="text-[#9CA3AF] text-base leading-relaxed font-light">
              Toda essa experiência em grandes marcas revelou uma verdade incômoda:
              as PMEs têm as mesmas necessidades de marketing, mas sem o acesso às mesmas
              ferramentas, metodologias e profissionais. Criamos a MKT&amp;Play para mudar isso.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {DORES_PME.map(dor => (
              <motion.div
                key={dor}
                variants={{
                  hidden:  { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="flex items-start gap-3 bg-[#1E232B] border border-white/5 rounded-xl p-4"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C6F058] flex-shrink-0 mt-1.5" />
                <span className="text-[#9CA3AF] text-sm leading-relaxed">{dor}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />
    </section>
  );
}
