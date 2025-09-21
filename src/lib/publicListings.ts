// src/lib/publicListings.ts
export type ListingLite = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  price: number;
  currency: "RM";
  address?: string;
  city?: string;
  state?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  sizeSqft?: number | null;
  cover?: { url: string | null };
  createdAt: string;
  status?: string;
};

export async function fetchListings(): Promise<ListingLite[]> {
  const r = await fetch("/lovable-uploads/listings/index.json", { cache: "no-store" });
  if (!r.ok) return [];
  const arr = (await r.json()) as ListingLite[];
  return (arr || []).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function fetchListingBySlug(slug: string) {
  const r = await fetch("/lovable-uploads/listings/index.json", { cache: "no-store" });
  const index = (await r.json()) as ListingLite[];
  const hit = (index || []).find((x) => x.slug === slug);
  if (!hit) throw new Error("Not found");
  const r2 = await fetch(`/lovable-uploads/listings/by-id/${hit.id}.json`, { cache: "no-store" });
  return r2.json();
}

export function rm(n: number) {
  try { return `RM ${Number(n || 0).toLocaleString()}`; } catch { return `RM ${n}`; }
}
