"use client";

import { useState, useEffect } from "react";
import { SavedPairing } from "@/types/pairing";
import { getSavedPairings, deleteSavedPairing } from "@/lib/storage/localStorage";
import { PairingCard } from "@/components/gallery/PairingCard";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const [savedPairings, setSavedPairings] = useState<SavedPairing[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSavedPairings(getSavedPairings());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this pairing?")) {
      deleteSavedPairing(id);
      setSavedPairings(getSavedPairings());
    }
  };

  const handleTryPairing = (pairing: SavedPairing) => {
    const encoded = btoa(JSON.stringify({
      p: pairing.pairing.primary.family,
      pw: pairing.pairing.primary.weight || 700,
      s: pairing.pairing.secondary.family,
      sw: pairing.pairing.secondary.weight || 400,
    }));
    router.push(`/playground?pairing=${encoded}`);
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold text-neutral-900 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            not my type
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Saved pairings</h1>
          <p className="text-neutral-600">
            Your collection of font pairings
          </p>
        </div>

        {savedPairings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-500 mb-4">
              No saved pairings yet. Find your type.
            </p>
            <Link href="/playground">
              <Button>Start building</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {savedPairings.map((saved) => (
              <div key={saved.id} className="relative">
                <PairingCard pairing={saved.pairing} />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleTryPairing(saved)}
                    className="px-3 py-1 text-xs bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(saved.id)}
                    className="px-3 py-1 text-xs bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                  >
                    Delete
                  </button>
                </div>
                {saved.name && (
                  <p className="text-xs text-neutral-500 mt-2">{saved.name}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

