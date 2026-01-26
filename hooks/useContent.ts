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
      openingHoursMonFri: '',
      openingHoursSat: '',
      openingHoursSun: ''
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
        // ATUALIZAÇÃO DE QUALIDADE (High Definition & Retina Ready)
        // - Logos: h=200 (para renderizar nítido em 60-80px de altura CSS)
        // - Hero: w=1920 (Full HD)
        // - Cards: Dobro do tamanho do slot (ex: slot 300px -> imagem 600px)
        // - Qualidade: 85% a 95% (Equilíbrio entre nitidez e performance WebP)
        
        const query = `{
          "settings": *[_type == "siteSettings"][0]{
            ...,
            "favicon": favicon.asset->url,
            // Logo: Aumentada para h=200 e q=95 para garantir nitidez total
            logoHeader { "url": asset->url + "?auto=format&fm=webp&h=200&q=95" },
            logoFooter { "url": asset->url + "?auto=format&fm=webp&h=200&q=95" },
            
            "aboutImage": aboutImage.asset->url + "?auto=format&fm=webp&w=1000&q=85",
            
            heroSlides[]{
              ...,
              // Hero Desktop: Full HD (1920px) com q=85
              "image": image.asset->url + "?auto=format&fm=webp&w=1920&q=85",
              // Hero Mobile: 800px (cobre telas maiores) com q=80
              "mobileImage": mobileImage.asset->url + "?auto=format&fm=webp&w=800&q=80"
            },
            
            showcaseItems[]{
              title,
              description,
              icon,
              // Vitrine: 600x400 (2x densidade para card de 300px) - q=85
              "image": image.asset->url + "?auto=format&fm=webp&w=600&h=400&fit=crop&q=85"
            },
            
            instagramPosts[]{
              link,
              caption,
              "image": image.asset->url + "?auto=format&fm=webp&w=500&h=500&fit=crop&q=80"
            },
            announcements[]{
              text,
              icon
            },
            
            featuredProducts[]->{
              ...,
              "id": _id,
              // Produto: 500x500 (2x densidade para card de 250px) - q=85
              "image": image.asset->url + "?auto=format&fm=webp&w=500&h=500&fit=fill&bg=ffffff&q=85"
            },

            featuredTestimonials[]->{
              "id": _id,
              name,
              text,
              rating,
              "date": dateText,
              source,
              "avatar": avatar.asset->url + "?auto=format&fm=webp&w=128&h=128&fit=crop&q=85"
            }
          },
          
          "allProducts": *[_type == "product" && active == true] | order(_createdAt desc)[0..15]{
            ...,
            "id": _id,
            // Produto: 500x500 (2x densidade) - q=85
            "image": image.asset->url + "?auto=format&fm=webp&w=500&h=500&fit=fill&bg=ffffff&q=85"
          },
          
          "promoBanners": *[_type == "promoBanner"]{
             ...,
             // Banners: 1200px para garantir nitidez em desktops maiores
             "bgImage": bgImage.asset->url + "?auto=format&fm=webp&w=1200&q=85"
          },
          
          "brands": *[_type == "brand"] | order(name asc){
             name,
             // Logos marcas: 300px e q=90
             "logo": logo.asset->url + "?auto=format&fm=webp&w=300&q=90"
          },
          
          "allTestimonials": *[_type == "testimonial"] | order(_createdAt desc){
             "id": _id,
             name,
             text,
             rating,
             "date": dateText,
             source,
             "avatar": avatar.asset->url + "?auto=format&fm=webp&w=128&h=128&fit=crop&q=85"
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