import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { useCurrency } from '@/contexts/CurrencyContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const SharedWishlist = () => {
  const { token } = useParams<{ token: string }>();
  const { formatPrice } = useCurrency();

  const { data, isLoading, error } = useQuery({
    queryKey: ['shared-wishlist', token],
    queryFn: async () => {
      if (!token) throw new Error('No token provided');

      // Get the share record
      const { data: shareData, error: shareError } = await supabase
        .from('wishlist_shares')
        .select('user_id')
        .eq('share_token', token)
        .eq('is_active', true)
        .single();

      if (shareError || !shareData) throw new Error('Invalid or expired share link');

      // Get the wishlist items for this user
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlist')
        .select('product_id, products(*)')
        .eq('user_id', shareData.user_id)
        .order('created_at', { ascending: false });

      if (wishlistError) throw wishlistError;

      return wishlistData.map(item => item.products).filter(Boolean) as Product[];
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Shared Wishlist</h1>
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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Link Not Found</h2>
              <p className="text-muted-foreground">
                This wishlist link is invalid or has been revoked
              </p>
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
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-4xl font-bold">Shared Wishlist</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Someone shared their favorite gadgets with you!
          </p>

          {data && data.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">This wishlist is empty</h2>
              <p className="text-muted-foreground">
                No products have been added yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.is_top_deal && (
                      <Badge className="absolute top-3 left-3 bg-primary">
                        Top Deal
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <Button size="sm" asChild>
                        <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SharedWishlist;
