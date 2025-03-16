import { Skeleton } from "@/components/ui/skeleton"
import { memo } from "react"
const IdeaHeaderSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-80 mt-1" />
        </div>

        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        <Skeleton className="h-9 w-full sm:w-48" />
      </div>
    </div>
  )
}

export default memo(IdeaHeaderSkeleton)
