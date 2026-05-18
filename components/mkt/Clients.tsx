import React from 'react';
import { motion } from 'framer-motion';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const CLIENTS = [
  { name: 'Nexus Tech',      abbr: 'NX',  sector: 'Tecnologia'   },
  { name: 'Valore Group',    abbr: 'VG',  sector: 'Financeiro'   },
  { name: 'Branca Foods',    abbr: 'BF',  sector: 'Alimentício'  },
  { name: 'Meridian Capital',abbr: 'MC',  sector: 'Investimentos'},
  { name: 'Urban Studio',    abbr: 'US',  sector: 'Arquitetura'  },
  { name: 'Prisma Health',   abbr: 'PH',  sector: 'Saúde'        },
  { name: 'Forte Varejo',    abbr: 'FV',  sector: 'Varejo'       },
  { name: 'Atlas Soluções',  abbr: 'AS',  sector: 'Consultoria'  },
  { name: 'Lumina Moda',     abbr: 'LM',  sector: 'Fashion'      },
  { name: 'Bravo Indústria', abbr: 'BI',  sector: 'Indústria'    },
  { name: 'Coralis Digital', abbr: 'CD',  sector: 'Digital'      },
  { name: 'Tempo Imóveis',   abbr: 'TI',  sector: 'Imobiliário'  },
];

export default function Clients() {
  return (
    <section id="clientes" className="py-28 bg-[#1E232B] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            {...FADE_UP}
            className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Clientes
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Empresas que confiam{' '}
            <span className="text-[#C6F058]">no método</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Marcas de diversos segmentos que escolheram simplificar e escalar
            sua presença digital com a MKT&amp;Play.
          </motion.p>
        </div>

        {/* Logos grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {CLIENTS.map(({ name, abbr, sector }) => (
            <motion.div
              key={name}
              variants={{
                hidden:  { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="group relative bg-[#2A303C]/60 border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#C6F058]/30 hover:bg-[#2A303C] transition-all duration-300 cursor-default"
            >
              {/* Logo placeholder — monochrome, colorizes on hover */}
              <div className="w-12 h-12 rounded-lg bg-white/5 group-hover:bg-[#C6F058]/10 flex items-center justify-center transition-colors">
                <span className="text-white/30 group-hover:text-[#C6F058] font-extrabold text-sm tracking-tight transition-colors">
                  {abbr}
                </span>
              </div>
              <p className="text-white/30 group-hover:text-white/70 text-xs font-semibold text-center transition-colors leading-tight">
                {name}
              </p>
              <p className="text-white/15 group-hover:text-[#C6F058]/50 text-[10px] text-center transition-colors uppercase tracking-wide">
                {sector}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof bar */}
        <motion.div
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/5 pt-16"
        >
          {[
            { label: 'Segmentos atendidos',  value: '15+' },
            { label: 'Anos de mercado',       value: '7'   },
            { label: 'Projetos entregues',    value: '120+'},
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-extrabold text-white mb-1">{value}</p>
              <p className="text-[#6B7280] text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
