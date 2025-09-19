// src/lib/ImagesApi.ts

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

    const formData = new FormData();
    // PHP expects 'photo'; append each file
    for (const file of files) formData.append("photo", file);

    const res = await fetch(`/api/upload.php?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");

    const payload = await res.json();
    const arr = Array.isArray(payload) ? payload : [payload];

    return arr.map((f: any) => ({
      id: `${f.folder}/${f.name}`,
      name: f.name,
      url: f.url,
      folder: f.folder,
      size: f.size ?? 0,
      uploadedAt: f.uploadedAt ?? new Date().toISOString(),
    }));
  }

  // 2) List library → GET /api/list.php?key=...
  async list(): Promise<LibraryItem[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("No API key set (BP_API_KEY)");

    const res = await fetch(`/api/list.php?key=${encodeURIComponent(apiKey)}`);
    if (!res.ok) throw new Error("Failed to load image library");

    const files = await res.json();
    return files.map((f: any) => ({
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
