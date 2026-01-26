// Tipos baseados nos Schemas do Sanity

export interface SanityImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface HeroSlideData {
  title: string;
  description: string;
  image: string; // URL Desktop
  mobileImage?: string; // URL Mobile
  theme: 'blue' | 'green' | 'yellow' | 'white';
}

export interface ShowcaseItem {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface InstagramPost {
  image: string;
  link?: string;
  caption?: string;
}

export interface SiteSettings {
  title?: string;
  favicon?: string; 
  logoHeader: SanityImage;
  logoFooter: SanityImage;
  heroSlides: HeroSlideData[]; 
  showcaseItems?: ShowcaseItem[]; 
  aboutImage: string; 
  footerDescription: string;
  whatsappGlobal: string;
  whatsappGroupUrl: string;
  googleReviewsUrl?: string; 
  instagramUrl: string;
  instagramPosts?: InstagramPost[];
  facebookUrl: string;
  gtmId: string;
  contactInfo: {
    address: string;
    googleMapsEmbedUrl: string;
    phonePrimary: string;
    phoneSecondary?: string;
    email: string;
    openingHoursMonFri: string;
    openingHoursSat: string;
    openingHoursSun: string;
  };
}

export interface Announcement {
  text: string;
  icon: string;
}

export interface PromoBanner {
  title: string;
  subtitle?: string;
  bgImage: string;
  bgColor: string;
  textColor: string;
  buttonText: string;
  buttonColor: string;
  link: string;
  onlyImage?: boolean;
}

export interface ProductData {
  id: string | number;
  name: string;
  categories: string[]; 
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Testimonial {
  id: string | number;
  name: string;
  text: string;
  rating: number;
  date: string;
  source: 'google' | 'facebook' | 'manual';
  avatar?: string; 
}

export interface ContentContextType {
  settings: SiteSettings;
  announcements: Announcement[];
  promoBanners: PromoBanner[];
  products: ProductData[];
  brands: Brand[];
  testimonials: Testimonial[];
  isLoading: boolean;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string; // Alterado de união de strings para string genérica para permitir rastreamento dinâmico
  sheetName?: string;
  date: string;
  time: string;
}

export type PageView = 'privacy';