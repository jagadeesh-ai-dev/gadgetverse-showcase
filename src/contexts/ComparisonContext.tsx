import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';

interface ComparisonContextType {
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARISON = 4;

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const addToComparison = (product: Product) => {
    if (comparisonList.length >= MAX_COMPARISON) {
      toast.error(`You can only compare up to ${MAX_COMPARISON} products at once`);
      return;
    }
    if (comparisonList.find((p) => p.id === product.id)) {
      toast.info('Product already in comparison');
      return;
    }
    setComparisonList((prev) => [...prev, product]);
    toast.success('Added to comparison');
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
    setIsComparisonOpen(false);
  };

  const isInComparison = (productId: string) => {
    return comparisonList.some((p) => p.id === productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        isComparisonOpen,
        setIsComparisonOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};
