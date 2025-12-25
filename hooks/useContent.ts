import { useState, useEffect } from 'react';
import { ContentContextType, HeroSlideData, ProductData, Testimonial, Announcement } from '../types';
import { sanityClient } from '../lib/sanity';

// --- DADOS DE EXEMPLO (FALLBACK) ---
// Estes dados aparecem quando o Sanity está vazio.
// Assim que você cadastrar algo no Sanity, estes dados somem.

const defaultHeroSlides: HeroSlideData[] = [
  {
    image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=1920&auto=format&fit=crop",
    theme: "blue",
    title: "Cuidar bem é da <br/>nossa natureza.",
    description: "Mais do que produtos agropecuários, entregamos cuidado, confiança e proximidade."
  },
  {
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
    theme: "green",
    title: "Tudo para o seu <br/>Agronegócio",
    description: "Produtos de alta qualidade para garantir a produtividade do seu campo."
  }
];

const defaultAnnouncements: Announcement[] = [
  { text: "Quarta Animal: Toda Quarta-feira 10% de desconto na Loja Física", icon: "Calendar" },
  { text: "Entrega Rápida para toda a região de São Carlos", icon: "Truck" }
];

const defaultProducts: ProductData[] = [
  { 
    id: 1, 
    name: "Ração Golden Special 15kg", 
    category: "Cães", 
    price: 129.90, 
    oldPrice: 149.90, 
    image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=400&auto=format&fit=crop", 
    badge: "-13%" 
  },
  { 
    id: 2, 
    name: "Antipulgas Simparic 80mg", 
    category: "Medicamentos", 
    price: 185.90, 
    oldPrice: 210.00, 
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop", 
    badge: "Oferta" 
  },
  { 
    id: 3, 
    name: "Areia Sanitária Pipicat 4kg", 
    category: "Gatos", 
    price: 14.99, 
    oldPrice: 18.90, 
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop", 
    badge: null 
  },
  { 
    id: 4, 
    name: "Kit Jardinagem Profissional", 
    category: "Jardinagem", 
    price: 89.90, 
    oldPrice: 120.00, 
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400&auto=format&fit=crop", 
    badge: "Kit" 
  },
  { 
    id: 5, 
    name: "Whiskas Sachê Carne", 
    category: "Gatos", 
    price: 2.79, 
    oldPrice: 3.50, 
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop", 
    badge: null 
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silva",
    text: "Atendimento maravilhoso! Sempre compro a ração dos meus gatos aqui e a entrega é super rápida.",
    rating: 5,
    date: "há 2 dias",
    source: "google",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Roberto Mendes",
    text: "Loja completa. Encontrei tudo o que precisava para o meu sítio, desde ferramentas até medicamentos veterinários.",
    rating: 5,
    date: "há 1 semana",
    source: "google",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Fernanda Oliveira",
    text: "Amei a 'Quarta Animal'! Consegui um desconto ótimo na ração do meu cachorro. Recomendo muito a Agropecuária Brasil.",
    rating: 5,
    date: "há 2 semanas",
    source: "facebook",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  }
];

// Placeholder logos (caso não tenha no Sanity)
const PLACEHOLDER_LOGO = "https://placehold.co/200x80/264788/FFFFFF/png?text=Agro+Brasil";

const defaultData: ContentContextType = {
  isLoading: true,
  settings: {
    logoHeader: { url: PLACEHOLDER_LOGO, width: 160, height: 60 },
    logoFooter: { url: PLACEHOLDER_LOGO, width: 200, height: 80 },
    heroSlides: defaultHeroSlides, // Inicia com o padrão
    aboutImage: "https://picsum.photos/seed/farmer/800/1000",
    footerDescription: 'Desde 1997 sendo referência em produtos de petshop e agropecuários em São Carlos.',
    whatsappGlobal: '551600000000',
    whatsappGroupUrl: 'https://chat.whatsapp.com/', 
    googleReviewsUrl: 'https://www.google.com/maps', // Fallback
    instagramUrl: 'https://www.instagram.com/agropecuaria.brasilsc/',
    instagramPosts: [],
    facebookUrl: 'https://www.facebook.com/agropecuariabrasilsaocarlos',
    gtmId: 'GTM-XXXXXX',
    contactInfo: {
      address: 'Rua Major Manoel Antonio de Mattos, 567\nJardim Ricetti, São Carlos - SP\nCEP: 13560-831',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.428613146193!2d-47.89970592395133!3d-22.0198661798877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b87728f5223c6b%3A0x867343163333333!2sR.%20Maj.%20Manoel%20Ant%C3%B4nio%20de%20Matos%2C%20567%20-%20Jardim%20Ricetti%2C%20S%C3%A3o%20Carlos%20-%20SP%2C%2013560-831!5e0!3m2!1spt-BR!2sbr!4v1709923456789!5m2!1spt-BR!2sbr',
      phonePrimary: '(16) 3372-4448',
      phoneSecondary: '(16) 3371-4849',
      email: 'contato@agropecuariabrasil.com.br',
      openingHoursWeek: '08:00 às 19:00',
      openingHoursWeekend: 'Fechado'
    }
  },
  announcements: defaultAnnouncements, // Inicia com o padrão
  promoBanners: [],
  products: defaultProducts, // Inicia com o padrão
  brands: [],
  testimonials: defaultTestimonials // Inicia com o padrão
};

