"use client"

import IdeaCard from "@/components/idea/IdeaCard"
import IdeaListPagination from "@/components/idea/IdeaListPagination"
import IdeasListSkeleton from "@/components/skeleton/IdeaListSkeleton"
import useIdeasFilter from "@/hooks/useIdeasFilter"
import useGetIdeas from "@/hooks/api/useGetIdeas"
import { AlertCircle, Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const IdeasList = () => {
  const { page, sort, stage, businessModel, industry, search } = useIdeasFilter()
  const { data, isLoading, error, refetch } = useGetIdeas({
    page,
    sort,
    stage,
    businessModel: businessModel!,
    industry: industry!,
    search: search!,
    limit: 7
  })

  console.log(data);
  

  // Loading state with skeleton
  if (isLoading) {
    return <IdeasListSkeleton />
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading ideas</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>There was a problem loading the ideas. Please try again later.</p>
          <Button variant="outline" size="sm" className="w-fit" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // No ideas found state
  if (!data || data.ideas.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border flex flex-col items-center gap-4">
        <div className="bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-medium">No ideas found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
        </div>
        <Button variant="outline" className="mt-2" onClick={() => window.history.pushState(null, "", "?")}>
          Clear all filters
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {data.ideas.map((idea) => (
        <IdeaCard key={idea._id} idea={idea} />
      ))}

      <IdeaListPagination currentPage={page} totalPages={data.pagination.totalPages} />
    </div>
  )
}

export default IdeasList

