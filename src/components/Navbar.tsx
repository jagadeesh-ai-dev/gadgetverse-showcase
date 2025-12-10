import { ShoppingBag, Heart, User, LogOut, Menu, X } from 'lucide-react';
import CurrencySelector from './CurrencySelector';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { NavLink } from './NavLink';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from './ui/sheet';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const handleNavigation = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const MobileNavLinks = () => (
    <div className="flex flex-col gap-4 mt-8">
      <SheetClose asChild>
        <NavLink
          to="/"
          className="text-lg font-medium hover:text-primary transition-colors py-2"
          activeClassName="text-primary"
        >
          Home
        </NavLink>
      </SheetClose>
      <button
        onClick={() => handleNavigation('products')}
        className="text-lg font-medium hover:text-primary transition-colors text-left py-2"
      >
        Products
      </button>
      <button
        onClick={() => handleNavigation('footer')}
        className="text-lg font-medium hover:text-primary transition-colors text-left py-2"
      >
        Contact
      </button>
      <hr className="my-2 border-border" />
      {user ? (
        <>
          <SheetClose asChild>
            <button
              onClick={() => navigate('/profile')}
              className="text-lg font-medium hover:text-primary transition-colors text-left py-2"
            >
              Profile
            </button>
          </SheetClose>
          <SheetClose asChild>
            <button
              onClick={() => navigate('/wishlist')}
              className="text-lg font-medium hover:text-primary transition-colors text-left py-2"
            >
              Wishlist
            </button>
          </SheetClose>
          <SheetClose asChild>
            <button
              onClick={() => navigate('/admin/login')}
              className="text-lg font-medium hover:text-primary transition-colors text-left py-2"
            >
              Admin
            </button>
          </SheetClose>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="text-lg font-medium text-destructive hover:text-destructive/80 transition-colors text-left py-2"
          >
            Logout
          </button>
        </>
      ) : (
        <SheetClose asChild>
          <Button onClick={() => navigate('/auth')} className="w-full">
            Login
          </Button>
        </SheetClose>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GadgetVerse
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
            activeClassName="text-primary"
          >
            Home
          </NavLink>
          <button
            onClick={() => handleNavigation('products')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigation('footer')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/wishlist')}
            aria-label="View wishlist"
            className="hidden sm:flex"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <CurrencySelector />
          
          {/* Desktop User Menu */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User menu">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin/login')}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Login
              </Button>
            )}
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  GadgetVerse
                </span>
              </div>
              <MobileNavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
