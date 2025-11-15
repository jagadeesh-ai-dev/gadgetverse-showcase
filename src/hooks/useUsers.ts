import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  role: 'admin' | 'user';
  created_at: string;
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Get all user roles
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user roles:', error);
        throw error;
      }

      // Since we can't access auth.users from client, we'll work with user_roles only
      // In a production app, you'd create an edge function to get full user details
      const users: UserProfile[] = userRoles.map(role => ({
        id: role.id,
        user_id: role.user_id,
        email: null, // Email not available from client side
        role: role.role,
        created_at: role.created_at,
      }));

      return users;
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'user' }) => {
      // Update existing role
      const { error } = await supabase
        .from('user_roles')
        .update({ role })
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      // Delete user role (in production, you'd use an edge function to delete the actual user)
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User role removed successfully');
    },
    onError: (error) => {
      console.error('Error removing user role:', error);
      toast.error('Failed to remove user role');
    },
  });
};
