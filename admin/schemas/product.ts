
export default {
  name: 'product',
  title: 'Produtos (Vitrine)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Cães', value: 'Cães' },
          { title: 'Gatos', value: 'Gatos' },
          { title: 'Pássaros', value: 'Pássaros' },
          { title: 'Peixes', value: 'Peixes' },
          { title: 'Répteis', value: 'Répteis' },
          { title: 'Grande Porte', value: 'Grande Porte' },
          { title: 'Roedores', value: 'Roedores' },
          { title: 'Rações', value: 'Rações' },
          { title: 'Medicamentos', value: 'Medicamentos' },
          { title: 'Higiene', value: 'Higiene' },
          { title: 'Acessórios', value: 'Acessórios' },
          { title: 'Brinquedos', value: 'Brinquedos' },
        ]
      }
    },
    {
      name: 'price',
      title: 'Preço Atual (R$)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'oldPrice',
      title: 'Preço Antigo',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Imagem do Produto',
      type: 'image',
      description: 'Recomendado: 500x500px (Quadrado). Fundo Branco ou Transparente. Formato: PNG ou JPEG.',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'badge',
      title: 'Selo/Etiqueta',
      type: 'string'
    },
    {
      name: 'active',
      title: 'Ativo no Site?',
      type: 'boolean',
      initialValue: true
    }
  ]
}
