import type { Locale } from "../lib/i18n";

export interface SiteSettingsRecord {
  company_name_zh?: string;
  company_name_ja?: string;
  company_name_en?: string;
  phone?: string;
  email?: string;
  address_zh?: string;
  address_ja?: string;
  address_en?: string;
  copyright_zh?: string;
  copyright_ja?: string;
  copyright_en?: string;
  [key: string]: unknown;
}

export interface SiteSettingsView {
  companyName: string;
  address: string;
  phone: string;
  email: string;
}

export interface HomeSectionRecord {
  key: string;
  [key: string]: unknown;
}

export interface HomeHeroRecord {
  eyebrow_zh?: string;
  eyebrow_ja?: string;
  eyebrow_en?: string;
  title_zh?: string;
  title_ja?: string;
  title_en?: string;
  description_zh?: string;
  description_ja?: string;
  description_en?: string;
  primary_cta_label_zh?: string;
  primary_cta_label_ja?: string;
  primary_cta_label_en?: string;
  primary_cta_href?: string;
  secondary_cta_label_zh?: string;
  secondary_cta_label_ja?: string;
  secondary_cta_label_en?: string;
  secondary_cta_href?: string;
  highlights_zh?: unknown;
  highlights_ja?: unknown;
  highlights_en?: unknown;
  stats_zh?: unknown;
  stats_ja?: unknown;
  stats_en?: unknown;
  hero_image?: string;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface HomeAboutRecord {
  eyebrow_zh?: string;
  eyebrow_ja?: string;
  eyebrow_en?: string;
  title_zh?: string;
  title_ja?: string;
  title_en?: string;
  description_zh?: string;
  description_ja?: string;
  description_en?: string;
  points_zh?: unknown;
  points_ja?: unknown;
  points_en?: unknown;
  badge_value?: string;
  badge_label_zh?: string;
  badge_label_ja?: string;
  badge_label_en?: string;
  stats_zh?: unknown;
  stats_ja?: unknown;
  stats_en?: unknown;
  image?: string;
  image_alt_zh?: string;
  image_alt_ja?: string;
  image_alt_en?: string;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface AdvantageRecord {
  title_zh?: string;
  title_ja?: string;
  title_en?: string;
  description_zh?: string;
  description_ja?: string;
  description_en?: string;
  sort_order?: number;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface CooperationHighlightRecord {
  name_zh?: string;
  name_ja?: string;
  name_en?: string;
  role_zh?: string;
  role_ja?: string;
  role_en?: string;
  quote_zh?: string;
  quote_ja?: string;
  quote_en?: string;
  sort_order?: number;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface HomeSectionsView {
  companyName: string;
  locale: Locale;
  sections: Array<Record<string, unknown> & { key: string }>;
}
