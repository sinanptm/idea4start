import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const FeaturedIdeaSkeleton = () => {
    return (
        Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="bg-card border-gray-800 flex flex-col h-full">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        {/* Category and Trending badge skeletons */}
                        <Skeleton className="h-6 w-24" /> {/* Category badge */}
                        <Skeleton className="h-6 w-28" /> {/* Trending badge */}
                    </div>
                    {/* Title skeleton */}
                    <div className="mt-3 space-y-2">
                        <Skeleton className="h-7 w-[80%]" /> {/* Title line 1 */}
                        <Skeleton className="h-7 w-[60%]" /> {/* Title line 2 */}
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    {/* Description skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[70%]" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-2">
                    <div className="flex justify-between items-center w-full">
                        {/* Likes count skeleton */}
                        <Skeleton className="h-5 w-16" />
                        {/* Author info skeleton */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" /> {/* Avatar */}
                            <Skeleton className="h-5 w-24" /> {/* Author name */}
                        </div>
                    </div>
                    {/* Button skeleton */}
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        ))
    );
};

export default memo(FeaturedIdeaSkeleton);