import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';
import { Product } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img 
          src={product.image} 
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
            <span className="ml-1 font-semibold">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({Math.floor(Math.random() * 500 + 100)} reviews)</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.isTopDeal && (
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
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
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
