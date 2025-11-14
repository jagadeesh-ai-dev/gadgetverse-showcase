import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review must be less than 500 characters')
    .refine((text) => text.trim().length >= 10, 'Review cannot be only spaces')
    .refine((text) => {
      const profanityList = ['spam', 'fake', 'scam']; // Add more as needed
      const lowerText = text.toLowerCase();
      return !profanityList.some(word => lowerText.includes(word));
    }, 'Review contains inappropriate content'),
});

interface ReviewFormProps {
  onSubmit: (rating: number, reviewText: string) => void;
  isLoading: boolean;
  existingRating?: number;
  existingReviewText?: string;
  isEditing?: boolean;
}

const ReviewForm = ({ onSubmit, isLoading, existingRating, existingReviewText, isEditing }: ReviewFormProps) => {
  const [rating, setRating] = useState(existingRating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState(existingReviewText || '');

  useEffect(() => {
    if (existingRating) setRating(existingRating);
    if (existingReviewText) setReviewText(existingReviewText);
  }, [existingRating, existingReviewText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      reviewSchema.parse({ rating, reviewText });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    onSubmit(rating, reviewText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Your Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Your Review</Label>
        <Textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">
          {reviewText.length}/500 characters
        </p>
      </div>

      <Button type="submit" disabled={isLoading || rating === 0 || !reviewText.trim()}>
        {isLoading ? 'Submitting...' : isEditing ? 'Update Review' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
