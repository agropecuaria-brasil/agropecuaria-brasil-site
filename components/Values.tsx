
import React from 'react';
import { Heart, Sun, Users, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    title: "Cuidado que se sente",
    description: "Nascemos com um propósito simples e enorme: cuidar. Dos animais, da natureza e da sua família."
  },
  {
    icon: Sun,
    title: "Brasilidade e Natureza",
    description: "O orgulho de ser brasileiro, de viver rodeado pela natureza, com alegria e simplicidade."
  },
  {
    icon: Users,
    title: "Proximidade e Parceria",
    description: "Estamos com você todos os dias, do jeito brasileiro de ser: lado a lado. Conversa de igual para igual."
  },
  {
    icon: ShieldCheck,
    title: "Confiança e Variedade",
    description: "Referência em diversidade, preço justo e produtos confiáveis desde 1997."
  }
];

const Values: React.FC = () => {
  return (
    <section id="valores" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#264788] text-sm font-bold uppercase tracking-wide mb-2">
            Nossa Essência
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Muito mais do que uma loja
          </h3>
          <div className="w-20 h-1 bg-[#24902C] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-[#E5C808] group hover:-translate-y-1 shadow-sm"
            >
              <div className="w-14 h-14 bg-[#E9F5EC] rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#24902C] transition-colors duration-300">
                <pillar.icon className="text-[#24902C] group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <h4 className="text-xl font-bold text-[#264788] mb-3">
                {pillar.title}
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
