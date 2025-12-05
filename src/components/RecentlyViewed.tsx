import { Product } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { History, Trash2 } from 'lucide-react';

interface RecentlyViewedProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onClear: () => void;
}

const RecentlyViewed = ({ products, onViewDetails, onClear }: RecentlyViewedProps) => {
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <History className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold">Recently Viewed</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 8).map(product => (
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

export default RecentlyViewed;
