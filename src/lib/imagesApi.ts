// src/lib/ImagesApi.ts

console.log("[ImagesApi] loaded v1 @", new Date().toISOString());

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  folder: string;
  size: number;
  uploadedAt: string;
}

export interface LibraryItem {
  id: string;
  name: string;
  url: string;
  folder: string;
  size: number;
  uploadedAt: string;
}

class ImagesApi {
  private getApiKey(): string | null {
    return localStorage.getItem("BP_API_KEY");
  }

  hasApiKey(): boolean {
    return !!this.getApiKey();
  }

  // 1) Upload images → POST /api/upload.php?key=...
  async upload(files: File[]): Promise<UploadedImage[]> {
  const apiKey = this.getApiKey();
  if (!apiKey) throw new Error("No API key set (BP_API_KEY)");

  const results: UploadedImage[] = [];

  // Upload EACH file in its own request, gather all results
  for (const file of files) {
    const fd = new FormData();
    fd.append("photo", file); // your PHP expects field name 'photo'

    const res = await fetch(`/api/upload.php?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      body: fd,
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`Upload failed (${res.status}): ${text.slice(0,150)}`);

    let json: any;
    try { json = JSON.parse(text); } 
    catch { throw new Error("Upload returned invalid JSON"); }

    // Normalise: accept either a single object or an array
    const arr = Array.isArray(json) ? json : [json];

    for (const f of arr) {
      results.push({
        id: `${f.folder}/${f.name}`,
        name: f.name,
        url: f.url,
        folder: f.folder,
        size: f.size ?? 0,
        uploadedAt: f.uploadedAt ?? new Date().toISOString(),
      });
    }
  }

  return results;
}


  // 2) List library → GET /api/list.php?key=...
 async list(): Promise<LibraryItem[]> {
  const apiKey = this.getApiKey();
  console.log("[ImagesApi] list() using key:", !!apiKey);
  if (!apiKey) throw new Error("No API key set (BP_API_KEY)");

  const url = `/api/list.php?key=${encodeURIComponent(apiKey)}`;
  console.log("[ImagesApi] list() →", url);

  // No cache so you always see fresh files
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    console.error("[ImagesApi] list() HTTP", res.status, text.slice(0, 400));
    throw new Error(`list.php ${res.status}`);
  }

  let json: any;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error("[ImagesApi] list() invalid JSON:", text.slice(0, 400));
    throw new Error("list.php returned invalid JSON");
  }

  const arr = Array.isArray(json) ? json : (json.files || json.data || []);
  return (arr || []).map((f: any) => ({
    id: `${f.folder}/${f.name}`,
    name: f.name,
    url: f.url,
    folder: f.folder,
    size: f.size ?? 0,
    uploadedAt: f.uploadedAt ?? new Date().toISOString(),
  }));
}

  // 3) Delete item → POST x-www-form-urlencoded to /api/delete.php
  async remove(folder: string, name: string): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("No API key set (BP_API_KEY)");

    const body = new URLSearchParams({ key: apiKey, folder, name });

    const res = await fetch("/api/delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) throw new Error("Delete failed");
  }
}

export const imagesApi = new ImagesApi();
