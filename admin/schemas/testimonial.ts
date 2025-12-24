
export default {
  name: 'testimonial',
  title: 'Depoimentos',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Cliente',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'text',
      title: 'Texto do Depoimento',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Nota (Estrelas)',
      type: 'number',
      description: 'De 1 a 5',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      initialValue: 5
    },
    {
      name: 'dateText',
      title: 'Quando foi avaliado?',
      type: 'string',
      description: 'Ex: "há 2 dias", "há 1 semana", "15/01/2024".'
    },
    {
      name: 'source',
      title: 'Origem da Avaliação',
      type: 'string',
      options: {
        list: [
          { title: 'Google Meu Negócio', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'WhatsApp / Direto', value: 'manual' }
        ]
      },
      initialValue: 'google'
    },
    {
      name: 'avatar',
      title: 'Foto do Cliente (Avatar)',
      type: 'image',
      description: 'Recomendado: 100x100px (Quadrado). Formato: JPEG ou PNG.',
      options: { hotspot: true }
    }
  ]
}
