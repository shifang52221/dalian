export type Locale = "zh" | "ja";

export function getLocaleUrl(pathname: string, locale: Locale) {
  const normalizedPath = normalizePath(pathname);
  const pathWithoutLocale = stripLocalePrefix(normalizedPath);

  if (locale === "zh") {
    return pathWithoutLocale;
  }

  if (pathWithoutLocale === "/") {
    return "/ja/";
  }

  return `/ja${pathWithoutLocale}`;
}

export function getNewsUrl(slug: string, locale: Locale) {
  return locale === "ja" ? `/ja/news/${slug}` : `/news/${slug}`;
}

function normalizePath(pathname: string) {
  if (!pathname) {
    return "/";
  }

  let normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized || "/";
}

function stripLocalePrefix(pathname: string) {
  if (pathname === "/ja") {
    return "/";
  }

  if (pathname.startsWith("/ja/")) {
    return pathname.slice(3) || "/";
  }

  return pathname;
}
