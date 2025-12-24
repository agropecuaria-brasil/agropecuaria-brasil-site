
export default {
  name: 'brand',
  title: 'Marcas Parceiras',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome da Marca',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo da Marca',
      type: 'image',
      description: 'Recomendado: 200x100px. Formato: PNG com fundo transparente. Margens cortadas.',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    }
  ]
}
