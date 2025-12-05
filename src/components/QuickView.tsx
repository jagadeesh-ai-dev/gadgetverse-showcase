import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';
import { Star, Check, ExternalLink, Heart, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useReviews } from '@/hooks/useReviews';
import { cn } from '@/lib/utils';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onViewFull: (product: Product) => void;
}

const QuickView = ({ product, isOpen, onClose, onViewFull }: QuickViewProps) => {
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { averageRating, reviewCount } = useReviews(product?.id || '');

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);
  const displayRating = averageRating > 0 ? averageRating : product.rating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-square bg-secondary">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
              aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </button>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.is_top_deal && (
              <Badge variant="destructive" className="absolute top-3 left-3">
                TOP DEAL
              </Badge>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 flex flex-col">
            <Badge variant="secondary" className="w-fit mb-2">
              {product.category}
            </Badge>
            
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="ml-1 font-semibold">{displayRating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {product.description}
            </p>

            {/* Quick Features */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-3">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    onClose();
                    onViewFull(product);
                  }}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Full Details
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  asChild
                >
                  <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Buy Now <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
