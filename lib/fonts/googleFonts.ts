import { GoogleFont, FontCategory } from "@/types/pairing";

const GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "";

let cachedFonts: GoogleFont[] | null = null;

export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  if (cachedFonts) {
    return cachedFonts;
  }

  try {
    const url = `${GOOGLE_FONTS_API}?key=${API_KEY}&sort=popularity`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch Google Fonts");
    }

    const data = await response.json();
    cachedFonts = data.items.map((font: any) => ({
      family: font.family,
      category: mapCategory(font.category),
      variants: font.variants,
      subsets: font.subsets,
    }));

    return cachedFonts;
  } catch (error) {
    console.error("Error fetching Google Fonts:", error);
    // Return a fallback list of popular fonts
    return getFallbackFonts();
  }
}

function mapCategory(category: string): FontCategory {
  const categoryMap: Record<string, FontCategory> = {
    serif: "serif",
    "sans-serif": "sans-serif",
    display: "display",
    monospace: "monospace",
    handwriting: "handwriting",
  };
  return categoryMap[category] || "sans-serif";
}

export function filterFontsByCategory(
  fonts: GoogleFont[],
  category: FontCategory | "all"
): GoogleFont[] {
  if (category === "all") {
    return fonts;
  }
  return fonts.filter((font) => font.category === category);
}

export function searchFonts(fonts: GoogleFont[], query: string): GoogleFont[] {
  if (!query.trim()) {
    return fonts;
  }
  const lowerQuery = query.toLowerCase();
  return fonts.filter((font) =>
    font.family.toLowerCase().includes(lowerQuery)
  );
}

export function getPopularFonts(fonts: GoogleFont[], limit: number = 20): GoogleFont[] {
  // Popular fonts are typically at the top of the API response when sorted by popularity
  return fonts.slice(0, limit);
}

function getFallbackFonts(): GoogleFont[] {
  // Fallback list of popular Google Fonts
  return [
    { family: "Roboto", category: "sans-serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Open Sans", category: "sans-serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Lato", category: "sans-serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Montserrat", category: "sans-serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Poppins", category: "sans-serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Raleway", category: "sans-serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Playfair Display", category: "serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Merriweather", category: "serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Lora", category: "serif", variants: ["400", "700"], subsets: ["latin"] },
    { family: "Crimson Pro", category: "serif", variants: ["400", "700"], subsets: ["latin"] },
  ];
}

export function getGoogleFontsUrl(fontFamily: string, weights: number[] = [400, 700]): string {
  const familyParam = fontFamily.replace(/\s+/g, "+");
  const weightsParam = weights.join(",");
  return `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weightsParam}&display=swap`;
}

