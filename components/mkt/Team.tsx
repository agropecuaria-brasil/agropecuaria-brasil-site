import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const TEAM = [
  {
    initials: 'AB',
    name:     'Ana Beatriz Costa',
    role:     'CEO & Fundadora',
    bio:      '10+ anos de experiência em estratégia de marketing digital para empresas de médio e grande porte.',
    gradient: 'from-[#C6F058]/30 to-[#2A303C]',
  },
  {
    initials: 'RM',
    name:     'Rafael Mendes',
    role:     'Head de Estratégia',
    bio:      'Especialista em growth hacking e planejamento estratégico para marcas B2B e B2C em crescimento acelerado.',
    gradient: 'from-[#6ee7b7]/20 to-[#2A303C]',
  },
  {
    initials: 'CT',
    name:     'Camila Torres',
    role:     'Head de Performance',
    bio:      'Gestora de tráfego pago com histórico de ROI acima da média do mercado em campanhas de alta performance.',
    gradient: 'from-[#fbbf24]/20 to-[#2A303C]',
  },
  {
    initials: 'LF',
    name:     'Lucas Ferreira',
    role:     'Head de Criação',
    bio:      'Designer e diretor criativo com foco em identidade de marca e conteúdo orientado a conversão.',
    gradient: 'from-[#a78bfa]/20 to-[#2A303C]',
  },
];

export default function Team() {
  return (
    <section id="equipe" className="py-28 bg-[#2A303C] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            {...FADE_UP}
            className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Nossa Equipe
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            As pessoas por trás{' '}
            <span className="text-[#C6F058]">do método</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Uma equipe multidisciplinar de especialistas apaixonados por transformar
            marketing em resultado mensurável.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(({ initials, name, role, bio, gradient }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="group bg-[#1E232B] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C6F058]/25 hover:shadow-[0_0_40px_rgba(198,240,88,0.06)] transition-all duration-300"
            >
              {/* Avatar area */}
              <div className={`relative h-48 bg-gradient-to-b ${gradient} flex items-center justify-center`}>
                <div className="w-24 h-24 rounded-full bg-[#2A303C] border-2 border-[#C6F058]/30 flex items-center justify-center shadow-lg">
                  <span className="text-[#C6F058] font-extrabold text-2xl tracking-tight">
                    {initials}
                  </span>
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#C6F058] border-2 border-[#1E232B]" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-base mb-0.5">{name}</h3>
                <p className="text-[#C6F058] text-xs font-semibold tracking-wide uppercase mb-3">
                  {role}
                </p>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light">{bio}</p>

                {/* Social links */}
                <div className="flex gap-3 mt-5">
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#6B7280] hover:text-[#C6F058] hover:bg-[#C6F058]/10 transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#6B7280] hover:text-[#C6F058] hover:bg-[#C6F058]/10 transition-colors">
                    <Instagram className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />
    </section>
  );
}
