import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Share2, Users, MessageCircle } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const PACKS = [
  {
    icon:  Palette,
    name:  'Construção de Marcas',
    tag:   'Branding',
    body:  'Posicionamento, identidade visual e percepção de marca. Sua empresa transmitindo confiança e diferenciação no mercado.',
    items: ['Posicionamento estratégico', 'Identidade visual', 'Tom de voz e narrativa', 'Brand guidelines'],
    color: 'from-purple-500/20 to-transparent',
    accent: 'text-purple-400',
    border: 'border-purple-500/20 hover:border-purple-500/40',
  },
  {
    icon:  Globe,
    name:  'Presença Digital',
    tag:   'Google · Tráfego · Site',
    body:  'Apareça onde seus clientes estão buscando. Google Ads, SEO, criação e otimização de site para converter visitantes em clientes.',
    items: ['Google Ads (Search & Display)', 'Criação e otimização de site', 'SEO e presença orgânica', 'Landing pages de alta conversão'],
    color: 'from-blue-500/20 to-transparent',
    accent: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-500/40',
  },
  {
    icon:  Share2,
    name:  'Redes Sociais',
    tag:   'Instagram · Meta · LinkedIn',
    body:  'Presença consistente e estratégica nas redes sociais com conteúdo que gera conexão, alcance e vendas.',
    items: ['Gestão de Instagram e Facebook', 'Meta Ads (tráfego pago)', 'LinkedIn para B2B', 'Conteúdo e criação'],
    color: 'from-pink-500/20 to-transparent',
    accent: 'text-pink-400',
    border: 'border-pink-500/20 hover:border-pink-500/40',
  },
  {
    icon:  Users,
    name:  'CRM',
    tag:   'Relacionamento · Fidelidade',
    body:  'Relacionamento inteligente com sua base de clientes. Fidelização, reativação e aumento do ticket médio por relacionamento.',
    items: ['Estratégia de relacionamento', 'Segmentação e réguas de contato', 'Programas de fidelidade', 'Análise de base de clientes'],
    color: 'from-[#C6F058]/15 to-transparent',
    accent: 'text-[#C6F058]',
    border: 'border-[#C6F058]/20 hover:border-[#C6F058]/40',
  },
  {
    icon:  MessageCircle,
    name:  'Automação de WhatsApp',
    tag:   'Comunicação Escalável',
    body:  'Nunca mais perca uma oportunidade de venda por falta de agilidade. Comunicação personalizada e em escala pelo WhatsApp.',
    items: ['Chatbot e automações', 'Campanhas de WhatsApp', 'Atendimento inteligente', 'Integração com CRM'],
    color: 'from-green-500/20 to-transparent',
    accent: 'text-green-400',
    border: 'border-green-500/20 hover:border-green-500/40',
  },
];

export default function Packs() {
  return (
    <section id="packs" className="py-28 bg-[#1E232B] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,240,88,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(198,240,88,0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span {...FADE_UP} className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4">
            Nossos Packs
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Contrate apenas o que{' '}
            <span className="text-[#C6F058]">seu negócio precisa</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Cada Pack é uma fração especializada de marketing. Você pode começar com 1 Pack
            e combinar conforme cresce — simples como apertar um botão.
          </motion.p>
        </div>

        {/* Packs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKS.map(({ icon: Icon, name, tag, body, items, color, accent, border }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className={`group bg-[#2A303C] border ${border} rounded-2xl overflow-hidden transition-all duration-300 flex flex-col`}
            >
              {/* Color top strip */}
              <div className={`h-1 bg-gradient-to-r ${color.replace('to-transparent', 'to-[#2A303C]')} opacity-80`} />

              <div className="p-7 flex flex-col flex-1">
                <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors`}>
                  <Icon className={`w-5 h-5 ${accent}`} strokeWidth={1.8} />
                </div>

                <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${accent}`}>{tag}</p>
                <h3 className="text-white font-bold text-lg mb-3">{name}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light mb-5">{body}</p>

                <ul className="mt-auto space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${accent.replace('text-', 'bg-')}`} />
                      <span className="text-[#9CA3AF] text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="bg-[#C6F058]/5 border border-[#C6F058]/20 rounded-2xl p-7 flex flex-col items-center justify-center text-center gap-4 hover:bg-[#C6F058]/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[#C6F058]/15 flex items-center justify-center">
              <span className="text-[#C6F058] font-extrabold text-xl">+</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2">Não sabe por onde começar?</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Fazemos um diagnóstico gratuito e recomendamos o Pack ideal para o seu momento.
              </p>
            </div>
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 bg-[#C6F058] text-[#1E232B] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#d4f472] active:scale-95 transition-all"
            >
              Quero um diagnóstico
            </button>
          </motion.div>
        </div>

        {/* Plug and Play callout */}
        <motion.div
          {...FADE_UP}
          transition={{ ...FADE_UP.transition, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[#6B7280] text-sm">
            A contratação é{' '}
            <span className="text-[#C6F058] font-semibold">Plug and Play</span>
            {' '}— simples, ágil e sem burocracia. Combinamos os Packs certos para você
            e ativamos como apertar um botão.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
