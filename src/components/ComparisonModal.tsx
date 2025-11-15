import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { X, Star, ExternalLink } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ComparisonModal = () => {
  const { comparisonList, isComparisonOpen, setIsComparisonOpen, removeFromComparison, clearComparison } = useComparison();
  const { formatPrice } = useCurrency();

  if (comparisonList.length === 0) {
    return null;
  }

  return (
    <Dialog open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Compare Products ({comparisonList.length})</DialogTitle>
            <Button variant="outline" size="sm" onClick={clearComparison}>
              Clear All
            </Button>
          </div>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh]">
          <div className="grid grid-cols-1 gap-4">
            {/* Product Images and Names */}
            <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
              {comparisonList.map((product) => (
                <div key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 z-10"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
                </div>
              ))}
            </div>

            {/* Price Comparison */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Price</h4>
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <div key={product.id} className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Comparison */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Rating</h4>
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <div key={product.id} className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Category</h4>
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <div key={product.id} className="text-sm text-muted-foreground">
                    {product.category}
                  </div>
                ))}
              </div>
            </div>

            {/* Features Comparison */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Features</h4>
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <ul key={product.id} className="text-sm space-y-1">
                    {(product.features as string[]).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Pros Comparison */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Pros</h4>
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <ul key={product.id} className="text-sm space-y-1 text-green-600 dark:text-green-400">
                    {(product.pros as string[]).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span>✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Cons Comparison */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Cons</h4>
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <ul key={product.id} className="text-sm space-y-1 text-red-600 dark:text-red-400">
                    {(product.cons as string[]).map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span>✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Buy Buttons */}
            <div className="border-t pt-4">
              <div className={`grid grid-cols-${Math.min(comparisonList.length, 4)} gap-4`}>
                {comparisonList.map((product) => (
                  <Button key={product.id} asChild className="w-full">
                    <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                      Buy Now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
