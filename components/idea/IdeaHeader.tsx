'use client'

import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Clock, ThumbsUp } from "lucide-react";
import SelectWithSearch from "../ui/select";

export default function IdeasHeader() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Startup Ideas</h1>
                    <p className="text-muted-foreground mt-1">
                        Discover and discuss innovative startup concepts from our community
                    </p>
                </div>

                <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    <span>Share Idea</span>
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Trending</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Latest</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Top Voted</span>
                    </Button>
                </div>

                <div className="w-full sm:w-auto">
                    <SelectWithSearch
                        options={[
                            { label: "All Stages", value: "all" },
                            { label: "Idea", value: "idea" },
                            { label: "Validation", value: "validation" },
                            { label: "Prototype", value: "prototype" },
                            { label: "MVP", value: "mvp" },
                            { label: "Launched", value: "launched" },
                        ]}
                        value={""}
                        onChange={() => { }}
                        label={"All Stages"}
                    />
                </div>
            </div>
        </div>
    );
}

