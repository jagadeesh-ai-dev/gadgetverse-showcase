import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';
import { Star, Check, X, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { formatPrice } = useCurrency();
  
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full rounded-lg"
            />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="ml-1 font-bold text-lg">{product.rating}</span>
              </div>
              <Badge variant="secondary">{product.category}</Badge>
              {product.is_top_deal && (
                <Badge variant="destructive">TOP DEAL</Badge>
              )}
            </div>
            
            <div className="border-t pt-4">
              <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-lg mb-3 text-green-600">Pros</h3>
                <ul className="space-y-2">
                  {product.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3 text-destructive">Cons</h3>
                <ul className="space-y-2">
                  {product.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
              asChild
            >
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                Buy Now on Partner Site <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
