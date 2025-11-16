import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Heart, GitCompare } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useReviews } from '@/hooks/useReviews';
import { useComparison } from '@/contexts/ComparisonContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { averageRating, reviewCount } = useReviews(product.id);
  const { addToComparison, isInComparison } = useComparison();
  const isFavorite = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);

  const displayRating = averageRating > 0 ? averageRating : product.rating;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="aspect-square overflow-hidden bg-secondary relative">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={() => addToComparison(product)}
            className={cn(
              "bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors",
              inComparison && "bg-primary/20"
            )}
            aria-label="Add to comparison"
          >
            <GitCompare className={cn("h-5 w-5", inComparison ? "text-primary" : "text-muted-foreground")} />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </button>
        </div>
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="ml-1 font-semibold">{displayRating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.is_top_deal && (
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">
                TOP DEAL
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => onViewDetails(product)}
              variant="outline"
            >
              Details
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
    </Card>
  );
};

export default ProductCard;
