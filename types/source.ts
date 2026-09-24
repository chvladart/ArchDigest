export type PortalCategory = 'all' | 'architecture' | 'interior' | 'culture' | 'urbanism' | 'art' | 'technology' | 'design';

export interface PortalSource {
  id: string;
  name: string;
  url: string;
  category: PortalCategory;
  description: {
    ru: string;
    en: string;
  };
  country: string;
  language: 'ru' | 'en' | 'multilingual';
  isActive: boolean;
  isCustom?: boolean;
  rssUrl?: string;
  articlesCount: number;
  lastSyncedAt?: string;
}
