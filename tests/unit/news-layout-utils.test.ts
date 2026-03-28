import { describe, expect, it } from "vitest";
import { splitFeaturedNews } from "../../src/lib/news-layout";

describe("splitFeaturedNews", () => {
  it("keeps a single news item as featured without duplicating it into the archive", () => {
    const item = {
      slug: "single-entry",
      date: "2026-03-25",
      title: "Single entry",
      summary: "Only one news item is available.",
      content: ["Only one news item is available."],
    };

    const result = splitFeaturedNews([item]);

    expect(result.featuredItem).toEqual(item);
    expect(result.archiveItems).toEqual([]);
  });

  it("moves remaining news items into the archive list", () => {
    const first = {
      slug: "featured-entry",
      date: "2026-03-25",
      title: "Featured entry",
      summary: "Primary item.",
      content: ["Primary item."],
    };
    const second = {
      slug: "archive-entry",
      date: "2026-03-24",
      title: "Archive entry",
      summary: "Secondary item.",
      content: ["Secondary item."],
    };

    const result = splitFeaturedNews([first, second]);

    expect(result.featuredItem).toEqual(first);
    expect(result.archiveItems).toEqual([second]);
  });
});
