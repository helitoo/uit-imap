import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeVietnamese(str: string): string {
  if (!str) return "";

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str: string): string[] {
  return normalizeVietnamese(str).split(" ");
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function levenshteinSimilarity(a: string, b: string): number {
  const distance = levenshtein(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}

function isSubsequence(short: string, long: string): boolean {
  let i = 0;
  let j = 0;

  while (i < short.length && j < long.length) {
    if (short[i] === long[j]) i++;
    j++;
  }

  return i === short.length;
}

export function compareTwoStrings(a: string, b: string): number {
  const s1 = normalizeVietnamese(a);
  const s2 = normalizeVietnamese(b);

  if (!s1 || !s2) return 0;

  if (s1 === s2) return 1;

  // INCLUDE cực mạnh
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.95;
  }

  const tokens1 = tokenize(s1);
  const tokens2 = tokenize(s2);

  // token overlap
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  let overlap = 0;

  for (const t of set1) {
    if (set2.has(t)) overlap++;
  }

  const tokenScore = overlap / Math.max(set1.size, set2.size);

  // subsequence score
  let subseqScore = 0;

  if (isSubsequence(s1, s2) || isSubsequence(s2, s1)) {
    subseqScore = 0.8;
  }

  // typo similarity
  const levScore = levenshteinSimilarity(s1, s2);

  // weighted hybrid
  return Math.max(tokenScore * 0.5 + levScore * 0.5, subseqScore);
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
// export function getHotspotShareUrl(id: string): string {
//   return `${window.location.origin}/hotspot/${id}`;
// }

// export function getSceneShareUrl(id: string): string {
//   return `${window.location.origin}/scene/${id}`;
// }
