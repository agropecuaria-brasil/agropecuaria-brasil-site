export default {
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Site (SEO)',
      type: 'string'
    },
    {
      name: 'favicon',
      title: 'Favicon do Site',
      type: 'image',
      description: 'Ícone que aparece na aba do navegador. Recomendado: 32x32px ou 64x64px (PNG).'
    },
    {
        name: 'heroSlides',
        title: 'Carrossel Principal (Hero Banner)',
        type: 'array',
        of: [{ type: 'heroSlide' }],
        description: 'Adicione, edite ou reordene os banners principais do site.'
    },
    {
      name: 'featuredProducts',
      title: 'Ofertas Especiais (Ordenação)',
      type: 'array',
      description: 'Selecione e ordene os produtos que aparecerão no carrossel de ofertas.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    },
    {
      name: 'showcaseItems',
      title: 'Vitrine da Loja (Categorias)',
      type: 'array',
      description: 'Gerencie os 4 cards da seção Vitrine da Loja.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'text', title: 'Descrição', rows: 2 },
            { 
              name: 'image', 
              type: 'image', 
              title: 'Imagem de Fundo',
              description: 'Recomendado: 800x600px ou 600x400px (Horizontal). Formato: JPEG.'
            },
            { 
              name: 'icon', 
              type: 'string', 
              title: 'Ícone',
              options: {
                list: [
                  { title: 'Cachorro', value: 'Dog' },
                  { title: 'Trator', value: 'Tractor' },
                  { title: 'Planta', value: 'Sprout' },
                  { title: 'Seringa (Vacina)', value: 'Syringe' },
                  { title: 'Peixe', value: 'Fish' },
                  { title: 'Gato', value: 'Cat' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'announcements',
      title: 'Faixa de Avisos (Topo do Site)',
      type: 'array',
      description: 'As frases que ficam alternando na barra verde no topo do site.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto do Aviso',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'Caminhão (Entrega)', value: 'Truck' },
                  { title: 'Caixa (Envio)', value: 'Package' },
                  { title: 'Calendário (Datas)', value: 'Calendar' },
                  { title: 'Medalha (Qualidade)', value: 'Award' }
                ],
                layout: 'radio'
              },
              initialValue: 'Calendar'
            }
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'icon'
            }
          }
        }
      ]
    },
    {
      name: 'featuredTestimonials',
      title: 'Depoimentos (Ordenação)',
      type: 'array',
      description: 'Selecione e ordene os depoimentos que aparecerão no site.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }]
        }
      ]
    },
    {
      name: 'logoHeader',
      title: 'Logo do Cabeçalho',
      type: 'image',
      description: 'Recomendado: 200x80px. Formato: PNG com fundo transparente.'
    },
    {
      name: 'logoFooter',
      title: 'Logo do Rodapé (Versão Branca)',
      type: 'image',
      description: 'Recomendado: 200x80px. Cor: Branco puro. Formato: PNG com fundo transparente.'
    },
    {
      name: 'aboutImage',
      title: 'Imagem da Seção "Quem Somos" (Manifesto)',
      type: 'image',
      description: 'Recomendado: 800x1000px (Retrato/Vertical). Formato: JPEG. Foto de alta qualidade (Ex: Produtor rural, fachada da loja ou animal feliz).',
      options: { hotspot: true }
    },
    {
      name: 'footerDescription',
      title: 'Texto do Rodapé',
      type: 'text',
      rows: 3
    },
    {
      name: 'whatsappGlobal',
      title: 'Número WhatsApp Geral',
      type: 'string',
      description: 'Apenas números (Ex: 5516999999999).'
    },
    {
      name: 'whatsappGroupUrl',
      title: 'Link do Grupo VIP',
      type: 'url'
    },
    {
      name: 'googleReviewsUrl',
      title: 'Link "Ver avaliações no Google"',
      type: 'url',
      description: 'Link direto para a página de avaliações da empresa no Google Maps.'
    },
    {
      name: 'instagramUrl',
      title: 'Link do Instagram',
      type: 'url'
    },
    {
      name: 'instagramPosts',
      title: 'Posts do Instagram (Manual)',
      description: 'Adicione as últimas 4 fotos do Instagram para aparecerem no site.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'image', 
              title: 'Imagem do Post', 
              type: 'image',
              options: { hotspot: true } 
            },
            { name: 'link', title: 'Link do Post', type: 'url' },
            { name: 'caption', title: 'Legenda / Texto Alternativo', type: 'string' }
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image'
            }
          }
        }
      ]
    },
    {
      name: 'facebookUrl',
      title: 'Link do Facebook',
      type: 'url'
    },
    {
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string'
    },
    {
      title: 'Informações de Contato',
      name: 'contactInfo',
      type: 'object',
      fields: [
        { name: 'address', title: 'Endereço', type: 'text', rows: 3 },
        { name: 'googleMapsEmbedUrl', title: 'Link Embed Google Maps', type: 'url' },
        { name: 'phonePrimary', title: 'Telefone Principal', type: 'string' },
        { name: 'phoneSecondary', title: 'Telefone Secundário', type: 'string' },
        { name: 'email', title: 'E-mail', type: 'string' },
        { name: 'openingHoursWeek', title: 'Horário (Seg-Sáb)', type: 'string' },
        { name: 'openingHoursWeekend', title: 'Horário (Dom)', type: 'string' }
      ]
    }
  ]
}