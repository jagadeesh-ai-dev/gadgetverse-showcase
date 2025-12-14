import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string | null;
  theme: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePromoBanners = (activeOnly = true) => {
  return useQuery({
    queryKey: ['promo-banners', activeOnly],
    queryFn: async () => {
      let query = supabase
        .from('promo_banners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as PromoBanner[];
    },
  });
};

export const useCreatePromoBanner = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (banner: Omit<PromoBanner, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('promo_banners')
        .insert(banner)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-banners'] });
      toast({ title: 'Banner created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to create banner', description: error.message, variant: 'destructive' });
    },
  });
};

export const useUpdatePromoBanner = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PromoBanner> & { id: string }) => {
      const { data, error } = await supabase
        .from('promo_banners')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-banners'] });
      toast({ title: 'Banner updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to update banner', description: error.message, variant: 'destructive' });
    },
  });
};

export const useDeletePromoBanner = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('promo_banners')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-banners'] });
      toast({ title: 'Banner deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to delete banner', description: error.message, variant: 'destructive' });
    },
  });
};
