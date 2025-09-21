// src/pages/PropertyDetails.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchListingBySlug, rm } from "@/lib/publicListings";

// Demo fallback (mirrors the cards so links always work)
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

type Detail = {
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
  gallery?: { url: string }[];
};

const DEMO: Detail[] = [
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
    gallery: [{ url: property1 }],
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
    gallery: [{ url: property2 }],
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
    gallery: [{ url: property3 }],
  },
];

export default function PropertyDetails() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  // load live data if the slug matches a saved item
  useEffect(() => {
    let mounted = true;
    if (!slug) { setLoading(false); return; }
    fetchListingBySlug(slug)
      .then((full) => {
        if (!mounted || !full) return;
        setData({
          id: full.id,
          slug: full.slug,
          title: full.title,
          price: Number(full.price || 0),
          address: full.address,
          city: full.city,
          state: full.state,
          bedrooms: full.bedrooms ?? undefined,
          bathrooms: full.bathrooms ?? undefined,
          sizeSqft: full.sizeSqft ?? undefined,
          cover: full.cover,
          gallery: Array.isArray(full.gallery) ? full.gallery : (full.cover?.url ? [{ url: full.cover.url }] : []),
        });
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [slug]);

  // pick demo if no live data found
  const fallback = useMemo(() => DEMO.find((d) => d.slug === slug) || DEMO[0], [slug]);
  const show = data || fallback;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-muted-foreground hover:underline">
        ← Back
      </button>

      <h1 className="text-2xl md:text-3xl font-bold">{show.title}</h1>
      <div className="text-lg font-semibold mt-1">{rm(show.price)}</div>
      <div className="text-muted-foreground">
        {[show.address, show.city, show.state].filter(Boolean).join(", ")}
      </div>

      {/* Gallery */}
      <section className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {(show.gallery || []).map((g, i) => (
          <img key={i} src={g.url} alt="" className="w-full h-48 object-cover rounded-xl bg-muted" />
        ))}
        {(show.gallery || []).length === 0 && (
          <img src={show.cover?.url || "/images/placeholder.jpg"} alt="" className="w-full h-64 object-cover rounded-xl bg-muted col-span-2 md:col-span-3" />
        )}
      </section>

      {/* Facts */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {typeof show.bedrooms === "number" && (
          <div className="rounded-xl border p-3">
            <div className="text-muted-foreground">Bedrooms</div>
            <div className="font-semibold">{show.bedrooms}</div>
          </div>
        )}
        {typeof show.bathrooms === "number" && (
          <div className="rounded-xl border p-3">
            <div className="text-muted-foreground">Bathrooms</div>
            <div className="font-semibold">{show.bathrooms}</div>
          </div>
        )}
        {typeof show.sizeSqft === "number" && (
          <div className="rounded-xl border p-3">
            <div className="text-muted-foreground">Size (sqft)</div>
            <div className="font-semibold">{show.sizeSqft}</div>
          </div>
        )}
      </section>

      {loading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}
    </main>
  );
}
