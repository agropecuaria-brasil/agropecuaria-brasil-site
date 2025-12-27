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
        // Otimização EXTREMA para PageSpeed > 90
        // Redução agressiva de pixels (w=) e qualidade (q=65)
        // O relatório indicou imagens de 800px sendo usadas em slots de 280px.
        
        const query = `{
          "settings": *[_type == "siteSettings"][0]{
            ...,
            "favicon": favicon.asset->url,
            // Logos pequenos
            logoHeader { "url": asset->url + "?auto=format&fm=webp&h=60&q=80" },
            logoFooter { "url": asset->url + "?auto=format&fm=webp&h=60&q=80" },
            
            "aboutImage": aboutImage.asset->url + "?auto=format&fm=webp&w=500&q=65",
            
            heroSlides[]{
              ...,
              // Hero: Desktop 1280px (suficiente para telas comuns), Mobile 600px
              "image": image.asset->url + "?auto=format&fm=webp&w=1280&q=70",
              "mobileImage": mobileImage.asset->url + "?auto=format&fm=webp&w=600&q=65"
            },
            
            showcaseItems[]{
              title,
              description,
              icon,
              // Reduzido para w=300 (Grid de 4 colunas não precisa mais que isso)
              "image": image.asset->url + "?auto=format&fm=webp&w=300&h=200&fit=crop&q=65"
            },
            
            instagramPosts[]{
              link,
              caption,
              "image": image.asset->url + "?auto=format&fm=webp&w=250&h=250&fit=crop&q=65"
            },
            announcements[]{
              text,
              icon
            },
            
            featuredProducts[]->{
              ...,
              "id": _id,
              // Produto: Quadrado de 250px é suficiente para card
              "image": image.asset->url + "?auto=format&fm=webp&w=250&h=250&fit=fill&bg=ffffff&q=65"
            },

            featuredTestimonials[]->{
              "id": _id,
              name,
              text,
              rating,
              "date": dateText,
              source,
              "avatar": avatar.asset->url + "?auto=format&fm=webp&w=64&h=64&fit=crop&q=65"
            }
          },
          
          "allProducts": *[_type == "product" && active == true] | order(_createdAt desc)[0..15]{
            ...,
            "id": _id,
            "image": image.asset->url + "?auto=format&fm=webp&w=250&h=250&fit=fill&bg=ffffff&q=65"
          },
          
          "promoBanners": *[_type == "promoBanner"]{
             ...,
             // Banners: Reduzido para 600px (já que em desktop ocupam metade da tela)
             "bgImage": bgImage.asset->url + "?auto=format&fm=webp&w=600&q=65"
          },
          
          "brands": *[_type == "brand"] | order(name asc){
             name,
             "logo": logo.asset->url + "?auto=format&fm=webp&w=150&q=75"
          },
          
          "allTestimonials": *[_type == "testimonial"] | order(_createdAt desc){
             "id": _id,
             name,
             text,
             rating,
             "date": dateText,
             source,
             "avatar": avatar.asset->url + "?auto=format&fm=webp&w=64&h=64&fit=crop&q=65"
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