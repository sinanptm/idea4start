import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { memo } from "react"

const IdeaListSkeleton = () => {
    return (
        <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <Skeleton className="h-7 w-64" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>

              <Skeleton className="h-8 w-24" />
            </div>

            <Skeleton className="h-8 w-24" />
          </CardFooter>
        </Card>
      ))}

      <div className="flex items-center justify-center gap-2 py-4">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
            </div>
        </div>
    )
}

export default memo(IdeaListSkeleton)
