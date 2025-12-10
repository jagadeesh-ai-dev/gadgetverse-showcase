import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useWishlistShare = () => {
  const queryClient = useQueryClient();

  const { data: shareToken, isLoading } = useQuery({
    queryKey: ['wishlist-share'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('wishlist_shares')
        .select('share_token, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      return data?.share_token || null;
    },
  });

  const createShareLink = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in');

      // Deactivate existing shares
      await supabase
        .from('wishlist_shares')
        .update({ is_active: false })
        .eq('user_id', user.id);

      // Create new share
      const { data, error } = await supabase
        .from('wishlist_shares')
        .insert({ user_id: user.id })
        .select('share_token')
        .single();

      if (error) throw error;
      return data.share_token;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-share'] });
      toast.success('Share link created!');
    },
    onError: () => {
      toast.error('Failed to create share link');
    },
  });

  const revokeShareLink = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('wishlist_shares')
        .update({ is_active: false })
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-share'] });
      toast.success('Share link revoked');
    },
    onError: () => {
      toast.error('Failed to revoke share link');
    },
  });

  const getShareUrl = () => {
    if (!shareToken) return null;
    return `${window.location.origin}/wishlist/shared/${shareToken}`;
  };

  return {
    shareToken,
    isLoading,
    shareUrl: getShareUrl(),
    createShareLink,
    revokeShareLink,
  };
};
