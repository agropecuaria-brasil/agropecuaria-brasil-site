import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, ArrowRight, CheckCircle } from 'lucide-react';

const FADE_UP = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

interface FormState {
  name:    string;
  email:   string;
  phone:   string;
  company: string;
  message: string;
}

export default function Contact() {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', phone: '', company: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const inputCls =
    'w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-[#4B5563] text-sm focus:outline-none focus:border-[#C6F058]/50 focus:ring-1 focus:ring-[#C6F058]/20 transition-all';

  return (
    <section id="contato" className="py-28 bg-[#2A303C] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6F058]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            {...FADE_UP}
            className="inline-block text-[#C6F058] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Contato
          </motion.span>

          <motion.h2
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Pronto para simplificar{' '}
            <span className="text-[#C6F058]">seu marketing?</span>
          </motion.h2>

          <motion.p
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.2 }}
            className="text-[#9CA3AF] text-lg leading-relaxed font-light"
          >
            Fale com nossa equipe e descubra como o método Plug and Play pode
            transformar sua presença digital em crescimento previsível.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.15 }}
            className="bg-[#1E232B] border border-white/5 rounded-2xl p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#C6F058]/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#C6F058]" />
                </div>
                <h3 className="text-white font-bold text-xl">Mensagem enviada!</h3>
                <p className="text-[#9CA3AF] text-sm max-w-xs">
                  Nossa equipe entrará em contato em breve. Fique de olho no seu e-mail.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', company: '', message: '' }); }}
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
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Seu nome"
                      value={form.name}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(11) 99999-9999"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">Empresa</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Nome da empresa"
                      value={form.company}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#9CA3AF] text-xs font-medium block mb-1.5">Mensagem *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Como podemos ajudar o seu negócio?"
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
                      Enviar Mensagem
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            {...FADE_UP}
            transition={{ ...FADE_UP.transition, delay: 0.3 }}
            className="flex flex-col gap-8 lg:pt-2"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Vamos conversar?</h3>
              <p className="text-[#9CA3AF] font-light leading-relaxed">
                Preferimos entender o seu contexto antes de oferecer qualquer solução.
                Uma conversa de 30 minutos é suficiente para mapearmos as principais
                oportunidades do seu negócio.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail,      label: 'E-mail',    value: 'contato@mktplay.com.br'  },
                { icon: Phone,     label: 'WhatsApp',  value: '+55 (11) 99999-0000'     },
                { icon: Instagram, label: 'Instagram', value: '@mktplay.agencia'        },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 bg-[#1E232B] border border-white/5 rounded-xl hover:border-[#C6F058]/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C6F058]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#C6F058]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-medium mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust bullets */}
            <div className="space-y-3 pt-2">
              {[
                'Resposta em até 24 horas úteis',
                'Primeira conversa estratégica sem custo',
                'Sem compromisso de contratação imediata',
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
