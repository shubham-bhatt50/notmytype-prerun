import { FontPairing, ValidationResult, ValidationCheck, ValidationScore } from "@/types/pairing";

// Font categories that are typically decorative/display
const DECORATIVE_CATEGORIES = ["display", "handwriting"];
const SERIF_CATEGORIES = ["serif"];
const SANS_SERIF_CATEGORIES = ["sans-serif"];

// Popular fonts that are known to be readable
const READABLE_FONTS = [
  "Open Sans",
  "Roboto",
  "Lato",
  "Montserrat",
  "Poppins",
  "Inter",
  "Source Sans Pro",
  "Nunito",
  "Work Sans",
  "Merriweather",
  "Lora",
  "Crimson Pro",
  "Libre Franklin",
  "Karla",
];

export function validatePairing(pairing: FontPairing): ValidationResult {
  const checks: ValidationCheck[] = [
    checkContrast(pairing),
    checkReadability(pairing),
    checkHarmony(pairing),
    checkHierarchy(pairing),
    checkComponentStress(pairing),
  ];

  const passed = checks.filter((c) => c.passed).length;
  const warnings = checks.filter((c) => !c.passed).length;
  const errors = checks.filter((c) => !c.passed && c.type === "readability").length;

  let score: ValidationScore = "excellent";
  if (warnings >= 3) {
    score = "poor";
  } else if (warnings >= 1) {
    score = "acceptable";
  }

  return {
    checks,
    score,
    warnings,
    errors,
  };
}

function checkContrast(pairing: FontPairing): ValidationCheck {
  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;
  const weightDiff = Math.abs(primaryWeight - secondaryWeight);

  // Check if fonts are too similar in weight
  if (weightDiff < 200 && pairing.primary.family === pairing.secondary.family) {
    return {
      type: "contrast",
      passed: false,
      message: "Primary and secondary fonts are too similar in weight",
      suggestion: "Increase the weight difference or use different font families",
    };
  }

  // Check if both are the same family with similar weights
  if (
    pairing.primary.family === pairing.secondary.family &&
    weightDiff < 300
  ) {
    return {
      type: "contrast",
      passed: false,
      message: "Both fonts are the same family with similar weights",
      suggestion: "Use different font families for better contrast",
    };
  }

  return {
    type: "contrast",
    passed: true,
    message: "Fonts have good contrast in weight and style",
  };
}

function checkReadability(pairing: FontPairing): ValidationCheck {
  const secondaryFont = pairing.secondary.family.toLowerCase();

  // Check if body font is known to be readable
  const isReadable = READABLE_FONTS.some((font) =>
    secondaryFont.includes(font.toLowerCase())
  );

  // Check if body font is a display/decorative font (bad for readability)
  const isDecorative = DECORATIVE_CATEGORIES.some((cat) =>
    secondaryFont.includes(cat)
  );

  if (isDecorative) {
    return {
      type: "readability",
      passed: false,
      message: "Body font may have poor readability (decorative/display font)",
      suggestion: "Use a serif or sans-serif font for body text",
    };
  }

  if (!isReadable && secondaryFont.includes("display")) {
    return {
      type: "readability",
      passed: false,
      message: "Body font may have readability issues",
      suggestion: "Consider using a proven readable font like Open Sans or Roboto",
    };
  }

  return {
    type: "readability",
    passed: true,
    message: "Body font has good readability characteristics",
  };
}

function checkHarmony(pairing: FontPairing): ValidationCheck {
  const primaryLower = pairing.primary.family.toLowerCase();
  const secondaryLower = pairing.secondary.family.toLowerCase();

  // Check if both are decorative (usually clashes)
  const primaryIsDecorative = DECORATIVE_CATEGORIES.some((cat) =>
    primaryLower.includes(cat)
  );
  const secondaryIsDecorative = DECORATIVE_CATEGORIES.some((cat) =>
    secondaryLower.includes(cat)
  );

  if (primaryIsDecorative && secondaryIsDecorative) {
    return {
      type: "harmony",
      passed: false,
      message: "Both fonts are decorative and may clash stylistically",
      suggestion: "Pair a decorative font with a simple serif or sans-serif",
    };
  }

  // Check if both are very different styles (e.g., script + monospace)
  const primaryIsScript = primaryLower.includes("script") || primaryLower.includes("handwriting");
  const secondaryIsMonospace = secondaryLower.includes("mono");

  if (primaryIsScript && secondaryIsMonospace) {
    return {
      type: "harmony",
      passed: false,
      message: "Fonts have conflicting styles",
      suggestion: "Choose fonts that complement each other stylistically",
    };
  }

  return {
    type: "harmony",
    passed: true,
    message: "Fonts work well together stylistically",
  };
}

function checkHierarchy(pairing: FontPairing): ValidationCheck {
  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;
  const weightDiff = primaryWeight - secondaryWeight;

  // Heading should be heavier than body
  if (weightDiff <= 0 && pairing.primary.family === pairing.secondary.family) {
    return {
      type: "hierarchy",
      passed: false,
      message: "Heading font is not distinct enough from body font",
      suggestion: "Use a heavier weight or different font family for headings",
    };
  }

  // If same family, ensure sufficient weight difference
  if (pairing.primary.family === pairing.secondary.family && weightDiff < 200) {
    return {
      type: "hierarchy",
      passed: false,
      message: "Insufficient weight difference for clear hierarchy",
      suggestion: "Increase weight difference (e.g., 400 to 700)",
    };
  }

  return {
    type: "hierarchy",
    passed: true,
    message: "Clear visual hierarchy between heading and body fonts",
  };
}

function checkComponentStress(pairing: FontPairing): ValidationCheck {
  const primaryLower = pairing.primary.family.toLowerCase();
  const secondaryLower = pairing.secondary.family.toLowerCase();

  // Check if fonts work in compact spaces
  const primaryIsCondensed = primaryLower.includes("condensed") || primaryLower.includes("narrow");
  const secondaryIsCondensed = secondaryLower.includes("condensed") || secondaryLower.includes("narrow");

  // Very wide or decorative fonts may not work well in cards
  const primaryIsWide = primaryLower.includes("wide") || primaryLower.includes("extended");
  const secondaryIsWide = secondaryLower.includes("wide") || secondaryLower.includes("extended");

  if ((primaryIsWide || secondaryIsWide) && !primaryIsCondensed && !secondaryIsCondensed) {
    return {
      type: "component-stress",
      passed: false,
      message: "Fonts may not work well in compact component layouts",
      suggestion: "Test in product cards and pricing tables to ensure readability",
    };
  }

  // Check if both fonts are very heavy (may crowd components)
  const primaryWeight = pairing.primary.weight || 700;
  const secondaryWeight = pairing.secondary.weight || 400;

  if (primaryWeight >= 700 && secondaryWeight >= 600) {
    return {
      type: "component-stress",
      passed: false,
      message: "Both fonts are heavy and may crowd compact components",
      suggestion: "Use a lighter weight for body text in components",
    };
  }

  return {
    type: "component-stress",
    passed: true,
    message: "Fonts should work well in component layouts",
  };
}

