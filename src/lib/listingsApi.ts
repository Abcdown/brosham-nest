// API client for listings management
const API_URL = import.meta.env.VITE_API_URL || '/api';

export interface Listing {
  id?: string;
  slug?: string;
  title: string;
  summary?: string;
  price: number;
  currency?: string;
  address?: string;
  city?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqft?: number;
  propertyType?: string;
  propertyCategory?: string;
  status?: string;
  listingStatus?: string;
  coverImage?: string;
  gallery?: Array<{ url: string }>;
  features?: string[];
  isFeatured?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListingsResponse {
  success: boolean;
  listings: Listing[];
  total: number;
  limit: number;
  offset: number;
}

export const ListingsAPI = {
  // Get all listings (admin)
  async getAll(params?: {
    status?: string;
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<ListingsResponse> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    console.log('[ListingsAPI.getAll] Starting request');
    console.log('[ListingsAPI.getAll] Token:', token ? 'present' : 'missing');
    
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const url = `${API_URL}/listings-list.php?${queryParams}`;
    console.log('[ListingsAPI.getAll] URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('[ListingsAPI.getAll] Response status:', response.status);
    console.log('[ListingsAPI.getAll] Response OK:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ListingsAPI.getAll] Error response:', errorText);
      let error;
      try {
        error = JSON.parse(errorText);
      } catch (e) {
        error = { error: errorText };
      }
      throw new Error(error.error || 'Failed to fetch listings');
    }
    
    const data = await response.json();
    console.log('[ListingsAPI.getAll] Response data:', data);
    
    // Check if the API returned an error even with 200 status
    if (data.success === false) {
      console.error('[ListingsAPI.getAll] API returned error:', data.error);
      throw new Error(data.error || 'Failed to fetch listings');
    }
    
    // Ensure the response has the expected structure
    return {
      success: data.success ?? true,
      listings: Array.isArray(data.listings) ? data.listings : [],
      total: data.total ?? 0,
      limit: data.limit ?? 50,
      offset: data.offset ?? 0,
    };
  },

  // Get public listings (no auth required)
  async getPublic(): Promise<{ success: boolean; listings: Listing[] }> {
    const response = await fetch(`${API_URL}/listings-list.php`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch public listings');
    }
    
    return response.json();
  },

  // Create or update listing
  async save(listing: Listing): Promise<{ success: boolean; id: string; action: string }> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/listings-save.php`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listing),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save listing');
    }
    
    return response.json();
  },

  // Delete listing
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/listings-delete.php`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete listing');
    }
    
    return response.json();
  },
};
