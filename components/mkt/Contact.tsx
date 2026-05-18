import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const PACKS_OPTIONS = [
  'Não sei ainda — quero um diagnóstico',
  'Construção de Marcas (Branding)',
  'Presença Digital (Google / Site)',
  'Redes Sociais (Instagram / Meta)',
  'CRM – Relacionamento e Fidelidade',
  'Automação de WhatsApp',
];

interface FormState {
  name:    string;
  email:   string;
  phone:   string;
  company: string;
  pack:    string;
  message: string;
}

export default function Contact() {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', phone: '', company: '', pack: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const inputCls =
    'w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-[#4B5563] text-sm focus:outline-none focus:border-[#C6F058]/50 focus:ring-1 focus:ring-[#C6F058]/20 transition-all';

  return (
    <section id="contato" className="py-28 bg-[#1E232B] relative">
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
            Diagnóstico Gratuito
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            30 minutos para mapear as{' '}
            <span className="text-[#C6F058]">oportunidades do seu negócio</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Sem compromisso. Nossa primeira conversa é para entender o seu negócio e
            recomendar o Pack ideal para o seu momento.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.15 }}
            className="bg-[#2A303C] border border-white/5 rounded-2xl p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#C6F058]/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#C6F058]" />
                </div>
                <h3 className="text-white font-bold text-xl">Mensagem enviada!</h3>
                <p className="text-[#9CA3AF] text-sm max-w-xs">
                  Nossa equipe entrará em contato em até 24 horas úteis. Fique de olho no seu e-mail e WhatsApp.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', company: '', pack: '', message: '' }); }}
                  className="mt-2 text-[#C6F058] text-sm font-semibold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">Nome completo *</label>
                    <input type="text" name="name" required placeholder="Seu nome" value={form.name} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">E-mail *</label>
                    <input type="email" name="email" required placeholder="seu@email.com" value={form.email} onChange={handleChange} className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">WhatsApp *</label>
                    <input type="tel" name="phone" required placeholder="(11) 99999-9999" value={form.phone} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">Empresa</label>
                    <input type="text" name="company" placeholder="Nome da empresa" value={form.company} onChange={handleChange} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">Qual Pack te interessa?</label>
                  <select
                    name="pack"
                    value={form.pack}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled className="bg-[#1E232B] text-[#4B5563]">Selecione uma opção</option>
                    {PACKS_OPTIONS.map(p => (
                      <option key={p} value={p} className="bg-[#1E232B] text-white">{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">Conte sobre seu negócio *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Qual é o principal desafio de marketing do seu negócio hoje?"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full flex items-center justify-center gap-2 bg-[#C6F058] text-[#1E232B] py-4 rounded-xl font-bold text-sm hover:bg-[#d4f472] active:scale-95 transition-all shadow-[0_0_30px_rgba(198,240,88,0.15)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Quero meu diagnóstico gratuito
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info side */}
          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.3 }}
            className="flex flex-col gap-8 lg:pt-2"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Como funciona?</h3>
              <ol className="space-y-4 mt-4">
                {[
                  { n: '1', text: 'Você preenche o formulário ao lado.' },
                  { n: '2', text: 'Nossa equipe entra em contato em até 24 horas úteis.' },
                  { n: '3', text: 'Fazemos uma conversa de 30 minutos para entender seu negócio.' },
                  { n: '4', text: 'Apresentamos o Pack ideal para o seu momento — sem compromisso.' },
                ].map(({ n, text }) => (
                  <li key={n} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C6F058]/10 border border-[#C6F058]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#C6F058] text-xs font-bold">{n}</span>
                    </div>
                    <span className="text-[#9CA3AF] text-sm leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail,          label: 'E-mail',     value: 'contato@mktplay.com.br' },
                { icon: Phone,         label: 'WhatsApp',   value: '+55 (11) 99999-0000'    },
                { icon: Instagram,     label: 'Instagram',  value: '@mktplay'               },
                { icon: MessageSquare, label: 'LinkedIn',   value: 'MKT&Play'               },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-4 bg-[#2A303C] border border-white/5 rounded-xl hover:border-[#C6F058]/20 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#C6F058]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#C6F058]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-medium mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#2A303C] border border-[#C6F058]/15 rounded-xl p-5 space-y-2">
              {[
                'Diagnóstico 100% gratuito',
                'Sem compromisso de contratação',
                'Contratos flexíveis e sem multa alta',
                'Proposta personalizada para o seu negócio',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6F058] flex-shrink-0" />
                  <span className="text-[#9CA3AF] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
