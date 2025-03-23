import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const IdeaCardSkeleton = () => {
    return (
        Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="bg-card border-gray-800 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        ))
    );
};

export default memo(IdeaCardSkeleton);