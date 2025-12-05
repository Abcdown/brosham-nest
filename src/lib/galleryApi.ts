// Gallery API Helper
// Handles all gallery operations (create, read, update, delete, reorder)

const API_BASE = '/api';

export interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  location?: string;
  display_order: number;
  is_featured: boolean;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface GalleryListResponse {
  success: boolean;
  images: GalleryImage[];
  categories: string[];
  total: number;
  limit: number;
  offset: number;
}

export interface GallerySaveResponse {
  success: boolean;
  message: string;
  id: number;
  action: 'create' | 'update';
}

export class GalleryAPI {
  static async getAll(params?: {
    status?: string;
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<GalleryListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const url = `${API_BASE}/gallery-list.php?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(data.error || 'Failed to fetch gallery images');
    }

    return {
      success: data.success ?? true,
      images: Array.isArray(data.images) ? data.images : [],
      categories: Array.isArray(data.categories) ? data.categories : [],
      total: data.total ?? 0,
      limit: data.limit ?? 100,
      offset: data.offset ?? 0,
    };
  }

  static async save(image: Partial<GalleryImage>): Promise<GallerySaveResponse> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/gallery-save.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(image),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save gallery image');
    }

    return data;
  }

  static async delete(id: number): Promise<void> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/gallery-delete.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete gallery image');
    }
  }

  static async reorder(imageIds: number[]): Promise<void> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/gallery-reorder.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ images: imageIds }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to reorder gallery images');
    }
  }
}
