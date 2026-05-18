import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Award, TrendingUp } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const FOUNDERS = [
  {
    initials:  'FE',
    name:      'Fernando Elias',
    role:      'Co-Fundador · Branding & CRM',
    bio:       'Com mais de 20 anos de experiência, Fernando é referência em Comunicação, Marketing Digital e Relacionamento (CRM). Passou por agências como AlmapBBDO, Dentsu, Fbiz, Betc e Suno, além do Grupo Pão de Açúcar.',
    highlight: '6 troféus ABEMD',
    gradient:  'from-[#C6F058]/25 to-[#2A303C]',
    brands:    ['Volkswagen', 'Fiat', 'Sony', 'Ambev', 'Santander', 'AccorHotels', 'Seara', 'GPA'],
    stats:     [
      { value: '20+',  label: 'anos de mercado' },
      { value: '6',    label: 'troféus ABEMD' },
    ],
  },
  {
    initials:  'DL',
    name:      'Darcio Lemos',
    role:      'Co-Fundador · Data & Performance',
    bio:       'Entusiasta de dados, machine learning e inteligência artificial. Em 10 anos na Tecnisa, gerou 650 mil leads e ajudou mais de 8.000 pessoas a fecharem negócio — com 83% da receita vindo de vendas online.',
    highlight: '650k leads gerados',
    gradient:  'from-blue-500/20 to-[#2A303C]',
    brands:    ['Tecnisa', 'Moneyball', '34 soluções integradas', 'Marketing Stack'],
    stats:     [
      { value: '650k', label: 'leads gerados' },
      { value: '8k+',  label: 'negócios fechados' },
    ],
  },
];

export default function Team() {
  return (
    <section id="equipe" className="py-28 bg-[#1E232B] relative">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,240,88,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(198,240,88,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span {...FADE_UP} className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4">
            Os Fundadores
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Experiência de grandes marcas,{' '}
            <span className="text-[#C6F058]">agora para o seu negócio</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Os fundadores da MKT&amp;Play acumularam décadas de experiência em algumas das
            maiores marcas do Brasil — e hoje colocam esse conhecimento a serviço das PMEs.
          </motion.p>
        </div>

        {/* Founder cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FOUNDERS.map(({ initials, name, role, bio, highlight, gradient, brands, stats }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
              className="group bg-[#2A303C] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C6F058]/25 hover:shadow-[0_0_50px_rgba(198,240,88,0.06)] transition-all duration-300"
            >
              {/* Top area */}
              <div className={`relative h-36 bg-gradient-to-b ${gradient} flex items-end px-8 pb-0`}>
                <div className="relative -mb-8 w-20 h-20 rounded-2xl bg-[#1E232B] border-2 border-[#C6F058]/30 flex items-center justify-center shadow-xl">
                  <span className="text-[#C6F058] font-extrabold text-xl tracking-tight">{initials}</span>
                </div>
                {/* Highlight badge */}
                <div className="absolute top-5 right-6 flex items-center gap-1.5 bg-[#1E232B]/80 border border-[#C6F058]/20 rounded-full px-3 py-1">
                  <Award className="w-3 h-3 text-[#C6F058]" />
                  <span className="text-[#C6F058] text-[11px] font-semibold">{highlight}</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 pt-12 pb-8">
                <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
                <p className="text-[#C6F058] text-xs font-semibold tracking-wide uppercase mb-4">{role}</p>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light mb-6">{bio}</p>

                {/* Mini stats */}
                <div className="flex gap-6 mb-6 pb-6 border-b border-white/5">
                  {stats.map(s => (
                    <div key={s.label}>
                      <p className="text-white font-extrabold text-xl">{s.value}</p>
                      <p className="text-[#6B7280] text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Brands / experience tags */}
                <div>
                  <p className="text-[#4B5563] text-xs uppercase tracking-widest font-semibold mb-3">Experiência com</p>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <span
                        key={brand}
                        className="text-xs text-[#9CA3AF] bg-white/5 border border-white/5 rounded-full px-2.5 py-1"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn */}
                <button className="mt-6 flex items-center gap-2 text-[#6B7280] hover:text-[#C6F058] transition-colors text-sm">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credibility strip */}
        <motion.div
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-4 text-center"
        >
          {[
            { icon: Award,      text: '6 Troféus ABEMD'             },
            { icon: TrendingUp, text: '83% receita via vendas online'},
            { icon: Award,      text: '20+ anos de mercado'          },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-[#2A303C] border border-white/5 rounded-full px-5 py-2.5"
            >
              <Icon className="w-3.5 h-3.5 text-[#C6F058]" />
              <span className="text-[#9CA3AF] text-sm">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
