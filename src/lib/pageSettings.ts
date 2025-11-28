// Page Settings Management
// Stores page enable/disable status in database via API

export interface PageSettings {
  listings: boolean;
  gallery: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

const DEFAULT_SETTINGS: PageSettings = {
  listings: false, // Default to disabled
  gallery: false,  // Default to disabled
};

// Cache settings in memory to reduce API calls
let cachedSettings: PageSettings | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60000; // 1 minute

export async function getPageSettings(): Promise<PageSettings> {
  // Return cached settings if still valid
  if (cachedSettings && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedSettings;
  }

  try {
    const response = await fetch(`${API_URL}/settings.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }

    const data = await response.json();
    
    if (data.success && data.settings) {
      const settings: PageSettings = {
        listings: data.settings.showListings === 'true',
        gallery: data.settings.showGallery === 'true',
      };
      
      // Update cache
      cachedSettings = settings;
      cacheTimestamp = Date.now();
      
      return settings;
    }
    
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error reading page settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function updatePageSettings(settings: Partial<PageSettings>): Promise<void> {
  try {
    const token = localStorage.getItem('ADMIN_TOKEN');
    if (!token) {
      throw new Error('Not authenticated');
    }

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      const settingKey = key === 'listings' ? 'showListings' : 'showGallery';
      const response = await fetch(`${API_URL}/settings.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: settingKey,
          value: value.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${key} setting`);
      }
    }

    // Clear cache to force refresh
    cachedSettings = null;
    
  } catch (error) {
    console.error("Error updating page settings:", error);
    throw error;
  }
}

export async function isPageEnabled(page: keyof PageSettings): Promise<boolean> {
  const settings = await getPageSettings();
  return settings[page] ?? false;
}

// Synchronous version for backwards compatibility (uses cache only)
export function isPageEnabledSync(page: keyof PageSettings): boolean {
  if (!cachedSettings) {
    return false; // Default to disabled if not loaded yet
  }
  return cachedSettings[page] ?? false;
}
