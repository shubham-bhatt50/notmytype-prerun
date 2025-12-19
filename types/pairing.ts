export type FontCategory = "serif" | "sans-serif" | "display" | "monospace" | "handwriting";

export type UseCaseTag = "modern" | "elegant" | "playful" | "corporate" | "editorial";

export interface GoogleFont {
  family: string;
  category: FontCategory;
  variants: string[];
  subsets: string[];
}

export interface FontPairing {
  id: string;
  primary: {
    family: string;
    weight?: number;
    style?: string;
  };
  secondary: {
    family: string;
    weight?: number;
    style?: string;
  };
  tags: UseCaseTag[];
  useCase?: string;
  previewContent?: {
    heading?: string;
    subheading?: string;
    body?: string;
    button?: string;
  };
}

export interface ComponentTemplate {
  id: string;
  name: string;
  content: Record<string, string | string[]>;
}

export type ValidationCheckType = 
  | "contrast"
  | "readability"
  | "harmony"
  | "hierarchy"
  | "component-stress";

export interface ValidationCheck {
  type: ValidationCheckType;
  passed: boolean;
  message: string;
  suggestion?: string;
}

export type ValidationScore = "excellent" | "acceptable" | "poor";

export interface ValidationResult {
  checks: ValidationCheck[];
  score: ValidationScore;
  warnings: number;
  errors: number;
}

export interface SavedPairing {
  id: string;
  pairing: FontPairing;
  timestamp: number;
  name?: string;
}

export interface ComponentPreviewProps {
  pairing: FontPairing;
  template: ComponentTemplate;
  theme?: "light" | "dark";
  viewport?: "mobile" | "desktop";
  useRealisticContent?: boolean;
}

