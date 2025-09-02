import React, { useState, useEffect, useCallback } from 'react';
import { Upload, X, Copy, ExternalLink, Trash2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API_BASE = "https://staging.broshamproperties.my/api";
const API_KEY_STORAGE = "BP_API_KEY";

interface UploadResponse {
  ok: boolean;
  url?: string;
  name?: string;
  folder?: string;
  bytes?: number;
  mime?: string;
  width?: number;
  height?: number;
}

interface ListItem {
  folder: string;
  name: string;
  url: string;
  bytes: number;
  mime: string;
  mtime: number;
}

interface ListResponse {
  ok: boolean;
  total?: number;
  items?: ListItem[];
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const AdminUpload: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE);
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      const key = prompt("Enter Admin API Key");
      if (key) {
        localStorage.setItem(API_KEY_STORAGE, key);
        setApiKey(key);
      }
    }
  }, []);

// Global drag blockers (prevents browser from showing "forbidden"/navigating away)
useEffect(() => {
  const prevent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  window.addEventListener("dragover", prevent);
  window.addEventListener("drop", prevent);
  return () => {
    window.removeEventListener("dragover", prevent);
    window.removeEventListener("drop", prevent);
  };
}, []);

  const fetchUploads = async () => {
    if (!apiKey) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/list.php?key=${apiKey}`);
      const data: ListResponse = await response.json();
      
      if (data.ok && data.items) {
        setUploads(data.items.sort((a, b) => b.mtime - a.mtime));
      } else {
        toast.error('Failed to fetch uploads');
      }
    } catch (error) {
      toast.error('Error fetching uploads');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

const handleDrop = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setDragOver(false);

  let files: File[] = [];

  // Prefer DataTransferItemList for better cross-browser behavior
  const items = e.dataTransfer?.items;
  if (items && items.length) {
    files = Array.from(items)
      .filter((it) => it.kind === "file")
      .map((it) => it.getAsFile())
      .filter((f): f is File => !!f);
  } else {
    files = Array.from(e.dataTransfer?.files ?? []);
  }

  if (files.length === 0) return;

  if (files.length === 1) {
    handleFileSelect(files[0]);
  } else {
    void uploadFiles(files);
  }
}, []);


  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";  // 👈 tell browser it's a copy action
    setDragOver(true);
  }, []);

const handleDragEnter = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setDragOver(true);
}, []);

const handleDragLeave = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();           // <-- add this
  setDragOver(false);
}, []);


  const handleUpload = async () => {
    if (!selectedFile || !apiKey) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      const response = await fetch(`${API_BASE}/upload.php?key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        body: formData,
      });

      const data: UploadResponse = await response.json();
      
      if (data.ok) {
        toast.success('Uploaded ✓');
        clearSelection();
        fetchUploads();
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      toast.error('Upload error');
    } finally {
      setUploading(false);
    }
  };

  // NEW: sequential multi-file uploader
const uploadFiles = async (files: File[]) => {
  if (!apiKey || files.length === 0) return;

  setUploading(true);
  let ok = 0, fail = 0;

  for (const file of files) {
    if (!file.type.startsWith("image/")) { fail++; continue; }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch(`${API_BASE}/upload.php?key=${encodeURIComponent(apiKey)}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data?.ok) ok++; else fail++;
    } catch {
      fail++;
    }
  }

  toast.success(`Uploaded ${ok} file(s)` + (fail ? ` · ${fail} failed` : ""));
  await fetchUploads();
  setUploading(false);
};
  
  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const deleteFile = async (item: ListItem) => {
    if (!confirm(`Delete ${item.name}?`)) return;

    try {
      const formData = new FormData();
      formData.append('key', apiKey);
      formData.append('folder', item.folder);
      formData.append('name', item.name);

      const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success('File deleted');
        fetchUploads();
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('Delete error');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey('');
    setUploads([]);
  };

  if (!apiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Please refresh to enter API key</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Upload</h1>
          <Button variant="outline" onClick={clearApiKey}>
            Clear API Key
          </Button>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedFile ? (
              <div
  role="button"
  tabIndex={0}
  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
    dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
  }`}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDragEnter={handleDragEnter}
>


                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg mb-2">Drop image here or click to select</p>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  if (files.length === 1) {
                  // keep your existing preview flow for single selection
                  handleFileSelect(files[0]);
                  } else if (files.length > 1) {
                  // upload many immediately
                    void uploadFiles(files);
                  }
                  }}
                  className="max-w-xs mx-auto"
              />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-xs max-h-48 rounded-lg object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Button>
                  <Button variant="outline" onClick={clearSelection}>
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads ({uploads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : uploads.length === 0 ? (
              <p className="text-center text-muted-foreground">No uploads found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploads.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="aspect-video bg-muted rounded overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm truncate" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(item.bytes)} • {item.folder}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyUrl(item.url)}
                        className="flex-1"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(item.url, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteFile(item)}
                        className="flex-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUpload;
