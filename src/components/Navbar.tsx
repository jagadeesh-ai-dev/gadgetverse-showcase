import { ShoppingBag, Heart, User, LogOut } from 'lucide-react';
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

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  
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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
      </div>
    </nav>
  );
};

export default Navbar;
