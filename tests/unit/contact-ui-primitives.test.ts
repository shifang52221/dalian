import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("contact ui primitives", () => {
  it("wires the contact section to shared ui components", () => {
    const contactSection = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/ContactSection.astro"),
      "utf8",
    );

    expect(existsSync(resolve("f:/www/www13dalian/src/components/ui/button.tsx"))).toBe(true);
    expect(existsSync(resolve("f:/www/www13dalian/src/components/ui/card.tsx"))).toBe(true);
    expect(existsSync(resolve("f:/www/www13dalian/src/components/ui/input.tsx"))).toBe(true);
    expect(existsSync(resolve("f:/www/www13dalian/src/components/ui/textarea.tsx"))).toBe(true);
    expect(existsSync(resolve("f:/www/www13dalian/src/components/ui/label.tsx"))).toBe(true);

    expect(contactSection).toContain('../ui/button');
    expect(contactSection).toContain('../ui/card');
    expect(contactSection).toContain('../ui/input');
    expect(contactSection).toContain('../ui/textarea');
    expect(contactSection).toContain('../ui/label');
    expect(contactSection).toContain("<Card");
    expect(contactSection).toContain("<Button");
    expect(contactSection).toContain("<Input");
    expect(contactSection).toContain("<Textarea");
    expect(contactSection).toContain("<Label");
  });
});
