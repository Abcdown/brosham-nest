// Page Settings Management
// Stores page enable/disable status in localStorage

export interface PageSettings {
  listings: boolean;
  gallery: boolean;
}

const STORAGE_KEY = "BP_PAGE_SETTINGS";

const DEFAULT_SETTINGS: PageSettings = {
  listings: true,
  gallery: true,
};

export function getPageSettings(): PageSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch (error) {
    console.error("Error reading page settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export function updatePageSettings(settings: Partial<PageSettings>): void {
  try {
    const current = getPageSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error updating page settings:", error);
    throw error;
  }
}

export function isPageEnabled(page: keyof PageSettings): boolean {
  const settings = getPageSettings();
  return settings[page] ?? true;
}
