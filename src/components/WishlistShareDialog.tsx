import { useState } from 'react';
import { Share2, Copy, Facebook, Twitter, MessageCircle, Link2, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useWishlistShare } from '@/hooks/useWishlistShare';
import { toast } from 'sonner';

const WishlistShareDialog = () => {
  const [open, setOpen] = useState(false);
  const { shareUrl, shareToken, createShareLink, revokeShareLink, isLoading } = useWishlistShare();

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleCreateLink = () => {
    createShareLink.mutate();
  };

  const handleRevokeLink = () => {
    revokeShareLink.mutate();
  };

  const shareText = "Check out my wishlist on GadgetVerse!";

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
      getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || '')}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1A94DA]',
      getUrl: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl || '')}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#22C55E]',
      getUrl: () => `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Wishlist
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!shareToken ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Link2 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Create a shareable link to let others view your wishlist
                </p>
              </div>
              <Button 
                onClick={handleCreateLink} 
                disabled={createShareLink.isPending}
                className="w-full"
              >
                {createShareLink.isPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Link2 className="h-4 w-4 mr-2" />
                )}
                Generate Share Link
              </Button>
            </div>
          ) : (
            <>
              {/* Share Link */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your share link</label>
                <div className="flex gap-2">
                  <Input
                    value={shareUrl || ''}
                    readOnly
                    className="text-sm"
                  />
                  <Button size="icon" variant="outline" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Share on social media</label>
                <div className="flex gap-3 justify-center">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      size="icon"
                      className={`${social.color} text-white`}
                      onClick={() => window.open(social.getUrl(), '_blank', 'width=600,height=400')}
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCreateLink}
                  disabled={createShareLink.isPending}
                  className="flex-1"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${createShareLink.isPending ? 'animate-spin' : ''}`} />
                  New Link
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRevokeLink}
                  disabled={revokeShareLink.isPending}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Revoke Link
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistShareDialog;
