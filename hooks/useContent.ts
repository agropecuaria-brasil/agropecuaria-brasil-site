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
        const query = `{
          "settings": *[_type == "siteSettings"][0]{
            ...,
            "favicon": favicon.asset->url,
            logoHeader { "url": asset->url + "?auto=format&fm=webp&q=80" },
            logoFooter { "url": asset->url + "?auto=format&fm=webp&q=80" },
            "aboutImage": aboutImage.asset->url + "?auto=format&fm=webp&q=80",
            heroSlides[]{
              ...,
              "image": image.asset->url + "?auto=format&fm=webp&q=80",
              "mobileImage": mobileImage.asset->url + "?auto=format&fm=webp&q=80"
            },
            showcaseItems[]{
              title,
              description,
              icon,
              "image": image.asset->url + "?auto=format&fm=webp&q=80"
            },
            instagramPosts[]{
              link,
              caption,
              "image": image.asset->url + "?auto=format&fm=webp&q=80"
            },
            announcements[]{
              text,
              icon
            },
            
            // Busca produtos referenciados na ordem definida
            featuredProducts[]->{
              ...,
              "id": _id,
              "image": image.asset->url + "?auto=format&fm=webp&q=80"
            },

            // Busca depoimentos referenciados na ordem definida
            featuredTestimonials[]->{
              "id": _id,
              name,
              text,
              rating,
              "date": dateText,
              source,
              "avatar": avatar.asset->url + "?auto=format&fm=webp&q=80"
            }
          },
          // Fallbacks de busca caso não estejam configurados no Settings (ordenados por criação)
          "allProducts": *[_type == "product" && active == true] | order(_createdAt desc)[0..15]{
            ...,
            "id": _id,
            "image": image.asset->url + "?auto=format&fm=webp&q=80"
          },
          "promoBanners": *[_type == "promoBanner"]{
             ...,
             "bgImage": bgImage.asset->url + "?auto=format&fm=webp&q=80"
          },
          "brands": *[_type == "brand"] | order(name asc){
             name,
             "logo": logo.asset->url + "?auto=format&fm=webp&q=80"
          },
          "allTestimonials": *[_type == "testimonial"] | order(_createdAt desc){
             "id": _id,
             name,
             text,
             rating,
             "date": dateText,
             source,
             "avatar": avatar.asset->url + "?auto=format&fm=webp&q=80"
          }
        }`;
        
        const data = await sanityClient.fetch(query);
        
        if (data) {
          // Prioriza a lista manual do settings, se não existir, usa a lista geral ordenada por data
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