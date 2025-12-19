"use client";

import { useState, useEffect } from "react";
import { FontPairing, GoogleFont, FontCategory } from "@/types/pairing";
import { Card } from "@/components/shared/Card";
import {
  fetchGoogleFonts,
  filterFontsByCategory,
  searchFonts,
  getPopularFonts,
} from "@/lib/fonts/googleFonts";

interface FontSelectorProps {
  pairing: FontPairing;
  onPairingChange: (pairing: FontPairing) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  pairing,
  onPairingChange,
}) => {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FontCategory | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      try {
        const allFonts = await fetchGoogleFonts();
        setFonts(allFonts);
      } catch (error) {
        console.error("Error loading fonts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFonts();
  }, []);

  const filteredFonts = searchQuery
    ? searchFonts(filterFontsByCategory(fonts, selectedCategory), searchQuery)
    : filterFontsByCategory(fonts, selectedCategory);

  const popularFonts = getPopularFonts(fonts, 10);

  const updatePairing = (field: "primary" | "secondary", family: string) => {
    onPairingChange({
      ...pairing,
      [field]: {
        ...pairing[field],
        family,
      },
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Font selection</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search fonts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border border-neutral-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "serif", "sans-serif", "display", "monospace"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === cat
                ? "bg-primary-500 text-white"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Primary Font Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Primary (headings)</label>
        <select
          value={pairing.primary.family}
          onChange={(e) => updatePairing("primary", e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          style={{ fontFamily: pairing.primary.family }}
        >
          {filteredFonts.length > 0 ? (
            filteredFonts.slice(0, 50).map((font) => (
              <option key={font.family} value={font.family}>
                {font.family}
              </option>
            ))
          ) : (
            <option value={pairing.primary.family}>{pairing.primary.family}</option>
          )}
        </select>
      </div>

      {/* Secondary Font Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Secondary (body)</label>
        <select
          value={pairing.secondary.family}
          onChange={(e) => updatePairing("secondary", e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          style={{ fontFamily: pairing.secondary.family }}
        >
          {filteredFonts.length > 0 ? (
            filteredFonts.slice(0, 50).map((font) => (
              <option key={font.family} value={font.family}>
                {font.family}
              </option>
            ))
          ) : (
            <option value={pairing.secondary.family}>{pairing.secondary.family}</option>
          )}
        </select>
      </div>

      {loading && <p className="text-sm text-neutral-500 mt-4">Loading fonts...</p>}
    </Card>
  );
};

