import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface TopDealsProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

const TopDeals = ({ products, onViewDetails }: TopDealsProps) => {
  const topDeals = products.filter(p => p.isTopDeal);
  
  if (topDeals.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Top Deals</h2>
          <p className="text-xl text-muted-foreground">
            Don't miss out on these amazing offers
          </p>
        </div>
        
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {topDeals.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ProductCard 
                    product={product} 
                    onViewDetails={onViewDetails}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TopDeals;
