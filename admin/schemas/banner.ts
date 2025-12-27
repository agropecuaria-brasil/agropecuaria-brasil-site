
export default {
  name: 'promoBanner',
  title: 'Banners Promocionais',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Banner',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    },
    {
      name: 'bgImage',
      title: 'Imagem de Fundo',
      type: 'image',
      description: 'Recomendado: 800x600px (Desktop) ou formato quadrado para mobile. Formato: JPEG.',
      options: { hotspot: true }
    },
    {
      name: 'bgColor',
      title: 'Cor de Fundo',
      type: 'string',
      options: {
        list: [
          { title: 'Verde (#24902C)', value: '#24902C' },
          { title: 'Azul (#264788)', value: '#264788' },
          { title: 'Amarelo (#E5C808)', value: '#E5C808' },
          { title: 'Branco (#FFFFFF)', value: '#FFFFFF' },
          { title: 'Sem Cor (Transparente)', value: 'transparent' }
        ],
        layout: 'radio'
      },
      initialValue: '#24902C'
    },
    {
      name: 'textColor',
      title: 'Cor do Texto',
      type: 'string',
      initialValue: '#FFFFFF'
    },
    {
      name: 'buttonText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'CONFIRA'
    },
    {
      name: 'link',
      title: 'Link / Âncora (Apenas se for "Apenas Imagem")',
      type: 'string',
      description: 'Ex: #ofertas, #produtos ou uma URL completa.',
      initialValue: '#ofertas'
    },
    {
      name: 'onlyImage',
      title: 'Apenas Imagem? (Sem texto/botão WhatsApp)',
      type: 'boolean',
      initialValue: false
    }
  ]
}