import { SavedPairing, FontPairing } from "@/types/pairing";

const STORAGE_KEY = "notmytype_saved_pairings";

export function savePairing(pairing: FontPairing, name?: string): string {
  if (typeof window === "undefined") {
    throw new Error("localStorage is only available in the browser");
  }

  const savedPairings = getSavedPairings();
  const id = `pairing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const savedPairing: SavedPairing = {
    id,
    pairing,
    timestamp: Date.now(),
    name: name || `${pairing.primary.family} + ${pairing.secondary.family}`,
  };

  savedPairings.push(savedPairing);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPairings));
  
  return id;
}

export function getSavedPairings(): SavedPairing[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as SavedPairing[];
  } catch (error) {
    console.error("Error reading saved pairings:", error);
    return [];
  }
}

export function getSavedPairing(id: string): SavedPairing | null {
  const savedPairings = getSavedPairings();
  return savedPairings.find((p) => p.id === id) || null;
}

export function deleteSavedPairing(id: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const savedPairings = getSavedPairings();
  const filtered = savedPairings.filter((p) => p.id !== id);
  
  if (filtered.length === savedPairings.length) {
    return false; // Pairing not found
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function clearSavedPairings(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}

