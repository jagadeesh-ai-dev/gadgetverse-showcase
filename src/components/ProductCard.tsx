import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Heart, Eye } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useReviews } from '@/hooks/useReviews';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails, onQuickView }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { averageRating, reviewCount } = useReviews(product.id);
  const isFavorite = isInWishlist(product.id);

  const displayRating = averageRating > 0 ? averageRating : product.rating;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
      <div className="aspect-square overflow-hidden bg-secondary relative">
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
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-all opacity-0 group-hover:opacity-100"
            aria-label="Quick view"
          >
            <Eye className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        )}
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="ml-1 font-semibold text-sm sm:text-base">{displayRating.toFixed(1)}</span>
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl sm:text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.is_top_deal && (
              <span className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                TOP DEAL
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 text-xs sm:text-sm"
              onClick={() => onViewDetails(product)}
              variant="outline"
              size="sm"
            >
              Details
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-xs sm:text-sm"
              asChild
              size="sm"
            >
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                Buy <ExternalLink className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
