import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { Product } from '@/hooks/useProducts';
import { Trash2 } from 'lucide-react';

interface RecentlyViewedProps {
  onViewDetails: (product: Product) => void;
}

export const RecentlyViewed = ({ onViewDetails }: RecentlyViewedProps) => {
  const { recentlyViewed, clearHistory } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Recently Viewed</h2>
          <p className="text-muted-foreground">Products you've recently checked out</p>
        </div>
        <Button variant="outline" size="sm" onClick={clearHistory}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recentlyViewed.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
};
