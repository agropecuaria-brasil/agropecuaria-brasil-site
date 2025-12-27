
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
      description: 'Escolha estritamente uma das cores da marca ou fundo transparente.',
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
      initialValue: '#24902C',
      validation: (Rule: any) => Rule.required()
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
      title: 'Link de Destino',
      type: 'string',
      description: 'Cole a URL (ex: google.com) ou âncora (ex: #ofertas). O site corrigirá automaticamente para abrir em nova aba se for externo.',
    },
    {
      name: 'onlyImage',
      title: 'Apenas Imagem? (Banner clicável)',
      description: 'Se ativado, remove texto e botão WhatsApp. O banner inteiro vira um link para a URL acima.',
      type: 'boolean',
      initialValue: false
    }
  ]
}