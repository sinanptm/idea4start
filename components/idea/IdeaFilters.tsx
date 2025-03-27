'use client';

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/useMobile";
import { memo, useEffect, useState } from "react";
import { BUSINESS_MODEL, INDUSTRIES } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import useIdeasFilter from "@/hooks/useIdeasFilter";

const IdeasFilters = () => {
  const isMobile = useIsMobile();
  const {
    search,
    setSearch,
    businessModel,
    setBusinessModel,
    industry,
    setIndustry,
    setPage,
    resetFilters,
    hasActiveFilters
  } = useIdeasFilter();

  const [searchInput, setSearchInput] = useState(search || "");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [defaultAccordionValues, setDefaultAccordionValues] = useState<string[]>([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  useEffect(() => {
    setDefaultAccordionValues(isMobile ? [] : ["business-model", "industry"]);
  }, [isMobile]);

  useEffect(() => {
    setSearch(debouncedSearch || null);
    setPage(1);
  }, [debouncedSearch, setSearch, setPage]);

  const handleSearchClear = () => {
    setSearchInput("");
    setSearch(null);
    setPage(1);
  };

  const handleBusinessModelChange = (modelId: string, checked: boolean) => {
    setBusinessModel(checked ? modelId : null);
    setPage(1);
  };

  const handleIndustryChange = (industryId: string, checked: boolean) => {
    setIndustry(checked ? industryId : null);
    setPage(1);
  };

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  const FilterContent = () => (
    <>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValues}
        className="transition-all duration-200"
      >
        <AccordionItem value="business-model">
          <AccordionTrigger className="text-sm font-medium">
            Business Model
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1 max-h-[200px] overflow-y-auto pr-2">
              {BUSINESS_MODEL.map((model) => (
                <div key={model.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`model-${model.id}`}
                    checked={businessModel === model.id}
                    onCheckedChange={(checked) =>
                      handleBusinessModelChange(model.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`model-${model.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {model.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="industry">
          <AccordionTrigger className="text-sm font-medium">
            Industry
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1 max-h-[200px] overflow-y-auto pr-2">
              {INDUSTRIES.map((ind) => (
                <div key={ind.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${ind.id}`}
                    checked={industry === ind.id}
                    onCheckedChange={(checked) =>
                      handleIndustryChange(ind.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`industry-${ind.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ind.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        variant="outline"
        size="sm"
        className="w-full flex items-center gap-2"
        onClick={resetFilters}
        disabled={!hasActiveFilters}
      >
        <Filter className="h-4 w-4" />
        <span>Reset Filters</span>
      </Button>
    </>
  );

  // Mobile view
  if (isMobile) {
    return (
      <div className="bg-card rounded-lg border w-full">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Search</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ideas..."
                className="pl-8"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between px-2 py-1 rounded-md bg-muted/50">
              <div className="text-sm flex gap-1 flex-wrap">
                {businessModel && (
                  <span className="bg-muted px-2 py-0.5 rounded text-xs">
                    {BUSINESS_MODEL.find(m => m.id === businessModel)?.label}
                  </span>
                )}
                {industry && (
                  <span className="bg-muted px-2 py-0.5 rounded text-xs">
                    {INDUSTRIES.find(i => i.id === industry)?.label}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-6 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2 justify-between"
            onClick={toggleFilters}
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters {hasActiveFilters && "(Active)"}</span>
            </div>
            {filtersExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {filtersExpanded && (
          <div className="p-4 pt-0 border-t space-y-4">
            <FilterContent />
          </div>
        )}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="bg-card rounded-lg border p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Search</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ideas..."
            className="pl-8"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              onClick={handleSearchClear}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <FilterContent />
    </div>
  );
};

export default memo(IdeasFilters);