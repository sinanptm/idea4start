import { memo } from 'react';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

const ShareIdeaButton = () => {
  return (
    <Link
      href="/share-idea"
      prefetch={true}
      aria-label="Share Your Idea"
    >
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
      >
        <span className="hidden sm:inline">Share Your Idea</span>
        <span className="sm:hidden">Share Your Idea</span>
        <Lightbulb
          className="text-yellow-300 h-5 w-5 sm:h-6 sm:w-6"
          aria-hidden="true"
        />
      </Button>
    </Link>
  );
};

export default memo(ShareIdeaButton);