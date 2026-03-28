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

export interface HomeSectionsView {
  companyName: string;
  locale: Locale;
  sections: Array<Record<string, unknown> & { key: string }>;
}
