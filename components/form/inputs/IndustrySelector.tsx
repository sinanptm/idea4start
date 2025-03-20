"use client";

import { memo, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { INDUSTRIES } from '@/constants';

interface IndustrySelectorProps {
  onSelect: (industries: string[]) => void;
  error?: string;
  defaultValue?: string[];
}

const IndustrySelector = ({ onSelect, error, defaultValue }: IndustrySelectorProps) => {
  const [selectedIndustries, setSelectedIndustries] = useState<Option[]>([]);

  useEffect(() => {
    setSelectedIndustries(defaultValue?.map(industry => ({ value: industry })) || []);
  }, [defaultValue]);

  const handleSelect = (options: Option[]) => {
    setSelectedIndustries(options);
    onSelect(options.map(opt => opt.value));
  };

  return (
    <div className="*:not-first:mt-2">
      <Label>Industry *</Label>
      <MultipleSelector
        commandProps={{
          label: "Select industries",
        }}
        value={selectedIndustries} 
        defaultOptions={INDUSTRIES.map(el=>({value:el.label}))}
        placeholder="Select industries"
        hideClearAllButton={false}
        hidePlaceholderWhenSelected
        onChange={handleSelect}
        emptyIndicator={<p className="text-center text-sm">No industries found</p>}
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