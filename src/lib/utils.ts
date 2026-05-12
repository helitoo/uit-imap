import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Tokenise a string into a set of lowercase bigrams for Jaccard similarity */
function normalizeVietnamese(str: string): string {
  if (!str || str.length === 0) return "";

  if (/^\d+$/.test(str)) return "";

  const normalized = str
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (/^\d+$/.test(normalized)) return "";

  return normalized;
}

export function compareTwoStrings(first: string, second: string): number {
  first = normalizeVietnamese(first);
  second = normalizeVietnamese(second);

  if (first === second) return 1; // identical or empty
  if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

  const firstBigrams = new Map<string, number>();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram)! + 1 : 1;

    firstBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram)! : 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

/** Euclidean distance in 3D */
export function euclidean3D(
  a: [number, number, number],
  b: [number, number, number],
): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
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
