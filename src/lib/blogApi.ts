// Blog API Helper
// Handles all blog post operations (create, read, update, delete)

const API_BASE = '/api';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string | null;
  authorId?: number;
  authorName?: string;
  status: 'draft' | 'published';
  tags?: string[];
  views?: number;
  isFeatured?: boolean;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogListResponse {
  success: boolean;
  posts: BlogPost[];
  total: number;
  limit: number;
  offset: number;
}

export interface BlogSaveResponse {
  success: boolean;
  message: string;
  id: string;
  action: 'create' | 'update';
}

export class BlogAPI {
  static async getAll(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<BlogListResponse> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const url = `${API_BASE}/blog-list.php?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(data.error || 'Failed to fetch blog posts');
    }

    return {
      success: data.success ?? true,
      posts: Array.isArray(data.posts) ? data.posts : [],
      total: data.total ?? 0,
      limit: data.limit ?? 50,
      offset: data.offset ?? 0,
    };
  }

  static async getPublic(): Promise<{ success: boolean; posts: BlogPost[] }> {
    const response = await fetch(`${API_BASE}/blog-list.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch blog posts');
    }

    return {
      success: data.success ?? true,
      posts: Array.isArray(data.posts) ? data.posts : [],
    };
  }

  static async save(post: Partial<BlogPost>): Promise<BlogSaveResponse> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/blog-save.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save blog post');
    }

    return data;
  }

  static async delete(id: string): Promise<void> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/blog-delete.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete blog post');
    }
  }
}
