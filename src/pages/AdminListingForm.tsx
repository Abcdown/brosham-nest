import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Admin Listing Form
// - Route suggestion: /admin/listings/new
// - Uses existing Admin API key in localStorage (BP_API_KEY)
// - Pulls images from GET /api/list.php?key=… (same as Admin Upload)
// - On save: POST /api/listing-save.php?key=… with JSON payload
//   (PHP sample for listing-save.php is included in the chat message)
// - Styling with Tailwind + shadcn/ui

const API_BASE = "https://staging.broshamproperties.my/api";
const API_KEY_STORAGE = "BP_API_KEY";

// Matches your upload list item structure
type UploadItem = {
  folder: string;
  name: string;
  url: string;
  bytes?: number;
  mime?: string;
  mtime?: number;
};

// Listing schema (client-side)
interface ListingPayload {
  id: string;           // uuid (client or server generated)
  slug: string;         // kebab-case
  title: string;
  price?: number | null;
  currency?: string;    // e.g., "RM"
  address?: string;
  city?: string;
  state?: string;
  postcode?: string;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  builtUpSqft?: number | null;
  landSqft?: number | null;
  propertyType?: string; // Condo, Landed, etc.
  status?: string;       // For Sale, For Rent, Sold, etc.
  description?: string;
  features?: string[];   // tags like "Pool", "Renovated"
  images: string[];      // absolute URLs
  coverImage?: string;   // one of images[]
  createdAt: string;     // ISO
}

// Simple uuid (not crypto-strong but fine for staging)
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminListingForm() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState<UploadItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set()); // image URLs
  const [cover, setCover] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState("RM");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [builtUp, setBuiltUp] = useState<string>("");
  const [land, setLand] = useState<string>("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("For Sale");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string>(""); // comma-separated input

  useEffect(() => {
    const k = localStorage.getItem(API_KEY_STORAGE);
    if (!k) {
      toast.error("API key missing. Open /admin/upload, set key, then return here.");
    }
    setApiKey(k);
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    void loadImages();
  }, [apiKey]);

  async function loadImages() {
    try {
      setLoadingImages(true);
      const resp = await fetch(`${API_BASE}/list.php?key=${encodeURIComponent(apiKey!)}`);
      if (!resp.ok) throw new Error("Failed to load images");
      const data = await resp.json();
      const items: UploadItem[] = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      setImages(items);
    } catch (e: any) {
      toast.error(e?.message || "Image list failed");
    } finally {
      setLoadingImages(false);
    }
  }

  const toggleImage = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url); else next.add(url);
      return next;
    });
  };

  useEffect(() => {
    // Auto-set cover to the first selection if none chosen yet
    if (!cover && selected.size > 0) {
      setCover(Array.from(selected)[0]);
    }
    // If cover was unselected, pick another
    if (cover && !selected.has(cover) && selected.size > 0) {
      setCover(Array.from(selected)[0]);
    }
    if (selected.size === 0) setCover(undefined);
  }, [selected]);

  const canSave = useMemo(() => {
    return title.trim().length > 0 && selected.size > 0;
  }, [title, selected]);

  async function saveListing() {
    if (!apiKey) { toast.error("API key missing"); return; }
    if (!canSave) { toast.error("Title and at least 1 photo are required"); return; }

    const id = uuid();
    const payload: ListingPayload = {
      id,
      slug: slugify(title) + "-" + id.slice(0, 8),
      title: title.trim(),
      price: price ? Number(price) : null,
      currency: currency || "RM",
      address: address || undefined,
      city: city || undefined,
      state: state || undefined,
      postcode: postcode || undefined,
      latitude: null,
      longitude: null,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      builtUpSqft: builtUp ? Number(builtUp) : null,
      landSqft: land ? Number(land) : null,
      propertyType: propertyType || undefined,
      status: status || undefined,
      description: description || undefined,
      features: features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      images: Array.from(selected),
      coverImage: cover,
      createdAt: new Date().toISOString(),
    };

    try {
      setSaving(true);
      const resp = await fetch(`${API_BASE}/listing-save.php?key=${encodeURIComponent(apiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok && data?.ok) {
        toast.success("Listing saved");
        // Redirect suggestion: /properties/{payload.slug}
      } else {
        toast.error(data?.error || "Save failed");
      }
    } catch (e: any) {
      toast.error(e?.message || "Save error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New Listing</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
            <Button disabled={!canSave || saving} onClick={saveListing}>{saving ? "Saving…" : "Save"}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Double-Storey Terrace, Bandar Utama" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <div className="flex gap-2">
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 850000" />
                    <Input className="w-24" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Input value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="e.g., 4" />
                </div>
                <div>
                  <label className="text-sm font-medium">Bathrooms</label>
                  <Input value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="e.g., 3" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Built-up (sqft)</label>
                  <Input value={builtUp} onChange={(e) => setBuiltUp(e.target.value)} placeholder="e.g., 1800" />
                </div>
                <div>
                  <label className="text-sm font-medium">Land (sqft)</label>
                  <Input value={land} onChange={(e) => setLand(e.target.value)} placeholder="e.g., 1540" />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Input value={propertyType} onChange={(e) => setPropertyType(e.target.value)} placeholder="e.g., Terrace, Condominium" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="For Sale / For Rent / Sold" />
                </div>
                <div>
                  <label className="text-sm font-medium">Postcode</label>
                  <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g., 47800" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street & number" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Petaling Jaya" />
                </div>
                <div>
                  <label className="text-sm font-medium">State</label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g., Selangor" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Features (comma-separated)</label>
                <Input value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="e.g., Renovated, Corner Unit, Freehold" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={6} />
              </div>
            </CardContent>
          </Card>

          {/* Right: Image picker */}
          <Card>
            <CardHeader>
              <CardTitle>Attach Photos ({images.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingImages ? (
                <div className="flex items-center justify-center py-8">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                    Loading…
                  </span>
                </div>
              ) : images.length === 0 ? (
                <p className="text-sm text-muted-foreground">No images found. Upload images first in /admin/upload.</p>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((img) => (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => toggleImage(img.url)}
                        className={`group relative overflow-hidden rounded-xl border ${selected.has(img.url) ? 'ring-2 ring-black' : ''}`}
                        title={img.name}
                      >
                        <img src={img.url} alt={img.name} className="aspect-square w-full object-cover" loading="lazy" />
                        {selected.has(img.url) && (
                          <span className="absolute right-2 top-2 rounded bg-black/80 px-2 py-0.5 text-xs text-white">Selected</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {selected.size > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cover Photo</label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {Array.from(selected).map((url) => (
                          <button
                            key={url}
                            type="button"
                            onClick={() => setCover(url)}
                            className={`group relative overflow-hidden rounded-xl border ${cover === url ? 'ring-2 ring-black' : ''}`}
                          >
                            <img src={url} alt="cover" className="aspect-square w-full object-cover" />
                            {cover === url && (
                              <span className="absolute right-2 top-2 rounded bg-black/80 px-2 py-0.5 text-xs text-white">Cover</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
