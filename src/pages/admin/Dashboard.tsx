import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { LogOut, Plus, Edit, Trash2, TrendingUp, Users, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from '@/components/admin/UserManagement';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
  const { loading: authLoading } = useAdminRole();
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [products, searchQuery, categoryFilter, sortBy]);

  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProduct.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage your products and users</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/products/add')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Overview of your product inventory</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold">{products?.length || 0}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Top Deals</p>
                <p className="text-3xl font-bold">
                  {products?.filter(p => p.is_top_deal).length || 0}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-3xl font-bold">
                  {categories.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filter & Sort Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.is_top_deal && (
                        <Badge className="absolute top-2 right-2">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Top Deal
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline">{product.category}</Badge>
                        <span className="ml-2 text-lg font-bold">${product.price}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || categoryFilter !== 'all' 
                      ? 'No products match your filters' 
                      : 'No products yet'}
                  </p>
                  {!searchQuery && categoryFilter === 'all' && (
                    <Button onClick={() => navigate('/admin/products/add')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Product
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
