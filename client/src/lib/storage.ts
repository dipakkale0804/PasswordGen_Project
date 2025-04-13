import { HistoryItem } from "@/types";

const STORAGE_KEY = "secure-vault-history";

/**
 * Save history items to local storage
 */
export function saveHistoryToStorage(items: HistoryItem[]): void {
  try {
    // Only store the most recent 50 items
    const limitedItems = items.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedItems));
  } catch (error) {
    console.error("Failed to save history to local storage:", error);
  }
}

/**
 * Load history items from local storage
 */
export function loadHistoryFromStorage(): HistoryItem[] {
  try {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (!storedItems) return [];
    
    const parsedItems = JSON.parse(storedItems) as any[];
    
    // Convert date strings back to Date objects
    return parsedItems.map(item => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error("Failed to load history from local storage:", error);
    return [];
  }
}

/**
 * Clear all history items from local storage
 */
export function clearHistoryFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear history from local storage:", error);
  }
}
