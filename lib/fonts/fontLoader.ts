import { FontPairing } from "@/types/pairing";

export function loadFontPairing(pairing: FontPairing): void {
  if (typeof window === "undefined") return;

  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;

  // Create link elements for Google Fonts
  const primaryUrl = getGoogleFontsUrl(pairing.primary.family, [primaryWeight]);
  const secondaryUrl = getGoogleFontsUrl(pairing.secondary.family, [secondaryWeight]);

  loadFont(pairing.primary.family, primaryUrl);
  loadFont(pairing.secondary.family, secondaryUrl);
}

function loadFont(family: string, url: string): void {
  if (typeof window === "undefined") return;

  // Check if font is already loaded
  const existingLink = document.querySelector(
    `link[data-font-family="${family}"]`
  );
  if (existingLink) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.setAttribute("data-font-family", family);
  document.head.appendChild(link);
}

function getGoogleFontsUrl(fontFamily: string, weights: number[]): string {
  const familyParam = fontFamily.replace(/\s+/g, "+");
  const weightsParam = weights.join(";");
  return `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weightsParam}&display=swap`;
}

export function getFontFamilyCSS(family: string): string {
  return `font-family: '${family}', sans-serif;`;
}

export function preloadFont(family: string, weight: number = 400): void {
  if (typeof window === "undefined") return;

  const url = getGoogleFontsUrl(family, [weight]);
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "style";
  link.href = url;
  document.head.appendChild(link);
}

