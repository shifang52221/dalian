import type { Locale } from "../lib/i18n";

export interface SiteSettingsRecord {
  company_name_zh?: string;
  company_name_ja?: string;
  phone?: string;
  email?: string;
  address_zh?: string;
  address_ja?: string;
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
  title_zh?: string;
  title_ja?: string;
  description_zh?: string;
  description_ja?: string;
  primary_cta_label_zh?: string;
  primary_cta_label_ja?: string;
  primary_cta_href?: string;
  secondary_cta_label_zh?: string;
  secondary_cta_label_ja?: string;
  secondary_cta_href?: string;
  highlights_zh?: unknown;
  highlights_ja?: unknown;
  stats_zh?: unknown;
  stats_ja?: unknown;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface HomeAboutRecord {
  eyebrow_zh?: string;
  eyebrow_ja?: string;
  title_zh?: string;
  title_ja?: string;
  description_zh?: string;
  description_ja?: string;
  points_zh?: unknown;
  points_ja?: unknown;
  badge_value?: string;
  badge_label_zh?: string;
  badge_label_ja?: string;
  stats_zh?: unknown;
  stats_ja?: unknown;
  image_alt_zh?: string;
  image_alt_ja?: string;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface AdvantageRecord {
  title_zh?: string;
  title_ja?: string;
  description_zh?: string;
  description_ja?: string;
  sort_order?: number;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface CooperationHighlightRecord {
  name_zh?: string;
  name_ja?: string;
  role_zh?: string;
  role_ja?: string;
  quote_zh?: string;
  quote_ja?: string;
  sort_order?: number;
  is_published?: boolean;
  [key: string]: unknown;
}

export interface HomeSectionsView {
  companyName: string;
  locale: Locale;
  sections: Array<Record<string, unknown> & { key: string }>;
}
