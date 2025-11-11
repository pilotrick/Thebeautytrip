/**
 * Secure Storage Utility
 * Provides safe storage with data validation and integrity checks
 */

interface StoredData<T> {
  value: T;
  timestamp: number;
  checksum: string;
}

// Simple hash function for data integrity (not cryptographic)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

export const secureStorage = {
  /**
   * Store data with integrity check
   * Uses sessionStorage for temporary sensitive data
   */
  set: <T = any>(key: string, value: T, persistent = false): boolean => {
    try {
      const stringValue = JSON.stringify(value);
      const data: StoredData<T> = {
        value,
        timestamp: Date.now(),
        checksum: simpleHash(stringValue)
      };
      
      const storage = persistent ? localStorage : sessionStorage;
      storage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  /**
   * Retrieve data with integrity verification
   */
  get: <T = any>(key: string, persistent = false): T | null => {
    try {
      const storage = persistent ? localStorage : sessionStorage;
      const dataStr = storage.getItem(key);
      if (!dataStr) return null;
      
      const data = JSON.parse(dataStr) as StoredData<T>;
      
      // Verify checksum for data integrity
      const stringValue = JSON.stringify(data.value);
      if (simpleHash(stringValue) !== data.checksum) {
        console.warn('Data integrity check failed for key:', key);
        // Remove corrupted data
        storage.removeItem(key);
        return null;
      }
      
      return data.value;
    } catch (e) {
      console.error('Storage retrieval error:', e);
      return null;
    }
  },

  /**
   * Remove item from storage
   */
  remove: (key: string, persistent = false): void => {
    try {
      const storage = persistent ? localStorage : sessionStorage;
      storage.removeItem(key);
    } catch (e) {
      console.error('Storage removal error:', e);
    }
  },

  /**
   * Check if item exists
   */
  has: (key: string, persistent = false): boolean => {
    try {
      const storage = persistent ? localStorage : sessionStorage;
      return storage.getItem(key) !== null;
    } catch {
      return false;
    }
  },

  /**
   * Clear all items (use with caution)
   */
  clear: (persistent = false): void => {
    try {
      const storage = persistent ? localStorage : sessionStorage;
      storage.clear();
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  }
};

/**
 * Helper to safely check if user is authenticated
 */
export const getUserFromStorage = (): boolean => {
  try {
    const userData = localStorage.getItem('beautyTripUser');
    if (!userData) return false;
    
    // Validate the data structure
    const parsed = JSON.parse(userData);
    return !!(parsed && parsed.email);
  } catch {
    return false;
  }
};
