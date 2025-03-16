import { Skeleton } from "@/components/ui/skeleton"

export default function IdeasListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="p-6 bg-card rounded-lg border space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-20 w-full" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, tagIndex) => (
              <Skeleton key={tagIndex} className="h-6 w-20 rounded-full" />
            ))}
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  )
}
