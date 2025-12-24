
export default {
  name: 'heroSlide',
  title: 'Slide do Banner Principal',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      description: 'Use <br/> para quebrar linhas.'
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2
    },
    {
      name: 'image',
      title: 'Imagem de Fundo (Desktop)',
      type: 'image',
      description: 'Recomendado: 1920x720px (Paisagem). Formato: JPEG otimizado (Max 300kb).',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'mobileImage',
      title: 'Imagem de Fundo (Mobile - Opcional)',
      type: 'image',
      description: 'Se não preenchido, usa a de Desktop. Recomendado: 720x1000px (Retrato). Formato: JPEG.',
      options: { hotspot: true }
    },
    {
      name: 'theme',
      title: 'Tema de Cores do Slide',
      type: 'string',
      description: 'Define a cor do texto e o degradê sobre a imagem para garantir leitura.',
      options: {
        list: [
          { title: 'Azul (Padrão)', value: 'blue' },
          { title: 'Verde', value: 'green' },
          { title: 'Amarelo', value: 'yellow' },
          { title: 'Branco/Limpo', value: 'white' }
        ],
        layout: 'radio'
      },
      initialValue: 'blue'
    }
  ]
}
