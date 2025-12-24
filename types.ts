
// Tipos baseados nos Schemas do Sanity

export interface SanityImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface InstagramPost {
  image: string;
  link?: string;
  caption?: string;
}

export interface HeroSlideData {
  title: string;
  description: string;
  image: string; // URL Desktop
  mobileImage?: string; // URL Mobile
  theme: 'blue' | 'green' | 'yellow' | 'white';
}

export interface SiteSettings {
  logoHeader: SanityImage;
  logoFooter: SanityImage;
  heroSlides: HeroSlideData[]; // Novo Array de Slides
  aboutImage: string; // Nova Imagem do Manifesto
  footerDescription: string;
  whatsappGlobal: string;
  whatsappGroupUrl: string;
  googleReviewsUrl?: string; // Novo campo para link de avaliações
  instagramUrl: string;
  instagramPosts?: InstagramPost[]; // Novo campo para feed do Instagram
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
  category: string;
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
  avatar?: string; // Nova foto
}

export interface ContentContextType {
  settings: SiteSettings;
  // Hero removido daqui pois agora está dentro de settings.heroSlides
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