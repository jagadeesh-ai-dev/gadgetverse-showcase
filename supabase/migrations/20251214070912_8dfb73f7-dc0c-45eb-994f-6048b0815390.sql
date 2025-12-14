-- Create promo_banners table
CREATE TABLE public.promo_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Shop Now',
  button_link TEXT,
  theme TEXT NOT NULL DEFAULT 'primary',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;

-- Anyone can view active banners
CREATE POLICY "Anyone can view active banners"
ON public.promo_banners
FOR SELECT
USING (is_active = true);

-- Admins can manage banners
CREATE POLICY "Admins can insert banners"
ON public.promo_banners
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update banners"
ON public.promo_banners
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete banners"
ON public.promo_banners
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all banners"
ON public.promo_banners
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_promo_banners_updated_at
BEFORE UPDATE ON public.promo_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default banners
INSERT INTO public.promo_banners (title, subtitle, button_text, theme) VALUES
('Holiday Sale — Up to 40% Off!', 'Limited time offer on selected gadgets. Don''t miss out!', 'Shop Now', 'primary'),
('Free Shipping on Orders Over ₹2000', 'Get your favorite gadgets delivered to your doorstep for free.', 'Browse Deals', 'gradient'),
('New Arrivals Just Dropped!', 'Check out the latest tech gadgets fresh from top brands.', 'Explore Now', 'accent'),
('Member Exclusive: Extra 10% Off', 'Sign up today and unlock special member-only discounts.', 'Join Now', 'dark');