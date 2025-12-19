"use client";

import { useState, useEffect } from "react";
import { FontPairing } from "@/types/pairing";
import { getPairingFromUrlParams } from "@/lib/utils/urlParams";
import { FontSelector } from "@/components/playground/FontSelector";
import { LivePreview } from "@/components/playground/LivePreview";
import { ComponentPreview } from "@/components/playground/ComponentPreview";
import { ComponentTabs } from "@/components/playground/ComponentTabs";
import { ValidationPanel } from "@/components/playground/ValidationPanel";
import { ExportPanel } from "@/components/playground/ExportPanel";
import { validatePairing } from "@/lib/validation/pairingValidator";
import { loadFontPairing } from "@/lib/fonts/fontLoader";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

export default function PlaygroundPage() {
  const [pairing, setPairing] = useState<FontPairing>({
    id: "custom",
    primary: { family: "Inter", weight: 700 },
    secondary: { family: "Inter", weight: 400 },
    tags: [],
  });
  const [selectedComponent, setSelectedComponent] = useState("product-card");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const urlPairing = getPairingFromUrlParams();
    if (urlPairing) {
      setPairing(urlPairing);
    }
  }, []);

  useEffect(() => {
    loadFontPairing(pairing);
  }, [pairing]);

  const validation = validatePairing(pairing);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/" className="text-2xl font-bold text-neutral-900 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              not my type
            </Link>
            <p className="text-sm text-neutral-600 mt-1">
              Custom pairing builder
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to gallery</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Font Selector */}
          <div className="lg:col-span-1">
            <FontSelector pairing={pairing} onPairingChange={setPairing} />
            <div className="mt-6">
              <ValidationPanel validation={validation} />
            </div>
            <div className="mt-6">
              <ExportPanel pairing={pairing} />
            </div>
          </div>

          {/* Right Column - Preview Area */}
          <div className="lg:col-span-2 space-y-6">
            <ComponentTabs
              selectedComponent={selectedComponent}
              onComponentChange={setSelectedComponent}
            />
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Component preview</h2>
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="px-4 py-2 text-sm rounded-lg bg-neutral-200 hover:bg-neutral-300 transition-colors"
                >
                  {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
              </div>
              <ComponentPreview
                pairing={pairing}
                componentId={selectedComponent}
                theme={theme}
              />
            </div>
            <LivePreview pairing={pairing} theme={theme} />
          </div>
        </div>
      </div>
    </main>
  );
}

