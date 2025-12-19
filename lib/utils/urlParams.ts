import { FontPairing } from "@/types/pairing";

export function encodePairingToUrl(pairing: FontPairing): string {
  const data = {
    p: pairing.primary.family,
    pw: pairing.primary.weight || 700,
    s: pairing.secondary.family,
    sw: pairing.secondary.weight || 400,
    t: pairing.tags.join(","),
  };

  return btoa(JSON.stringify(data));
}

export function decodePairingFromUrl(encoded: string): FontPairing | null {
  try {
    const data = JSON.parse(atob(encoded));
    
    return {
      id: `url_${Date.now()}`,
      primary: {
        family: data.p,
        weight: data.pw || 700,
      },
      secondary: {
        family: data.s,
        weight: data.sw || 400,
      },
      tags: data.t ? data.t.split(",") : [],
    };
  } catch (error) {
    console.error("Error decoding pairing from URL:", error);
    return null;
  }
}

export function getPairingFromUrlParams(): FontPairing | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("pairing");
  
  if (!encoded) {
    return null;
  }

  return decodePairingFromUrl(encoded);
}

export function createShareableUrl(pairing: FontPairing, baseUrl?: string): string {
  const encoded = encodePairingToUrl(pairing);
  const url = baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${url}/pairing/${encoded}`;
}

