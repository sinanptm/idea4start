"use client";

import { memo, useState } from 'react';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { AlertTriangle } from 'lucide-react';

interface RelatedUrlSelectorProps {
  onSelect: (urls: string[]) => void;
  error?: string;
  defaultValue?: string[];
}

const RelatedUrlSelector = ({ onSelect, error, defaultValue }: RelatedUrlSelectorProps) => {
  const [selectedUrls, setSelectedUrls] = useState<Option[]>([]);

  const handleSelect = (options: Option[]) => {
    setSelectedUrls(options);
    onSelect(options.map(opt => opt.value));
  };

  // const validateUrl = (url: string): boolean => {
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };

  return (
    <div className="*:not-first:mt-2">
      <Label>Related URLs </Label>
      <MultipleSelector
        commandProps={{
          label: "Add related URLs",
        }}
        value={selectedUrls}
        defaultOptions={defaultValue?.map(url => ({ value: url })) || []}
        placeholder="Enter URLs (e.g., website, GitHub)"
        hideClearAllButton={false}
        hidePlaceholderWhenSelected
        onChange={handleSelect}
        emptyIndicator={<p className="text-center text-sm">No URLs added</p>}
        creatable
      />
      {error && (
        <p className="text-destructive text-sm flex items-center gap-1" role="alert">
          <AlertTriangle size={12} />
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(RelatedUrlSelector);