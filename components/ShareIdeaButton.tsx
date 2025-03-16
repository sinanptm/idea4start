
import { memo } from 'react';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

const ShareIdeaButton = () => {
  return (
    <Link
      href="/share-idea"
      prefetch={true}
    >
      <Button
        variant="outline"
        className="aspect-square max-sm:p-0 bg-sidebar"
      >
        <Lightbulb
          className="sm:-ms-1 text-yellow-300 h-10 w-10"
          aria-hidden="true"
        />
        <span className="max-sm:sr-only">Create New Idea</span>
      </Button>
    </Link>
  );
};

export default memo(ShareIdeaButton);