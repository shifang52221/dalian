import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function readSeedFile<T>(filename: string): T {
  return JSON.parse(
    readFileSync(resolve("f:/www/www13dalian/pocketbase/seed", filename), "utf8"),
  ) as T;
}

describe("expanded homepage seed data", () => {
  it("provides a structured hero seed record", () => {
    const records = readSeedFile<Array<Record<string, unknown>>>("home-hero.json");
    const hero = records[0] ?? {};

    expect(records.length).toBeGreaterThan(0);
    expect(hero.eyebrow_zh).toBeTruthy();
    expect(hero.eyebrow_ja).toBeTruthy();
    expect(hero.primary_cta_label_zh).toBeTruthy();
    expect(hero.primary_cta_label_ja).toBeTruthy();
    expect(hero.primary_cta_href).toBeTruthy();
    expect(Array.isArray(hero.highlights_zh)).toBe(true);
    expect(Array.isArray(hero.highlights_ja)).toBe(true);
    expect(Array.isArray(hero.stats_zh)).toBe(true);
    expect(Array.isArray(hero.stats_ja)).toBe(true);
  });

  it("provides a structured about seed record", () => {
    const records = readSeedFile<Array<Record<string, unknown>>>("home-about.json");
    const about = records[0] ?? {};

    expect(records.length).toBeGreaterThan(0);
    expect(about.title_zh).toBeTruthy();
    expect(about.title_ja).toBeTruthy();
    expect(Array.isArray(about.points_zh)).toBe(true);
    expect(Array.isArray(about.points_ja)).toBe(true);
    expect(Array.isArray(about.stats_zh)).toBe(true);
    expect(Array.isArray(about.stats_ja)).toBe(true);
  });

  it("provides repeatable records for advantages and cooperation highlights", () => {
    const advantages = readSeedFile<Array<Record<string, unknown>>>("advantages.json");
    const cooperation = readSeedFile<Array<Record<string, unknown>>>(
      "cooperation-highlights.json",
    );

    expect(advantages.length).toBeGreaterThanOrEqual(4);
    expect(cooperation.length).toBeGreaterThanOrEqual(3);
    expect(advantages.every((item) => typeof item.title_zh === "string")).toBe(true);
    expect(cooperation.every((item) => typeof item.quote_ja === "string")).toBe(true);
  });
});
