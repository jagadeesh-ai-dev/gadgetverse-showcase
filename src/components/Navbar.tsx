import { ShoppingBag, Heart } from 'lucide-react';
import CurrencySelector from './CurrencySelector';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GadgetVerse
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </button>
          <button
            onClick={scrollToProducts}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Products
          </button>
          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/wishlist')}
            aria-label="View wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <CurrencySelector />
          <a 
            href="/admin/login" 
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
