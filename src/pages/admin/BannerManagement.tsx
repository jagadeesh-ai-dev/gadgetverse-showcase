import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { usePromoBanners, useCreatePromoBanner, useUpdatePromoBanner, useDeletePromoBanner, PromoBanner } from '@/hooks/usePromoBanners';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Skeleton } from '@/components/ui/skeleton';

const themes = [
  { value: 'primary', label: 'Primary (Blue)', color: 'bg-primary' },
  { value: 'gradient', label: 'Gradient (Purple/Pink)', color: 'bg-gradient-to-r from-blue-600 to-pink-500' },
  { value: 'accent', label: 'Accent (Green/Teal)', color: 'bg-gradient-to-r from-emerald-500 to-cyan-500' },
  { value: 'dark', label: 'Dark (Slate)', color: 'bg-slate-700' },
];

interface BannerFormData {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  theme: string;
  is_active: boolean;
}

const initialFormData: BannerFormData = {
  title: '',
  subtitle: '',
  button_text: 'Shop Now',
  button_link: '',
  theme: 'primary',
  is_active: true,
};

const BannerManagement = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: isAdminLoading } = useAdminRole();
  const { data: banners, isLoading } = usePromoBanners(false);
  const createBanner = useCreatePromoBanner();
  const updateBanner = useUpdatePromoBanner();
  const deleteBanner = useDeletePromoBanner();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null);
  const [formData, setFormData] = useState<BannerFormData>(initialFormData);

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleOpenDialog = (banner?: PromoBanner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle,
        button_text: banner.button_text,
        button_link: banner.button_link || '',
        theme: banner.theme,
        is_active: banner.is_active,
      });
    } else {
      setEditingBanner(null);
      setFormData(initialFormData);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBanner) {
      await updateBanner.mutateAsync({
        id: editingBanner.id,
        ...formData,
        button_link: formData.button_link || null,
      });
    } else {
      await createBanner.mutateAsync({
        ...formData,
        button_link: formData.button_link || null,
      });
    }
    
    setIsDialogOpen(false);
    setEditingBanner(null);
    setFormData(initialFormData);
  };

  const handleToggleActive = async (banner: PromoBanner) => {
    await updateBanner.mutateAsync({
      id: banner.id,
      is_active: !banner.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteBanner.mutateAsync(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Banner Management</h1>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingBanner ? 'Edit Banner' : 'Create New Banner'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Holiday Sale — Up to 40% Off!"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Limited time offer on selected gadgets."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="button_text">Button Text</Label>
                    <Input
                      id="button_text"
                      value={formData.button_text}
                      onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                      placeholder="Shop Now"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="button_link">Button Link (optional)</Label>
                    <Input
                      id="button_link"
                      value={formData.button_link}
                      onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                      placeholder="#products"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => setFormData({ ...formData, theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${theme.color}`} />
                            {theme.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active">Active</Label>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={createBanner.isPending || updateBanner.isPending}>
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : banners && banners.length > 0 ? (
          <div className="grid gap-4">
            {banners.map((banner) => {
              const theme = themes.find((t) => t.value === banner.theme);
              return (
                <Card key={banner.id} className={`${!banner.is_active ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg ${theme?.color || 'bg-primary'} flex-shrink-0`} />
                        <div>
                          <h3 className="font-semibold">{banner.title}</h3>
                          <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">{banner.button_text}</span>
                            <span className="text-xs text-muted-foreground">{theme?.label}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(banner)}
                          title={banner.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {banner.is_active ? (
                            <Eye className="h-4 w-4 text-green-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(banner)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Banner</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this banner? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(banner.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No banners found. Create your first banner to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BannerManagement;
