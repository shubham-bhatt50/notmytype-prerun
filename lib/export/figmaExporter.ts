import { FontPairing } from "@/types/pairing";

export interface FigmaFontStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle?: string;
  lineHeight?: number;
  letterSpacing?: number;
}

export function generateFigmaJSON(pairing: FontPairing): string {
  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;

  const styles = {
    heading: {
      fontFamily: pairing.primary.family,
      fontSize: 48,
      fontWeight: primaryWeight,
      lineHeight: 1.2,
      letterSpacing: -0.02,
    },
    subheading: {
      fontFamily: pairing.primary.family,
      fontSize: 32,
      fontWeight: primaryWeight,
      lineHeight: 1.3,
      letterSpacing: -0.01,
    },
    body: {
      fontFamily: pairing.secondary.family,
      fontSize: 16,
      fontWeight: secondaryWeight,
      lineHeight: 1.6,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: pairing.secondary.family,
      fontSize: 14,
      fontWeight: secondaryWeight,
      lineHeight: 1.5,
      letterSpacing: 0.01,
    },
  };

  return JSON.stringify(
    {
      name: `${pairing.primary.family} + ${pairing.secondary.family}`,
      description: "Typography pairing exported from NotMyType",
      styles,
      pairing: {
        primary: {
          family: pairing.primary.family,
          weight: primaryWeight,
        },
        secondary: {
          family: pairing.secondary.family,
          weight: secondaryWeight,
        },
      },
    },
    null,
    2
  );
}

