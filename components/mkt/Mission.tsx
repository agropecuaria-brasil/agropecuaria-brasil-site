import React from 'react';
import { motion } from 'framer-motion';
import { Award, Link2, BarChart2, Zap } from 'lucide-react';

const FADE_UP = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const VALUES = [
  {
    icon: Award,
    title: 'Curadoria Estratégica',
    body:  'Avaliamos e selecionamos as ferramentas e canais mais adequados para cada estágio do seu negócio, eliminando o desperdício de verba e tempo.',
  },
  {
    icon: Link2,
    title: 'Integração Sem Fricção',
    body:  'Conectamos todos os pontos do seu ecossistema digital para que trabalhem de forma coesa, maximizando a sinergia entre cada solução.',
  },
  {
    icon: BarChart2,
    title: 'Foco em Resultados',
    body:  'Métricas que importam. Relatórios claros e transparentes. Decisões baseadas em dados reais do seu negócio — não em achismos.',
  },
  {
    icon: Zap,
    title: 'Escalabilidade Controlada',
    body:  'Crescemos junto com você, ajustando a estratégia e as ferramentas conforme sua empresa evolui e novos objetivos surgem.',
  },
];

const CONTAINER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const ITEM = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Mission() {
  return (
    <section id="sobre" className="py-28 bg-[#2A303C] relative overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <motion.span
            {...FADE_UP}
            className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Nossa Missão
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Autoridade em curadoria de{' '}
            <span className="text-[#C6F058]">marketing digital</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Em um mercado saturado de ferramentas, plataformas e promessas, a MKT&amp;Play
            foi criada para ser a bússola das empresas que querem crescer com consistência.
            Somos especialistas em mapear o ecossistema digital e selecionar exatamente o que
            seu negócio precisa — sem desperdício de tempo, equipe ou verba.
          </motion.p>
        </div>

        {/* Value cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {VALUES.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={ITEM}
              className="group bg-[#1E232B] border border-white/5 rounded-2xl p-7 hover:border-[#C6F058]/25 hover:shadow-[0_0_40px_rgba(198,240,88,0.06)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#C6F058]/10 flex items-center justify-center mb-5 group-hover:bg-[#C6F058]/20 transition-colors">
                <Icon className="w-5 h-5 text-[#C6F058]" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-base mb-3">{title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed font-light">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote / differentiator */}
        <motion.blockquote
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.3 }}
          className="mt-20 border-l-4 border-[#C6F058] pl-8 max-w-2xl"
        >
          <p className="text-xl text-white font-semibold leading-relaxed italic">
            "Não vendemos ferramentas. Curatemos soluções. Existe uma diferença enorme entre
            instalar um software e integrar uma estratégia."
          </p>
          <footer className="mt-4 text-[#9CA3AF] text-sm font-medium not-italic">
            — Fundadores da MKT&amp;Play
          </footer>
        </motion.blockquote>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />
    </section>
  );
}
