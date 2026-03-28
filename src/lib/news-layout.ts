import type { NewsItem } from "../content/fallback/news";

export function splitFeaturedNews(items: NewsItem[]) {
  const [featuredItem, ...archiveItems] = items;

  return {
    featuredItem,
    archiveItems,
  };
}
