
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
      title: 'Cor de Fundo (Hex)',
      type: 'string',
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
      title: 'Link / Âncora',
      type: 'string',
      initialValue: '#ofertas'
    },
    {
      name: 'onlyImage',
      title: 'Apenas Imagem?',
      type: 'boolean',
      initialValue: false
    }
  ]
}
