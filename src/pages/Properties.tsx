// src/pages/properties.tsx
import { useEffect, useMemo, useState } from "react";
import { fetchListings, rm, type ListingLite } from "@/lib/publicListings";

// Demo fallback (so the page never looks empty on day 1)
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

type DemoCard = {
  id: string;
  slug: string;
  title: string;
  price: number;
  address?: string;
  city?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqft?: number;
  cover?: { url: string | null };
};

const DEMO: DemoCard[] = [
  {
    id: "demo-1",
    slug: "modern-luxury-villa",
    title: "Modern Luxury Villa",
    price: 1250000,
    address: "Beverly Hills, CA",
    bedrooms: 4,
    bathrooms: 3,
    sizeSqft: 3200,
    cover: { url: property1 },
  },
  {
    id: "demo-2",
    slug: "contemporary-family-home",
    title: "Contemporary Family Home",
    price: 850000,
    address: "Manhattan Beach, CA",
    bedrooms: 3,
    bathrooms: 2,
    sizeSqft: 2400,
    cover: { url: property2 },
  },
  {
    id: "demo-3",
    slug: "luxury-oceanfront-estate",
    title: "Luxury Oceanfront Estate",
    price: 2100000,
    address: "Malibu, CA",
    bedrooms: 5,
    bathrooms: 4,
    sizeSqft: 4500,
    cover: { url: property3 },
  },
];

export default function Properties() {
  const [items, setItems] = useState<ListingLite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings()
      .then((arr) => setItems(arr || []))
      .finally(() => setLoading(false));
  }, []);

  // if live items exist, use them; otherwise show the demo content
  const cards = useMemo(() => {
    if (items.length > 0) return items.map((x) => ({
      id: x.id, slug: x.slug, title: x.title, price: x.price,
      address: x.address, city: x.city, state: x.state,
      bedrooms: x.bedrooms ?? undefined, bathrooms: x.bathrooms ?? undefined, sizeSqft: x.sizeSqft ?? undefined,
      cover: x.cover,
    }) as DemoCard);
    return DEMO;
  }, [items]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="text-center mb-8">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Property Listings</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Discover Your Perfect Property</h1>
        <p className="text-muted-foreground mt-2">Browse our curated collection of premium properties in the most desirable locations.</p>
        <div className="mt-3 text-sm">{cards.length} properties found</div>
      </header>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((it) => (
          <article key={it.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
            <a href={`/properties/${it.slug}`} className="block">
              <img
                src={it.cover?.url || "/images/placeholder.jpg"}
                alt={it.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
            </a>
            <div className="p-4">
              <a href={`/properties/${it.slug}`} className="block">
                <h3 className="text-lg font-semibold leading-snug">{it.title}</h3>
              </a>
              <div className="mt-1 font-bold">{rm(it.price)}</div>
              <div className="text-sm text-muted-foreground">
                {[it.address, it.city, it.state].filter(Boolean).join(", ")}
              </div>
              <div className="mt-3 text-xs text-muted-foreground flex gap-4">
                {typeof it.bedrooms === "number" && <span>{it.bedrooms} beds</span>}
                {typeof it.bathrooms === "number" && <span>{it.bathrooms} baths</span>}
                {typeof it.sizeSqft === "number" && <span>{it.sizeSqft} sqft</span>}
              </div>
              <div className="mt-4 flex gap-2">
                <a href={`/properties/${it.slug}`} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm">View Details</a>
                <a href="/contact" className="px-3 py-2 rounded-lg border text-sm">Schedule Tour</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Subtle loading state (only shown before the first render) */}
      {loading && <p className="mt-8 text-center text-sm text-muted-foreground">Loading listings…</p>}
    </main>
  );
}
