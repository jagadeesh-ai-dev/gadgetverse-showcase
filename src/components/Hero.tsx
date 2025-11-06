import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-accent/70" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
          GadgetVerse
        </h1>
        <p className="text-2xl md:text-3xl mb-4 text-primary-foreground font-light">
          Discover. Compare. Earn.
        </p>
        <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
          Your trusted source for honest tech reviews and the best gadget recommendations
        </p>
        <Button 
          size="lg" 
          onClick={scrollToProducts}
          className="bg-background text-foreground hover:bg-background/90 shadow-lg"
        >
          Explore Products <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
