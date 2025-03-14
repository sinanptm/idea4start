"use client";

import { memo, useState } from 'react';
import { Label } from '../ui/label';
import MultipleSelector, { Option } from '../ui/multiselect';

interface IndustrySelectorProps {
  onSelect: (industries: string[]) => void;
  error?: string;
}

const defaultIndustries: Option[] = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Education', label: 'Education' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Food & Beverage', label: 'Food & Beverage' }
];

const IndustrySelector = ({ onSelect, error }: IndustrySelectorProps) => {
  const [selectedIndustries, setSelectedIndustries] = useState<Option[]>([]);

  const handleSelect = (options: Option[]) => {
    setSelectedIndustries(options);
    onSelect(options.map(opt => opt.value));
  };

  return (
    <div className="*:not-first:mt-2">
      <Label>Industry</Label>
      <MultipleSelector
        commandProps={{
          label: "Select industries",
        }}
        value={selectedIndustries}
        defaultOptions={defaultIndustries}
        placeholder="Select industries"
        hideClearAllButton={false}
        hidePlaceholderWhenSelected
        onChange={handleSelect}
        emptyIndicator={<p className="text-center text-sm">No industries found</p>}
        creatable
      />
      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(IndustrySelector);