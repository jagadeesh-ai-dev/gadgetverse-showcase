import { Home, Grid3X3, Heart, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProductsClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('products');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('products');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      onClick: () => navigate('/'),
      isActive: location.pathname === '/',
    },
    {
      label: 'Products',
      icon: Grid3X3,
      onClick: handleProductsClick,
      isActive: false, // Products is a scroll action, not a route
    },
    {
      label: 'Wishlist',
      icon: Heart,
      onClick: () => navigate('/wishlist'),
      isActive: location.pathname === '/wishlist',
    },
    {
      label: 'Profile',
      icon: User,
      onClick: () => navigate('/profile'),
      isActive: location.pathname === '/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
              item.isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
