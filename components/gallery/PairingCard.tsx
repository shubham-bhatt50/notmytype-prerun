"use client";

import { FontPairing } from "@/types/pairing";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useRouter } from "next/navigation";
import { loadFontPairing } from "@/lib/fonts/fontLoader";
import { useEffect } from "react";

interface PairingCardProps {
  pairing: FontPairing;
}

export const PairingCard: React.FC<PairingCardProps> = ({ pairing }) => {
  const router = useRouter();

  useEffect(() => {
    loadFontPairing(pairing);
  }, [pairing]);

  const handleTryPairing = () => {
    const encoded = btoa(JSON.stringify({
      p: pairing.primary.family,
      pw: pairing.primary.weight || 700,
      s: pairing.secondary.family,
      sw: pairing.secondary.weight || 400,
    }));
    router.push(`/playground?pairing=${encoded}`);
  };

  const previewContent = pairing.previewContent || {
    heading: "Sample Heading",
    subheading: "Sample Subheading",
    body: "This is sample body text to preview the font pairing.",
    button: "Try This Pairing",
  };

  return (
    <Card hover className="p-6 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          {pairing.primary.family}
        </h3>
        <p className="text-sm text-neutral-600">+ {pairing.secondary.family}</p>
      </div>

      <div
        className="mb-4 space-y-3 flex-1"
        style={{
          fontFamily: `'${pairing.secondary.family}', sans-serif`,
        }}
      >
        <h1
          className="text-2xl font-bold"
          style={{
            fontFamily: `'${pairing.primary.family}', sans-serif`,
            fontWeight: pairing.primary.weight || 700,
          }}
        >
          {previewContent.heading}
        </h1>
        {previewContent.subheading && (
          <h2
            className="text-lg"
            style={{
              fontFamily: `'${pairing.primary.family}', sans-serif`,
              fontWeight: pairing.primary.weight || 700,
            }}
          >
            {previewContent.subheading}
          </h2>
        )}
        <p className="text-sm text-neutral-700 leading-relaxed">
          {previewContent.body}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {pairing.tags.map((tag) => (
          <Badge key={tag} variant={tag}>
            {tag}
          </Badge>
        ))}
      </div>

      <Button 
        onClick={handleTryPairing} 
        variant="outline" 
        className="w-full border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 focus:ring-neutral-400"
      >
        Try this pairing
      </Button>
    </Card>
  );
};

