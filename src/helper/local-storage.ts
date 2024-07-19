export class StorageService {
  static setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving item ${key} to localStorage`, error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  }

  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }
}
