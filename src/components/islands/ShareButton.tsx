import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button type="button" onClick={handleShare} aria-label="Share this article">
      {copied ? <Check aria-hidden="true" size={16} /> : <Share2 aria-hidden="true" size={16} />}
      <span>{copied ? 'copied' : 'share'}</span>
    </Button>
  );
}
