"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontPairing } from "@/types/pairing";
import { decodePairingFromUrl } from "@/lib/utils/urlParams";
import { ComponentPreview } from "@/components/playground/ComponentPreview";
import { ComponentTabs } from "@/components/playground/ComponentTabs";
import { LivePreview } from "@/components/playground/LivePreview";
import { ValidationPanel } from "@/components/playground/ValidationPanel";
import { ExportPanel } from "@/components/playground/ExportPanel";
import { validatePairing } from "@/lib/validation/pairingValidator";
import { loadFontPairing } from "@/lib/fonts/fontLoader";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

export default function PairingDetailPage() {
  const params = useParams();
  const [pairing, setPairing] = useState<FontPairing | null>(null);
  const [selectedComponent, setSelectedComponent] = useState("product-card");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const decoded = decodePairingFromUrl(params.id);
      if (decoded) {
        setPairing(decoded);
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (pairing) {
      loadFontPairing(pairing);
    }
  }, [pairing]);

  if (!pairing) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pairing not found</h1>
          <Link href="/">
            <Button>Back to gallery</Button>
          </Link>
        </div>
      </main>
    );
  }

  const validation = validatePairing(pairing);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/" className="text-2xl font-bold text-neutral-900 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              not my type
            </Link>
            <h1 className="text-3xl font-bold mt-2 mb-1">
              {pairing.primary.family} + {pairing.secondary.family}
            </h1>
            <p className="text-neutral-600">Shared font pairing</p>
          </div>
          <Link href={`/playground?pairing=${params.id}`}>
            <Button>Edit in playground</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ValidationPanel validation={validation} />
            <ExportPanel pairing={pairing} />
          </div>

          {/* Right Column */}
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

