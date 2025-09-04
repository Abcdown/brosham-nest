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

// Mock data for development
const MOCK_LIBRARY_IMAGES: LibraryItem[] = [
  {
    id: "1",
    name: "modern-house-1.jpg",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    folder: "properties",
    size: 245678,
    uploadedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "house-interior-1.jpg",
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    folder: "properties",
    size: 198765,
    uploadedAt: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    name: "luxury-condo.jpg",
    url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    folder: "properties",
    size: 312456,
    uploadedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    name: "apartment-view.jpg",
    url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    folder: "properties",
    size: 287634,
    uploadedAt: "2024-01-12T14:20:00Z"
  },
  {
    id: "5",
    name: "townhouse-ext.jpg",
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    folder: "properties",
    size: 156789,
    uploadedAt: "2024-01-11T11:00:00Z"
  },
  {
    id: "6",
    name: "kitchen-modern.jpg",
    url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    folder: "properties",
    size: 234567,
    uploadedAt: "2024-01-10T16:30:00Z"
  }
];

class ImagesApi {
  private getApiKey(): string | null {
    return localStorage.getItem('BP_API_KEY');
  }

  async upload(files: File[]): Promise<UploadedImage[]> {
    // Mock implementation - simulate upload with progress
    const uploads: UploadedImage[] = [];
    
    for (const file of files) {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const uploaded: UploadedImage = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file), // In real implementation, this would be the server URL
        folder: "properties",
        size: file.size,
        uploadedAt: new Date().toISOString()
      };
      
      uploads.push(uploaded);
    }
    
    return uploads;
    
    // Real implementation would be:
    /*
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('No API key found in localStorage');
    }

    const formData = new FormData();
    files.forEach(file => formData.append('photo', file));

    const response = await fetch(`/api/upload.php?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
    */
  }

  async list(): Promise<LibraryItem[]> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return [...MOCK_LIBRARY_IMAGES];
    
    // Real implementation would be:
    /*
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('No API key found in localStorage');
    }

    const response = await fetch(`/api/list.php?key=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to load images');
    }

    return await response.json();
    */
  }

  async remove(folder: string, name: string): Promise<void> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Real implementation would be:
    /*
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('No API key found in localStorage');
    }

    const response = await fetch('/api/delete.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folder, name, key: apiKey })
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }
    */
  }

  hasApiKey(): boolean {
    return !!this.getApiKey();
  }
}

export const imagesApi = new ImagesApi();