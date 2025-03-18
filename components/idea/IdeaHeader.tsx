'use client';

import { Button } from "@/components/ui/button";
import SelectWithSearch from "../ui/select";
import ShareIdeaButton from "../ShareIdeaButton";
import { IDEA_SORT_OPTIONS, STAGE_CONFIG, IDEA_TIME_PERIOD_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import useIdeasFilter from "@/hooks/useIdeasFilter";

export default function IdeasHeader() {
    const { setSort, setStage, sort, stage, setTimePeriod, timePeriod } = useIdeasFilter();

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Startup Ideas</h1>
                    <p className="text-muted-foreground mt-1">
                        Discover and discuss innovative startup concepts from our community
                    </p>
                </div>

                <ShareIdeaButton />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                    {IDEA_SORT_OPTIONS.map((option) => (
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "flex items-center gap-1 hover:bg-muted",
                                sort === option.value && "bg-primary text-primary-foreground"
                            )}
                            key={option.value}
                            onClick={() => setSort(option.value)}
                        >
                            <option.icon className="h-4 w-4" />
                            <span>{option.label}</span>
                        </Button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-full sm:w-auto">
                        <SelectWithSearch
                            options={STAGE_CONFIG.map((config) => ({
                                label: config.label,
                                value: config.value
                            }))}
                            value={stage}
                            onChange={(value) => setStage(value)}
                            label={""}
                            placeholder={"Select Stage"}
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
                            label={""}
                            placeholder={"Select Time Period"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