export const useContent = () => {
  const [content, setContent] = useState<ContentContextType>(defaultData);

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
        const query = `{
          "settings": *[_type == "siteSettings"][0]{
            ...,
            logoHeader { "url": asset->url },
            logoFooter { "url": asset->url },
            "aboutImage": aboutImage.asset->url,
            heroSlides[]{
              ...,
              "image": image.asset->url,
              "mobileImage": mobileImage.asset->url
            },
            announcements[]{
              text,
              icon
            },
            instagramPosts[]{
              link,
              caption,
              "image": image.asset->url
            }
          },
          "products": *[_type == "product" && active == true] | order(_createdAt desc)[0..15]{
            ...,
            "id": _id,
            "image": image.asset->url
          },
          "promoBanners": *[_type == "promoBanner"]{
             ...,
             "bgImage": bgImage.asset->url
          },
          "brands": *[_type == "brand"] | order(name asc){
             name,
             "logo": logo.asset->url
          },
          "testimonials": *[_type == "testimonial"] | order(_createdAt desc){
             "id": _id,
             name,
             text,
             rating,
             "date": dateText,
             source,
             "avatar": avatar.asset->url
          }
        }`;
        
        const data = await sanityClient.fetch(query);
        
        if (data) {
          // LÓGICA DE EXIBIÇÃO:
          // 1. Tenta usar os dados do Sanity.
          // 2. Se o array do Sanity estiver vazio ou nulo, usa os dados de exemplo (default...).
          // 3. Isso garante que você veja o site bonito agora, mas ao cadastrar 1 item real, o exemplo some.
          
          setContent((prev) => ({
            ...prev,
            isLoading: false,
            
            settings: data.settings ? { 
              ...prev.settings, 
              ...data.settings,
              heroSlides: (data.settings.heroSlides && data.settings.heroSlides.length > 0)
                ? data.settings.heroSlides 
                : defaultHeroSlides, // Usa exemplo se vazio
              
              logoHeader: data.settings.logoHeader?.url ? data.settings.logoHeader : { url: PLACEHOLDER_LOGO },
              logoFooter: data.settings.logoFooter?.url ? data.settings.logoFooter : { url: PLACEHOLDER_LOGO },

              aboutImage: data.settings.aboutImage || prev.settings.aboutImage,
              contactInfo: { ...prev.settings.contactInfo, ...(data.settings.contactInfo || {}) }
            } : prev.settings,
            
            announcements: (data.settings?.announcements && data.settings.announcements.length > 0)
              ? data.settings.announcements
              : defaultAnnouncements, // Usa exemplo se vazio

            products: (data.products && data.products.length > 0) 
              ? data.products 
              : defaultProducts, // Usa exemplo se vazio

            promoBanners: (data.promoBanners && data.promoBanners.length > 0)
              ? data.promoBanners
              : [],

            brands: (data.brands && data.brands.length > 0)
              ? data.brands
              : [],

            testimonials: (data.testimonials && data.testimonials.length > 0)
              ? data.testimonials
              : defaultTestimonials // Usa exemplo se vazio
          }));
        }
      } catch (error: any) {
        console.warn("Erro ao buscar Sanity, usando fallback.", error);
        // Em caso de erro, mantém o estado inicial (que já tem os dados de exemplo)
        setContent((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchSanityData();
  }, []);

  return content;
};