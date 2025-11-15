import { useState, useEffect } from 'react';
import { Product } from './useProducts';

const STORAGE_KEY = 'recently_viewed_products';
const MAX_PRODUCTS = 8;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing recently viewed products:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addProduct = (product: Product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add to beginning
      const updated = [product, ...filtered].slice(0, MAX_PRODUCTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { recentlyViewed, addProduct, clearHistory };
};
