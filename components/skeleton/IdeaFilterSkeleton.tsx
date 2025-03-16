import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const IdeaFiltersSkeleton = () => {
    return (
        <div className="bg-card rounded-lg border p-4 space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <div className="space-y-2 pt-1">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <div className="space-y-2 pt-1">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Skeleton className="h-9 w-full" />
        </div>
    );
};

export default memo(IdeaFiltersSkeleton);
