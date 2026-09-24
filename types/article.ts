export type Language = 'ru' | 'en';

export interface GalleryItem {
  url: string;
  caption: {
    ru: string;
    en: string;
  };
}

export interface ArticleSection {
  heading: string;
  text: string;
}

export interface ArticleContent {
  lead: string;
  sections: ArticleSection[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface ProjectSpecs {
  architect: string;
  location: string;
  year: number | string;
  area: string;
  photographer?: string;
  typology?: string;
}

export interface Article {
  id: string;
  source: string;
  sourceUrl?: string;
  publishedAt: string; // ISO e.g. "2026-09-24"
  category: 'architecture' | 'urbanism' | 'interior' | 'technology' | 'landscape' | 'culture' | 'art';
  badge?: string;       // Editorial badge e.g. "ГЛАВНЫЙ МАТЕРИАЛ ДНЯ", "ПРЕМЬЕРА"
  mainImage: string;   // Authentic project photograph
  gallery: GalleryItem[];
  title: {
    ru: string;
    en: string;
  };
  summary: {
    ru: string;
    en: string;
  };
  content: {
    ru: ArticleContent;
    en: ArticleContent;
  };
  originalUrl: string;
  readTimeMinutes: number;
  isDailyFeatured?: boolean;
  isCustomParsed?: boolean;
  projectSpecs?: ProjectSpecs;
}

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'source-asc';
