"use client";

import { FontPairing } from "@/types/pairing";
import { Card } from "@/components/shared/Card";

interface LivePreviewProps {
  pairing: FontPairing;
  theme: "light" | "dark";
}

export const LivePreview: React.FC<LivePreviewProps> = ({ pairing, theme }) => {
  const bgColor = theme === "light" ? "bg-white" : "bg-neutral-900";
  const textColor = theme === "light" ? "text-neutral-900" : "text-neutral-100";

  return (
    <Card className={`p-8 ${bgColor} ${textColor}`}>
      <h2 className="text-xl font-semibold mb-6">Live preview</h2>
      
      <div className="space-y-6">
        {/* Hero Headline (H1) */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Hero headline (H1)</label>
          <h1
            className="text-5xl font-bold"
            style={{
              fontFamily: `'${pairing.primary.family}', sans-serif`,
              fontWeight: pairing.primary.weight || 700,
            }}
          >
            Transform Your Digital Experience
          </h1>
        </div>

        {/* Subheading (H2) */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Subheading (H2)</label>
          <h2
            className="text-3xl"
            style={{
              fontFamily: `'${pairing.primary.family}', sans-serif`,
              fontWeight: pairing.primary.weight || 700,
            }}
          >
            Build beautiful, responsive interfaces
          </h2>
        </div>

        {/* Body Paragraph */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Body paragraph</label>
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: `'${pairing.secondary.family}', sans-serif`,
              fontWeight: pairing.secondary.weight || 400,
            }}
          >
            This is sample body text to preview how the font pairing looks in longer form content. 
            The secondary font should be highly readable and comfortable for extended reading. 
            Notice how it pairs with the primary font used for headings.
          </p>
        </div>

        {/* Button/CTA */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Button/CTA</label>
          <button
            className="px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            style={{
              fontFamily: `'${pairing.secondary.family}', sans-serif`,
            }}
          >
            Get started free
          </button>
        </div>

        {/* Caption/Small Text */}
        <div>
          <label className="text-xs text-neutral-500 mb-2 block">Caption/small text</label>
          <p
            className="text-sm text-neutral-500"
            style={{
              fontFamily: `'${pairing.secondary.family}', sans-serif`,
              fontWeight: pairing.secondary.weight || 400,
            }}
          >
            This is caption text, typically used for metadata, labels, or secondary information.
          </p>
        </div>
      </div>
    </Card>
  );
};

