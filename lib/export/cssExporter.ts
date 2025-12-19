import { FontPairing } from "@/types/pairing";
import { getGoogleFontsUrl } from "@/lib/fonts/googleFonts";

export function generateCSS(pairing: FontPairing): string {
  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;

  const primaryUrl = getGoogleFontsUrl(pairing.primary.family, [primaryWeight]);
  const secondaryUrl = getGoogleFontsUrl(pairing.secondary.family, [secondaryWeight]);

  return `/* Import Google Fonts */
@import url('${primaryUrl}');
@import url('${secondaryUrl}');

/* CSS Variables */
:root {
  --font-heading: '${pairing.primary.family}', sans-serif;
  --font-body: '${pairing.secondary.family}', sans-serif;
  --font-heading-weight: ${primaryWeight};
  --font-body-weight: ${secondaryWeight};
}

/* Usage Examples */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-heading-weight);
}

body, p, span, div {
  font-family: var(--font-body);
  font-weight: var(--font-body-weight);
}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

export function generateGoogleFontsLink(pairing: FontPairing): string {
  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;

  const primaryFamily = pairing.primary.family.replace(/\s+/g, "+");
  const secondaryFamily = pairing.secondary.family.replace(/\s+/g, "+");

  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${primaryFamily}:wght@${primaryWeight}&family=${secondaryFamily}:wght@${secondaryWeight}&display=swap" rel="stylesheet">`;
}

