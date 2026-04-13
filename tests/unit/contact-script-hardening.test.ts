import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("contact script hardening", () => {
  it("removes the inline contact form script from the contact section", () => {
    const contactSection = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/ContactSection.astro"),
      "utf8",
    );

    expect(contactSection).not.toContain("<script is:inline>");
  });

  it("moves contact form handling into the shared site effects script", () => {
    const script = readFileSync(
      resolve("f:/www/www13dalian/src/scripts/site-effects.js"),
      "utf8",
    );

    expect(script).toContain('[data-contact-form]');
    expect(script).toContain('[data-contact-status]');
    expect(script).toContain('fetch("/api/contact"');
    expect(script).toContain("form.reset()");
  });
});
