// Authentication API helper
// Handles login, logout, and token verification

const API_BASE = '/api';
const USE_MOCK = import.meta.env.DEV; // Use mock in development mode

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  token_expiry: number;
  user: {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role: string;
  };
}

export interface VerifyTokenResponse {
  success: boolean;
  valid: boolean;
  message: string;
}

export class AuthAPI {
  /**
   * Login with username and password
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // MOCK MODE for local development
    if (USE_MOCK) {
      console.log('🔧 Using MOCK login mode');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      if (credentials.username === 'admin' && credentials.password === 'Admin@123') {
        const mockResponse: LoginResponse = {
          success: true,
          message: 'Login successful (MOCK)',
          token: 'mock_token_' + Date.now(),
          token_expiry: Math.floor(Date.now() / 1000) + 86400,
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@broshamproperties.my',
            full_name: 'Administrator',
            role: 'admin'
          }
        };
        
        localStorage.setItem('ADMIN_TOKEN', mockResponse.token);
        localStorage.setItem('ADMIN_USER', JSON.stringify(mockResponse.user));
        localStorage.setItem('TOKEN_EXPIRY', mockResponse.token_expiry.toString());
        
        return mockResponse;
      } else {
        throw new Error('Invalid credentials (use admin/Admin@123 for testing)');
      }
    }
    
    // REAL API MODE for production
    try {
      const response = await fetch(`${API_BASE}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const text = await response.text();
      console.log('Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text:', text);
        throw new Error('Server returned invalid response. Check console for details.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user info in localStorage
      if (data.success && data.token) {
        localStorage.setItem('ADMIN_TOKEN', data.token);
        localStorage.setItem('ADMIN_USER', JSON.stringify(data.user));
        localStorage.setItem('TOKEN_EXPIRY', data.token_expiry.toString());
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout - clear local storage and invalidate token
   */
  static async logout(): Promise<void> {
    const token = localStorage.getItem('ADMIN_TOKEN');

    try {
      if (token) {
        await fetch(`${API_BASE}/logout.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('ADMIN_TOKEN');
      localStorage.removeItem('ADMIN_USER');
      localStorage.removeItem('TOKEN_EXPIRY');
    }
  }

  /**
   * Verify if current token is valid
   */
  static async verifyToken(): Promise<boolean> {
    const token = localStorage.getItem('ADMIN_TOKEN');
    const expiry = localStorage.getItem('TOKEN_EXPIRY');

    if (!token || !expiry) {
      return false;
    }

    // Check if token is expired
    const expiryTime = parseInt(expiry);
    if (Date.now() / 1000 > expiryTime) {
      this.logout();
      return false;
    }

    try {
      const response = await fetch(`${API_BASE}/verify-token.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data: VerifyTokenResponse = await response.json();
      return data.valid;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  /**
   * Get current user info from localStorage
   */
  static getCurrentUser() {
    const userStr = localStorage.getItem('ADMIN_USER');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('ADMIN_TOKEN');
    const expiry = localStorage.getItem('TOKEN_EXPIRY');

    if (!token || !expiry) return false;

    const expiryTime = parseInt(expiry);
    return Date.now() / 1000 < expiryTime;
  }
}
