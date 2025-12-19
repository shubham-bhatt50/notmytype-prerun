"use client";

import { useState, useMemo } from "react";
import { PairingCard } from "@/components/gallery/PairingCard";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { curatedPairings } from "@/lib/fonts/curatedPairings";
import { UseCaseTag } from "@/types/pairing";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<UseCaseTag | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPairings = useMemo(() => {
    let filtered = curatedPairings;

    // Filter by tag
    if (selectedTag !== "all") {
      filtered = filtered.filter((pairing) =>
        pairing.tags.includes(selectedTag)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pairing) =>
          pairing.primary.family.toLowerCase().includes(query) ||
          pairing.secondary.family.toLowerCase().includes(query) ||
          pairing.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedTag, searchQuery]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center justify-between mb-12 flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-[30px] font-extrabold text-neutral-900 mb-2 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              not my type
            </h1>
            <p className="text-[15px] sm:text-xl text-neutral-600">
              Typography pairing tool for designers
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <Link href="/playground">
              <Button>Start building</Button>
            </Link>
            <Link href="/saved">
              <Button variant="outline">View saved</Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-0 mb-8 items-start sm:items-center justify-between">
          <GalleryFilters
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
          />
          <div className="flex-1 sm:max-w-xs">
            <input
              type="text"
              placeholder="Search fonts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPairings.map((pairing) => (
            <PairingCard key={pairing.id} pairing={pairing} />
          ))}
        </div>

        {filteredPairings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No pairings found for this filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}
