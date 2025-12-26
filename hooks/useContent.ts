import { useState, useEffect } from 'react';
import { ContentContextType } from '../types';
import { sanityClient } from '../lib/sanity';

const defaultData: ContentContextType = {
  isLoading: true,
  settings: {
    logoHeader: { url: '' },
    logoFooter: { url: '' },
    heroSlides: [], 
    showcaseItems: [],
    aboutImage: "",
    footerDescription: '',
    whatsappGlobal: '',
    whatsappGroupUrl: '', 
    googleReviewsUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    gtmId: '',
    contactInfo: {
      address: '',
      googleMapsEmbedUrl: '',
      phonePrimary: '',
      phoneSecondary: '',
      email: '',
      openingHoursWeek: '',
      openingHoursWeekend: ''
    }
  },
  announcements: [],
  promoBanners: [],
  products: [],
  brands: [],
  testimonials: []
};

export const useContent = () => {
  const [content, setContent] = useState<ContentContextType>(defaultData);

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
        // Otimização de Imagens:
        // q=75: Qualidade 75% (imperceptível a olho nu, muito mais leve)
        // fm=webp: Formato WebP (mais leve que JPEG/PNG)
        // w=XXX: Largura máxima específica para cada contexto
        
        const query = `{
          "settings": *[_type == "siteSettings"][0]{
            ...,
            "favicon": favicon.asset->url,
            // Logos pequenos
            logoHeader { "url": asset->url + "?auto=format&fm=webp&h=80&q=85" },
            logoFooter { "url": asset->url + "?auto=format&fm=webp&h=80&q=85" },
            
            // Imagem Sobre: Vertical, max 800px largura
            "aboutImage": aboutImage.asset->url + "?auto=format&fm=webp&w=800&q=75",
            
            // Hero: Desktop 1920px, Mobile 800px
            heroSlides[]{
              ...,
              "image": image.asset->url + "?auto=format&fm=webp&w=1920&q=75",
              "mobileImage": mobileImage.asset->url + "?auto=format&fm=webp&w=800&q=75"
            },
            
            // Vitrine: Cards menores, max 600px
            showcaseItems[]{
              title,
              description,
              icon,
              "image": image.asset->url + "?auto=format&fm=webp&w=600&h=400&fit=crop&q=75"
            },
            
            // Instagram: Thumbnails quadrados 400x400
            instagramPosts[]{
              link,
              caption,
              "image": image.asset->url + "?auto=format&fm=webp&w=400&h=400&fit=crop&q=75"
            },
            announcements[]{
              text,
              icon
            },
            
            featuredProducts[]->{
              ...,
              "id": _id,
              "image": image.asset->url + "?auto=format&fm=webp&w=500&h=500&fit=fill&bg=ffffff&q=75"
            },

            featuredTestimonials[]->{
              "id": _id,
              name,
              text,
              rating,
              "date": dateText,
              source,
              "avatar": avatar.asset->url + "?auto=format&fm=webp&w=100&h=100&fit=crop&q=75"
            }
          },
          
          // Produtos Gerais: max 500x500
          "allProducts": *[_type == "product" && active == true] | order(_createdAt desc)[0..15]{
            ...,
            "id": _id,
            "image": image.asset->url + "?auto=format&fm=webp&w=500&h=500&fit=fill&bg=ffffff&q=75"
          },
          
          // Banners Promocionais: max 1200px
          "promoBanners": *[_type == "promoBanner"]{
             ...,
             "bgImage": bgImage.asset->url + "?auto=format&fm=webp&w=1200&q=75"
          },
          
          // Logos Marcas: Pequenos, max 300px
          "brands": *[_type == "brand"] | order(name asc){
             name,
             "logo": logo.asset->url + "?auto=format&fm=webp&w=300&q=80"
          },
          
          "allTestimonials": *[_type == "testimonial"] | order(_createdAt desc){
             "id": _id,
             name,
             text,
             rating,
             "date": dateText,
             source,
             "avatar": avatar.asset->url + "?auto=format&fm=webp&w=100&h=100&fit=crop&q=75"
          }
        }`;
        
        const data = await sanityClient.fetch(query);
        
        if (data) {
          const finalProducts = (data.settings?.featuredProducts && data.settings.featuredProducts.length > 0)
            ? data.settings.featuredProducts
            : (data.allProducts || []);

          const finalTestimonials = (data.settings?.featuredTestimonials && data.settings.featuredTestimonials.length > 0)
            ? data.settings.featuredTestimonials
            : (data.allTestimonials || []);

          setContent((prev) => ({
            ...prev,
            isLoading: false,
            
            settings: data.settings ? { 
              ...prev.settings, 
              ...data.settings,
              heroSlides: data.settings.heroSlides || [],
              showcaseItems: data.settings.showcaseItems || [],
              logoHeader: data.settings.logoHeader?.url ? data.settings.logoHeader : { url: '' },
              logoFooter: data.settings.logoFooter?.url ? data.settings.logoFooter : { url: '' },
              aboutImage: data.settings.aboutImage || "",
              contactInfo: { ...prev.settings.contactInfo, ...(data.settings.contactInfo || {}) }
            } : prev.settings,
            
            announcements: data.settings?.announcements || [],
            products: finalProducts,
            promoBanners: data.promoBanners || [],
            brands: data.brands || [],
            testimonials: finalTestimonials
          }));
        }
      } catch (error: any) {
        console.warn("Erro ao buscar Sanity.", error);
        setContent((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchSanityData();
  }, []);

  return content;
};