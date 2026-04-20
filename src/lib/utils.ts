import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Tokenise a string into a set of lowercase bigrams for Jaccard similarity */
function toBigrams(text: string): Set<string> {
  const s = text.toLowerCase().replace(/\s+/g, " ").trim();
  const bigrams = new Set<string>();
  if (s.length === 0) return bigrams;
  if (s.length === 1) {
    bigrams.add(s);
    return bigrams;
  }
  for (let i = 0; i < s.length - 1; i++) {
    bigrams.add(s.slice(i, i + 2));
  }
  return bigrams;
}

/** Jaccard similarity between two strings based on bigrams */
export function jaccardSimilarity(a: string, b: string): number {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const setA = toBigrams(a);
  const setB = toBigrams(b);
  let intersection = 0;
  setA.forEach((bg) => { if (setB.has(bg)) intersection++; });
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

/** Euclidean distance in 3D */
export function euclidean3D(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

/** Euclidean distance in 2D (for real_position lat/lng) */
export function euclidean2D(a: [number, number], b: [number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

/** Get absolute URL for sharing */
export function getHotspotShareUrl(id: string): string {
  return `${window.location.origin}/hotspot/${id}`;
}
