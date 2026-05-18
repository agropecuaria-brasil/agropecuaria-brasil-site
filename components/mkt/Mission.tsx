import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const NAO_SOMOS = [
  'Uma agência de publicidade tradicional com estruturas pesadas e contratos longos',
  'Uma solução para grandes empresas ou multinacionais',
  'Vendedores de campanhas isoladas sem continuidade estratégica',
  'Freelancers sem metodologia e estrutura profissional',
];

const SOMOS = [
  'Marketing as a Service (MaaS) com frações altamente especializadas',
  'A opção acessível e profissional para PMEs que querem crescer',
  'Uma equipe com 20+ anos de experiência em grandes marcas — agora a serviço do seu negócio',
  'Consistência e método, todo dia, com resultado mensurável',
];

export default function Mission() {
  return (
    <section id="sobre" className="py-28 bg-[#2A303C] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.span {...FADE_UP} className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4">
            O que acreditamos
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Agências de publicidade são para{' '}
            <span className="text-[#C6F058]">grandes negócios.</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            São muito caras para médias e, especialmente, pequenas empresas. O resultado?
            O empreendedor acaba fazendo a gestão de marketing sozinho — sem o conhecimento
            especializado que o negócio precisa para crescer de verdade.
          </motion.p>
        </div>

        {/* Fatia de bolo analogy */}
        <motion.div
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.15 }}
          className="bg-[#1E232B] border border-[#C6F058]/20 rounded-2xl p-8 md:p-10 mb-16 max-w-3xl"
        >
          <div className="flex gap-4 items-start">
            <div className="text-4xl flex-shrink-0">🍰</div>
            <div>
              <h3 className="text-white font-bold text-xl mb-3">
                Pense numa fatia de bolo.
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">
                Ao invés de comprar o bolo inteiro, você pode comprar apenas uma fatia.
                Mas a fatia tem toda a qualidade e experiência de anos de mercado —
                e te ajuda a tomar decisões melhores. É exatamente isso que a MKT&amp;Play oferece:
                frações altamente especializadas de marketing, chamadas de{' '}
                <span className="text-[#C6F058] font-semibold">Packs</span>,
                que você contrata conforme a necessidade do seu negócio.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Não somos / Somos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="bg-[#1E232B] border border-white/5 rounded-2xl p-8"
          >
            <h3 className="text-[#6B7280] font-bold text-sm uppercase tracking-widest mb-6">
              O que a MKT&amp;Play NÃO é
            </h3>
            <ul className="space-y-4">
              {NAO_SOMOS.map(item => (
                <li key={item} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" strokeWidth={2.5} />
                  </div>
                  <span className="text-[#6B7280] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.3 }}
            className="bg-[#1E232B] border border-[#C6F058]/15 rounded-2xl p-8"
          >
            <h3 className="text-[#C6F058] font-bold text-sm uppercase tracking-widest mb-6">
              O que a MKT&amp;Play É
            </h3>
            <ul className="space-y-4">
              {SOMOS.map(item => (
                <li key={item} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#C6F058]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#C6F058]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[#F3F4F6] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.35 }}
          className="mt-16 border-l-4 border-[#C6F058] pl-8 max-w-2xl"
        >
          <p className="text-xl text-white font-semibold leading-relaxed italic">
            "Ninguém entende do seu negócio melhor do que você. Por isso você precisa
            focar nele. Deixe que o marketing a gente cuida — de forma terceirizada,
            com horas altamente especializadas, por um valor que você consegue pagar."
          </p>
          <footer className="mt-4 text-[#9CA3AF] text-sm font-medium not-italic">
            — Fernando Elias &amp; Darcio Lemos, Fundadores da MKT&amp;Play
          </footer>
        </motion.blockquote>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />
    </section>
  );
}
