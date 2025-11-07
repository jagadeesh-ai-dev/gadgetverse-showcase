import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminRole } from '@/hooks/useAdminRole';
import { uploadProductImage, Product } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  affiliate_link: z.string().url('Must be a valid URL'),
});

export default function ProductForm() {
  const { id } = useParams();
  const { loading: authLoading } = useAdminRole();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Smartphones',
    price: '',
    rating: '4.5',
    description: '',
    features: '',
    pros: '',
    cons: '',
    affiliate_link: '',
    is_top_deal: false,
    image_url: '',
  });

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const product = data as Product;
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        rating: product.rating.toString(),
        description: product.description,
        features: product.features.join('\n'),
        pros: product.pros.join('\n'),
        cons: product.cons.join('\n'),
        affiliate_link: product.affiliate_link,
        is_top_deal: product.is_top_deal,
        image_url: product.image_url,
      });
      setImagePreview(product.image_url);
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/admin/dashboard');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form
      productSchema.parse({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        description: formData.description,
        affiliate_link: formData.affiliate_link,
      });

      setLoading(true);

      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      if (!imageUrl && !id) {
        toast.error('Please select an image');
        return;
      }

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        image_url: imageUrl,
        description: formData.description.trim(),
        features: formData.features.split('\n').filter(f => f.trim()),
        pros: formData.pros.split('\n').filter(p => p.trim()),
        cons: formData.cons.split('\n').filter(c => c.trim()),
        affiliate_link: formData.affiliate_link.trim(),
        is_top_deal: formData.is_top_deal,
      };

      if (id) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Product created successfully');
      }

      navigate('/admin/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>{id ? 'Edit Product' : 'Add New Product'}</CardTitle>
            <CardDescription>
              {id ? 'Update product information' : 'Create a new product listing'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview('');
                            setFormData({ ...formData, image_url: '' });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Max size: 5MB. Recommended: 800x600px
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Smartphones">Smartphones</SelectItem>
                        <SelectItem value="Smartwatches">Smartwatches</SelectItem>
                        <SelectItem value="Earbuds">Earbuds</SelectItem>
                        <SelectItem value="Cameras">Cameras</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (0-5) *</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    rows={4}
                    placeholder="6.7-inch display&#10;5000mAh battery&#10;128GB storage"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pros">Pros (one per line)</Label>
                    <Textarea
                      id="pros"
                      rows={4}
                      placeholder="Great battery life&#10;Beautiful display&#10;Fast performance"
                      value={formData.pros}
                      onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cons">Cons (one per line)</Label>
                    <Textarea
                      id="cons"
                      rows={4}
                      placeholder="Expensive&#10;Heavy&#10;No headphone jack"
                      value={formData.cons}
                      onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affiliate_link">Affiliate Link *</Label>
                  <Input
                    id="affiliate_link"
                    type="url"
                    placeholder="https://example.com/product"
                    value={formData.affiliate_link}
                    onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_top_deal"
                    checked={formData.is_top_deal}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_top_deal: checked })}
                  />
                  <Label htmlFor="is_top_deal">Mark as Top Deal</Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Saving...' : id ? 'Update Product' : 'Create Product'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
