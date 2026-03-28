import { describe, expect, it } from "vitest";
import { getImageManifest } from "../../src/content/image-manifest";

describe("image manifest", () => {
  it("provides homepage imagery slots", () => {
    const manifest = getImageManifest();

    expect(manifest.heroSpotlight.src).toContain("horl.webp");
    expect(manifest.gallery.length).toBe(6);
  });
});
