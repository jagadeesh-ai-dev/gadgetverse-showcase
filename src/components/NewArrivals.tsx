import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Product } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

const AUTOPLAY_DELAY = 5000;

const NewArrivals = ({ products, onViewDetails }: NewArrivalsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Get the 6 most recently added products
  const newArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6);
  }, [products]);

  const startProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setProgress(0);
    
    const increment = 100 / (AUTOPLAY_DELAY / 50);
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, 50);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    startProgress();

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
      if (!isPaused) {
        startProgress();
      }
    });

    return () => stopProgress();
  }, [api, startProgress, stopProgress, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopProgress();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startProgress();
  };

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);
  
  if (newArrivals.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">New Arrivals</h2>
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
          </div>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground">
            Check out the latest additions to our collection
          </p>
        </div>
        
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: AUTOPLAY_DELAY,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {newArrivals.map((product) => (
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

          {/* Progress bar */}
          <div className="w-full max-w-6xl mx-auto mt-4">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-50 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dot indicators for mobile */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-200",
                current === index
                  ? "bg-accent w-6"
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

export default NewArrivals;
