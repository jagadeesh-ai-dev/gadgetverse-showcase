-- Create table for wishlist share tokens
CREATE TABLE public.wishlist_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  share_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wishlist_shares ENABLE ROW LEVEL SECURITY;

-- Users can manage their own share tokens
CREATE POLICY "Users can view own shares"
ON public.wishlist_shares
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own shares"
ON public.wishlist_shares
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shares"
ON public.wishlist_shares
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shares"
ON public.wishlist_shares
FOR DELETE
USING (auth.uid() = user_id);

-- Public can view active share tokens (for shared wishlist page)
CREATE POLICY "Anyone can view active shares"
ON public.wishlist_shares
FOR SELECT
USING (is_active = true);