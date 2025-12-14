import { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Product } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface TopDealsProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

const TopDeals = ({ products, onViewDetails }: TopDealsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const topDeals = products.filter(p => p.is_top_deal);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);
  
  if (topDeals.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">Top Deals</h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground">
            Don't miss out on these amazing offers
          </p>
        </div>
        
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {topDeals.map((product) => (
              <CarouselItem key={product.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
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

        {/* Dot indicators for mobile */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-200",
                current === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDeals;
