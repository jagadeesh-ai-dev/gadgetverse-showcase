import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';
import { Star, Check, X, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useReviews } from '@/hooks/useReviews';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/hooks/useReviews';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { formatPrice } = useCurrency();
  const { reviews, userReview, averageRating, reviewCount, addReview, updateReview, deleteReview } = useReviews(product?.id || '');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user?.id || null);
    });
  }, []);
  
  if (!product) return null;

  const handleSubmitReview = (rating: number, reviewText: string) => {
    if (editingReview) {
      updateReview.mutate(
        { reviewId: editingReview.id, rating, reviewText },
        { onSuccess: () => setEditingReview(null) }
      );
    } else {
      addReview.mutate({ rating, reviewText });
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
  };

  const handleDeleteReview = (reviewId: string) => {
    deleteReview.mutate(reviewId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full rounded-lg"
                />
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="ml-1 font-bold text-lg">
                      {averageRating > 0 ? averageRating.toFixed(1) : product.rating}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.is_top_deal && (
                    <Badge variant="destructive">TOP DEAL</Badge>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-green-600">Pros</h3>
                    <ul className="space-y-2">
                      {product.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-destructive">Cons</h3>
                    <ul className="space-y-2">
                      {product.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  asChild
                >
                  <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Buy Now on Partner Site <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">
                  {averageRating > 0 ? averageRating.toFixed(1) : product.rating}
                </div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating > 0 ? averageRating : product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                </p>
              </div>
              <Separator orientation="vertical" className="h-20" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Based on verified customer reviews
                </p>
              </div>
            </div>

            {currentUser && !userReview && !editingReview && (
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Write a Review</h3>
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  isLoading={addReview.isPending}
                />
              </div>
            )}

            {editingReview && (
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Edit Your Review</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingReview(null)}
                  >
                    Cancel
                  </Button>
                </div>
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  isLoading={updateReview.isPending}
                  existingRating={editingReview.rating}
                  existingReviewText={editingReview.review_text}
                  isEditing
                />
              </div>
            )}

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-4">Customer Reviews</h3>
              <ReviewsList
                reviews={reviews}
                currentUserId={currentUser || undefined}
                onDelete={handleDeleteReview}
                onEdit={handleEditReview}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
