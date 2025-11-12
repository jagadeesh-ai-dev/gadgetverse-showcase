import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review_text: string;
  created_at: string;
  updated_at: string;
}

export const useReviews = (productId: string) => {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
  });

  const { data: userReview } = useQuery({
    queryKey: ['user-review', productId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Review | null;
    },
  });

  const { data: averageRating } = useQuery({
    queryKey: ['average-rating', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId);

      if (error) throw error;
      if (!data || data.length === 0) return 0;

      const sum = data.reduce((acc, review) => acc + Number(review.rating), 0);
      return sum / data.length;
    },
  });

  const addReview = useMutation({
    mutationFn: async ({ rating, reviewText }: { rating: number; reviewText: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to leave a review');

      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating,
          review_text: reviewText,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['user-review', productId] });
      queryClient.invalidateQueries({ queryKey: ['average-rating', productId] });
      toast.success('Review submitted successfully');
    },
    onError: (error: Error) => {
      if (error.message.includes('logged in')) {
        toast.error('Please log in to leave a review');
      } else if (error.message.includes('unique')) {
        toast.error('You have already reviewed this product');
      } else {
        toast.error('Failed to submit review');
      }
    },
  });

  const updateReview = useMutation({
    mutationFn: async ({ reviewId, rating, reviewText }: { reviewId: string; rating: number; reviewText: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in');

      const { error } = await supabase
        .from('reviews')
        .update({
          rating,
          review_text: reviewText,
        })
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['user-review', productId] });
      queryClient.invalidateQueries({ queryKey: ['average-rating', productId] });
      toast.success('Review updated successfully');
    },
    onError: () => {
      toast.error('Failed to update review');
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (reviewId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in');

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['user-review', productId] });
      queryClient.invalidateQueries({ queryKey: ['average-rating', productId] });
      toast.success('Review deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete review');
    },
  });

  return {
    reviews,
    userReview,
    averageRating: averageRating || 0,
    reviewCount: reviews.length,
    isLoading,
    addReview,
    updateReview,
    deleteReview,
  };
};
