'use client';

import { memo, useState } from 'react';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';
import CreateIdeaModel from './model/CreateIdeaModel';
const CreteIdea = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variant="outline"
        className="aspect-square max-sm:p-0 bg-sidebar"
        onClick={() => setIsOpen(true)}
      >
        <Lightbulb
          className="sm:-ms-1 text-yellow-300 h-10 w-10"
          aria-hidden="true"
        />
        <span className="max-sm:sr-only">Create New Idea</span>
      </Button>
      <CreateIdeaModel open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

export default memo(CreteIdea);