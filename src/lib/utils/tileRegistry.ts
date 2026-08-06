// Global registry for local panorama tile blob URLs
// Allows Marzipano viewer to render newly sliced tiles immediately without waiting for server deployment.

const tileBlobMap = new Map<string, string>();

/**
 * Register a blob URL for a specific tile key.
 * Key format examples:
 * - `${sceneId}/l${level}/${x}-${y}.jpg`
 * - `${sceneId}/${level}/${face}/${y}/${x}.jpg`
 * - `${sceneId}/preview.jpg`
 */
export function registerTileBlob(key: string, blobUrl: string): void {
  const normalizedKey = key.toLowerCase().replace(/\\/g, "/");
  tileBlobMap.set(normalizedKey, blobUrl);
}

/**
 * Register multiple tile blob URLs for a scene.
 */
export function registerTileBlobs(sceneId: string, blobs: Record<string, string>): void {
  for (const [subPath, url] of Object.entries(blobs)) {
    const key = `${sceneId}/${subPath}`.toLowerCase().replace(/\\/g, "/");
    tileBlobMap.set(key, url);
  }
}

/**
 * Look up a local blob URL for a given tile key.
 */
export function getTileBlobUrl(key: string): string | undefined {
  const normalizedKey = key.toLowerCase().replace(/\\/g, "/");
  return tileBlobMap.get(normalizedKey);
}

/**
 * Clear all cached tile blob URLs (revoking ObjectURLs to prevent memory leaks).
 */
export function clearTileBlobs(): void {
  for (const url of tileBlobMap.values()) {
    URL.revokeObjectURL(url);
  }
  tileBlobMap.clear();
}
