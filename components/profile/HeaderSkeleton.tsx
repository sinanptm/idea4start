import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Avatar skeleton */}
                <Skeleton className="h-20 w-20 rounded-full border-2 border-primary/20" />

                <div>
                    {/* Name skeleton */}
                    <Skeleton className="h-8 w-48 mb-2" />
                    {/* Designation and company skeleton */}
                    <Skeleton className="h-5 w-64" />
                </div>
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-10 w-28" />
        </div>
    );
};

export default memo(HeaderSkeleton);