import { Review } from '@/hooks/useReviews';
import { Star, Trash2, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ReviewsListProps {
  reviews: Review[];
  currentUserId?: string;
  onDelete: (reviewId: string) => void;
  onEdit: (review: Review) => void;
}

const ReviewsList = ({ reviews, currentUserId, onDelete, onEdit }: ReviewsListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (reviewId: string) => {
    setDeletingId(reviewId);
    await onDelete(reviewId);
    setDeletingId(null);
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const isOwnReview = currentUserId === review.user_id;
        
        return (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{review.rating}/5</span>
                </div>
                {isOwnReview && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(review)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(review.id)}
                      disabled={deletingId === review.id}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-sm text-foreground mb-2">{review.review_text}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReviewsList;
