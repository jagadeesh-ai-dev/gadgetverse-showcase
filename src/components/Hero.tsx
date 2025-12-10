import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-accent/70" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-primary-foreground">
          GadgetVerse
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl mb-3 sm:mb-4 text-primary-foreground font-light">
          Discover. Compare. Earn.
        </p>
        <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 text-primary-foreground/90 max-w-2xl mx-auto px-4">
          Your trusted source for honest tech reviews and the best gadget recommendations
        </p>
        <Button 
          size="lg" 
          onClick={scrollToProducts}
          className="bg-background text-foreground hover:bg-background/90 shadow-lg text-sm sm:text-base"
        >
          Explore Products <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
