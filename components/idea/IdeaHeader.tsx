'use client';

import { Button } from "@/components/ui/button";
import SelectWithSearch from "../ui/select";
import ShareIdeaButton from "../ShareIdeaButton";
import { IDEA_SORT_OPTIONS, STAGE_CONFIG, IDEA_TIME_PERIOD_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import useIdeasFilter from "@/hooks/useIdeasFilter";
import { useIsMobile } from "@/hooks/useMobile";
import { memo } from "react";

const IdeasHeader = () => {
    const { setSort, setStage, sort, stage, setTimePeriod, timePeriod } = useIdeasFilter();
    const isMobile = useIsMobile();

    const renderSortOptions = () => (
        <div className="flex flex-wrap items-center gap-2">
            {IDEA_SORT_OPTIONS.map((option) => (
                <Button
                    // variant="outline"
                    size="sm"
                    className={cn(
                        "flex items-center gap-1 rounded-full px-3 py-1 h-auto bg-primary/10 text-primary border-primary/30 font-medium",
                        sort === option.value && "bg-primary/50 text-primary border-primary/40"
                    )}
                    key={option.value}
                    onClick={() => setSort(option.value)}
                >
                    <option.icon className="h-4 w-4" />
                    <span>{option.label}</span>
                </Button>
            ))}
        </div>
    );

    const renderFilterOptions = () => (
        <div className="flex items-center gap-2">
            <div className="w-full sm:w-auto">
                <SelectWithSearch
                    options={STAGE_CONFIG.map((config) => ({
                        label: config.label,
                        value: config.value
                    }))}
                    value={stage}
                    onChange={(value) => setStage(value)}
                    label=""
                    placeholder={isMobile ? "All" : "Select Stage"}
                    className={isMobile ? "text-sm" : ""}
                />
            </div>
            <div className="w-full sm:w-auto">
                <SelectWithSearch
                    options={IDEA_TIME_PERIOD_OPTIONS.map((option) => ({
                        label: option.label,
                        value: option.value
                    }))}
                    value={timePeriod}
                    onChange={(value) => setTimePeriod(value)}
                    label=""
                    placeholder={isMobile ? "Monthly" : "Select Time Period"}
                    className={isMobile ? "text-sm" : ""}
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Startup Ideas</h1>
                    <p className="text-muted-foreground text-sm sm:text-lg mt-1">
                        Discover and discuss innovative startup concepts from our community
                    </p>
                </div>

                <ShareIdeaButton />
            </div>

            <div className={cn(
                "flex flex-col gap-4 pt-4 border-t border-gray-800",
                !isMobile && "sm:flex-row sm:justify-between sm:items-center"
            )}>
                {renderSortOptions()}
                {renderFilterOptions()}
            </div>
        </div>
    );
}

export default memo(IdeasHeader)