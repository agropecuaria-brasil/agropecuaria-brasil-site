import React from 'react';
import { Quote, ShieldCheck } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const Manifesto: React.FC = () => {
  const { settings } = useContent();

  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#E5C808]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#264788]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group bg-gray-100">
              {settings.aboutImage ? (
                <img 
                  src={settings.aboutImage} 
                  alt="Agropecuária Brasil - Quem Somos" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="800"
                  height="1000"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 p-10 text-center">
                   <span>Imagem "Quem Somos" não configurada</span>
                </div>
              )}
              
              {/* Selo de Confiança */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 transform transition-all duration-500 hover:translate-y-[-4px]">
                 <div className="w-12 h-12 bg-[#E5C808]/20 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} className="text-[#857400]" strokeWidth={2.5} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-[#264788] mb-1">
                      Confiança
                    </h4>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      Agropecuária Brasil: Um Petshop referência em qualidade e atendimento humanizado.
                    </p>
                 </div>
              </div>

            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <Quote className="text-[#E5C808] w-12 h-12 mb-4" />
            
            <div className="prose prose-lg text-gray-700">
              <h3 className="text-3xl font-bold text-[#264788] mb-6">
                Somos a Agropecuária Brasil.
              </h3>
              
              <p className="leading-relaxed">
                Nascemos com um propósito simples e enorme: <strong>cuidar</strong>. 
                Cuidar dos animais que fazem parte da sua história. 
                Cuidar da natureza que sustenta o nosso país.
              </p>
              
              <p className="leading-relaxed">
                Cuidar de você, que todos os dias levanta cedo para trabalhar, produzir e viver com dignidade.
                Acreditamos que cuidar bem é mais do que um serviço. É um gesto. É um compromisso.
              </p>

              <p className="text-xl font-medium text-[#24902C] italic border-l-4 border-[#E5C808] pl-6 py-2 bg-gray-50 rounded-r-lg">
                "É da nossa natureza. Porque somos brasileiros."
              </p>

              <p className="leading-relaxed">
                Porque crescemos em um país gigante, vibrante, alegre e cheio de vida.
                Aqui, cada animal tem um nome, cada quintal tem uma história e cada cliente é tratado como parceiro.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-[#264788] font-bold">
                Agropecuária Brasil. <br/>
                <span className="font-normal text-gray-600">Cuidar bem é da nossa natureza.</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Manifesto;