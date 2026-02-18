export interface HeroData {
  catchcopy: string;
  subtext: string;
  ctaLabel: string;
  ctaUrl: string;
  bgImageUrl: string;
}

export interface ConceptData {
  title: string;
  body: string;
  imageUrl: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  body: string;
}

export interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export interface VoiceItem {
  name: string;
  text: string;
  rating: number;
}

export interface StaffItem {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface AccessHour {
  days: string;
  time: string;
}

export interface AccessData {
  address: string;
  tel: string;
  hours: AccessHour[];
  googleMapEmbedUrl: string;
}

export interface ContactData {
  lineUrl: string;
  instagramUrl: string;
  reservationNote: string;
}

export interface FooterData {
  copyright: string;
}

export interface SiteSettings {
  heroSize: 'sm' | 'md' | 'lg';
  headingSize: 'sm' | 'md' | 'lg';
  bodySize: 'sm' | 'md' | 'lg';
}

export interface ContentData {
  settings: SiteSettings;
  charStyles?: Record<string, number[]>;
  imagePositions?: Record<string, { x: number; y: number }>;
  hero: HeroData;
  concept: ConceptData;
  features: FeatureItem[];
  menu: MenuItem[];
  voice: VoiceItem[];
  staff: StaffItem[];
  access: AccessData;
  contact: ContactData;
  footer: FooterData;
}
