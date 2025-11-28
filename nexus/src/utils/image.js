export function toImageSrc(raw) {
  if (!raw) return "";
  // Already absolute or data/blob URL
  if (
    /^https?:\/\//i.test(raw) ||
    raw.startsWith("data:") ||
    raw.startsWith("blob:")
  ) {
    return raw;
  }
  // Ensure leading slash for relative media paths
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const base = process.env.NEXT_PUBLIC_URL || "";
  // If no base provided, return relative path (Next/Image allows leading slash)
  if (!base) return withSlash;
  // Otherwise combine base + relative path
  return `${base}${withSlash}`;
}
