import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Product } from './useProducts';

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id, products(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(item => item.products).filter(Boolean) as Product[];
    },
  });

  const { data: wishlistIds = [] } = useQuery({
    queryKey: ['wishlist-ids'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id');

      if (error) throw error;
      return data.map(item => item.product_id);
    },
  });

  const addToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to add to wishlist');

      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, product_id: productId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-ids'] });
      toast.success('Added to wishlist');
    },
    onError: (error: Error) => {
      if (error.message.includes('logged in')) {
        toast.error('Please log in to add to wishlist');
      } else {
        toast.error('Failed to add to wishlist');
      }
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in');

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-ids'] });
      toast.success('Removed from wishlist');
    },
    onError: () => {
      toast.error('Failed to remove from wishlist');
    },
  });

  const toggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      removeFromWishlist.mutate(productId);
    } else {
      addToWishlist.mutate(productId);
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return {
    wishlistItems,
    isLoading,
    toggleWishlist,
    isInWishlist,
  };
};
