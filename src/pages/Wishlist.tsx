import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProductModal from '@/components/ProductModal';
import { Product } from '@/hooks/useProducts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import WishlistShareDialog from '@/components/WishlistShareDialog';

const Wishlist = () => {
  const { wishlistItems, isLoading } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  if (isAuthenticated === false) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Sign in to view your wishlist</h2>
              <p className="text-muted-foreground mb-6">
                Create an account to save products and access them from any device
              </p>
              <Button onClick={() => navigate('/auth')}>Sign In</Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading || isAuthenticated === null) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">My Wishlist</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <h1 className="text-4xl font-bold">My Wishlist</h1>
            </div>
            {wishlistItems.length > 0 && <WishlistShareDialog />}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground">
                Start adding products to your wishlist by clicking the heart icon
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </>
  );
};

export default Wishlist;
