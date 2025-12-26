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
  caption?: string;
  link?: string;
}

export interface SiteSettings {
  title?: string;
  favicon?: string; 
  logoHeader: SanityImage;
  logoFooter: SanityImage;
  heroSlides: HeroSlideData[]; 
  showcaseItems?: ShowcaseItem[]; 
  instagramPosts?: InstagramPost[];
  aboutImage: string; 
  footerDescription: string;
  whatsappGlobal: string;
  whatsappGroupUrl: string;
  googleReviewsUrl?: string; 
  instagramUrl: string;
  facebookUrl: string;
  gtmId: string;
  contactInfo: {
    address: string;
    googleMapsEmbedUrl: string;
    phonePrimary: string;
    phoneSecondary?: string;
    email: string;
    openingHoursWeek: string;
    openingHoursWeekend: string;
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
  source: 'newsletter' | 'whatsapp_modal' | 'contact_form' | 'meta_ads' | 'google_ads';
  sheetName?: string;
  date: string;
  time: string;
}

export type PageView = 'privacy';