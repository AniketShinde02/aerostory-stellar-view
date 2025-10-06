import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  url = window.location.href, 
  title = 'AeroStory - Stellar Stories',
  text = 'Check out this amazing space weather story!',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback to copy URL
      handleCopyUrl();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);

    let shareUrl = '';
    
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="sm"
        className="bg-transparent border-primary/30 text-primary hover:bg-primary/20 hover:text-white hover:border-primary transition-all duration-200"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {/* Social sharing options (shown on hover or click for desktop) */}
      <div className="absolute top-full left-0 mt-2 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg p-2 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
        <div className="flex flex-col gap-1 min-w-[120px]">
          <Button
            onClick={() => handleSocialShare('linkedin')}
            variant="ghost"
            size="sm"
            className="justify-start text-xs hover:bg-primary/20 hover:text-white"
          >
            LinkedIn
          </Button>
          <Button
            onClick={() => handleSocialShare('whatsapp')}
            variant="ghost"
            size="sm"
            className="justify-start text-xs hover:bg-primary/20 hover:text-white"
          >
            WhatsApp
          </Button>
          <Button
            onClick={() => handleSocialShare('twitter')}
            variant="ghost"
            size="sm"
            className="justify-start text-xs hover:bg-primary/20 hover:text-white"
          >
            Twitter
          </Button>
          <Button
            onClick={() => handleSocialShare('facebook')}
            variant="ghost"
            size="sm"
            className="justify-start text-xs hover:bg-primary/20 hover:text-white"
          >
            Facebook
          </Button>
          <Button
            onClick={() => handleSocialShare('telegram')}
            variant="ghost"
            size="sm"
            className="justify-start text-xs hover:bg-primary/20 hover:text-white"
          >
            Telegram
          </Button>
          <hr className="border-primary/20 my-1" />
          <Button
            onClick={handleCopyUrl}
            variant="ghost"
            size="sm"
            className="justify-start text-xs hover:bg-primary/20 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;
