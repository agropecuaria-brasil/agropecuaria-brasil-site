
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrivacyPolicyPageProps {
  onNavigate?: any; // Mantido para compatibilidade, mas não usado
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
  return (
    <div className="bg-white min-h-screen pt-48 pb-20 font-sans animate-in fade-in duration-500">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link to="/" className="hover:text-[#24902C] transition-colors flex items-center gap-1">
            <ChevronLeft size={14} /> Voltar para Home
          </Link>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#24902C] mb-3 font-['Montserrat']">Política de Privacidade</h1>
          <p className="text-[#999] text-sm font-medium">Última atualização: 15 de Janeiro de 2026</p>
        </header>

        <div className="prose prose-lg max-w-none text-[#2C3E50] leading-loose">
          <p className="mb-6">
            A <strong>Agropecuária Brasil</strong> ("nós", "nosso") leva a sua privacidade a sério. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">1. Dados que Coletamos</h3>
          <p>Coletamos informações pessoais que você nos fornece voluntariamente e dados de navegação coletados automaticamente:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li><strong>Dados Pessoais Fornecidos:</strong> Nome, e-mail e número de telefone (WhatsApp). Estes dados são coletados quando você preenche nossos formulários de "Fale Conosco", "Iniciar Atendimento via WhatsApp" ou se inscreve em nosso "Grupo Vip de Whatsapp" (Newsletter).</li>
            <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e origem do tráfego.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">2. Finalidade do Uso dos Dados</h3>
          <p>Utilizamos seus dados para as seguintes finalidades:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li><strong>Atendimento ao Cliente:</strong> Para processar seus pedidos via WhatsApp e responder a dúvidas.</li>
            <li><strong>Marketing e Newsletter:</strong> Para enviar ofertas, novidades e promoções por e-mail, caso você tenha se cadastrado em nossa lista (base legal: Consentimento).</li>
            <li><strong>Melhoria do Site:</strong> Para entender como os usuários utilizam nosso site e melhorar a experiência de navegação.</li>
            <li><strong>Publicidade Personalizada:</strong> Para exibir anúncios relevantes para você em outras plataformas (como Google e Facebook/Instagram).</li>
          </ul>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">3. Cookies e Tecnologias de Rastreamento</h3>
          <p>Utilizamos cookies e tecnologias similares para coletar dados de navegação. Especificamente, utilizamos as seguintes ferramentas de terceiros:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li><strong>Google Tag Manager & Google Analytics 4 (GA4):</strong> Para análise estatística de tráfego e comportamento do usuário.</li>
            <li><strong>Google Ads (Tags de Conversão):</strong> Para medir a eficácia de nossas campanhas publicitárias e conversões.</li>
            <li><strong>Meta Pixel (Facebook/Instagram Ads):</strong> Para rastrear conversões e criar públicos personalizados para anúncios (Remarketing).</li>
          </ul>
          <p>Você pode gerenciar suas preferências de cookies a qualquer momento clicando no link "Preferências de Cookies" no rodapé deste site.</p>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">4. Compartilhamento de Dados</h3>
          <p>Não vendemos seus dados pessoais. Seus dados podem ser compartilhados apenas com:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li>Provedores de serviços essenciais (hospedagem do site, ferramentas de envio de e-mail).</li>
            <li>Plataformas de publicidade (Google e Meta) de forma anonimizada ou criptografada (Hashed), estritamente para fins de publicidade direcionada.</li>
            <li>Autoridades judiciais, se exigido por lei.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">5. Seus Direitos (LGPD)</h3>
          <p>Você tem o direito de:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li>Confirmar a existência de tratamento de dados.</li>
            <li>Acessar seus dados.</li>
            <li>Corrigir dados incompletos ou desatualizados.</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
            <li>Revogar seu consentimento para envio de Newsletter a qualquer momento (clicando em "descadastrar" no e-mail ou em caso do Grupo ViP do WhatsApp se removendo do Grupo). Em caso de dúvidas com tais procedimentos ou problemas pode entrar em contato conosco.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">6. Segurança</h3>
          <p>Adotamos medidas técnicas e administrativas para proteger seus dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas.</p>

          <h3 className="text-xl font-bold text-[#24902C] mt-8 mb-4">7. Contato</h3>
          <p>Para exercer seus direitos ou tirar dúvidas sobre esta Política de Privacidade, entre em contato conosco através do WhatsApp ou e-mail.</p>
          
          <p className="mt-8 font-bold">
            Agropecuária Brasil<br/>
            São Carlos - SP
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
