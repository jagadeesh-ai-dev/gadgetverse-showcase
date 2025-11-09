import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';
import { User as UserIcon, Heart, Settings, Lock } from 'lucide-react';
import { z } from 'zod';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Product } from '@/hooks/useProducts';

const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      passwordSchema.parse(newPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  const handleNotificationToggle = (checked: boolean) => {
    setEmailNotifications(checked);
    toast.success(checked ? 'Email notifications enabled' : 'Email notifications disabled');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-96 bg-muted animate-pulse rounded-lg" />
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
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <UserIcon className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">My Profile</h1>
            </div>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>View your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <Input 
                    value={new Date(user?.created_at || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 
                    disabled 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button type="submit" disabled={loading || !newPassword || !confirmPassword}>
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about price drops and new deals
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Wishlist History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary fill-primary" />
                  Wishlist History
                </CardTitle>
                <CardDescription>
                  You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Your wishlist is empty. Start adding products!
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate('/')}
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {wishlistItems.slice(0, 3).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onViewDetails={setSelectedProduct}
                        />
                      ))}
                    </div>
                    {wishlistItems.length > 3 && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/wishlist')}
                      >
                        View All Wishlist Items ({wishlistItems.length})
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
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

export default Profile;
