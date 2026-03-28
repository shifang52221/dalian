import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("premium ui foundation", () => {
  it("keeps the UI stack stable without the Tailwind dev transform chain", () => {
    const packageJson = JSON.parse(
      readFileSync(resolve("f:/www/www13dalian/package.json"), "utf8"),
    ) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const astroConfig = readFileSync(
      resolve("f:/www/www13dalian/astro.config.mjs"),
      "utf8",
    );
    const globalCss = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(packageJson.dependencies).toMatchObject({
      react: expect.any(String),
      "react-dom": expect.any(String),
    });
    expect(packageJson.devDependencies).toMatchObject({
      "@astrojs/react": expect.any(String),
      clsx: expect.any(String),
    });
    expect(packageJson.devDependencies?.["@tailwindcss/vite"]).toBeUndefined();
    expect(packageJson.devDependencies?.tailwindcss).toBeUndefined();
    expect(packageJson.devDependencies?.["tailwind-merge"]).toBeUndefined();

    expect(astroConfig).toContain('import react from "@astrojs/react"');
    expect(astroConfig).toContain("integrations: [react()]");
    expect(astroConfig).not.toContain("@tailwindcss/vite");
    expect(astroConfig).not.toContain("tailwindcss()");

    expect(globalCss).not.toContain('@import "tailwindcss";');
    expect(globalCss).not.toContain("@config");

    const utilsPath = resolve("f:/www/www13dalian/src/lib/utils.ts");
    expect(existsSync(utilsPath)).toBe(true);

    const utilsFile = readFileSync(utilsPath, "utf8");
    expect(utilsFile).toContain('from "clsx"');
    expect(utilsFile).toContain("export function cn");
    expect(utilsFile).not.toContain("tailwind-merge");

    const buttonFile = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/button.tsx"),
      "utf8",
    );
    const inputFile = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/input.tsx"),
      "utf8",
    );
    const textareaFile = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/textarea.tsx"),
      "utf8",
    );
    const cardFile = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/card.tsx"),
      "utf8",
    );
    const labelFile = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/label.tsx"),
      "utf8",
    );

    expect(buttonFile).toContain("ui-button");
    expect(inputFile).toContain("ui-input");
    expect(textareaFile).toContain("ui-textarea");
    expect(cardFile).toContain("ui-card");
    expect(labelFile).toContain("ui-label");
  });
});
