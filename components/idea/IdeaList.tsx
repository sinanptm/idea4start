'use client'

import IdeaCard from "@/components/idea/IdeaCard"
import IdeaListPagination from "@/components/idea/IdeaListPagination"
import useIdeasFilter from "@/hooks/useIdeasFilter"
import { MOCK_IDEAS } from "@/constants/mock"


const IdeasList = () => {
  const { page } = useIdeasFilter();

  

  if (MOCK_IDEAS.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border">
        <h3 className="text-lg font-medium">No ideas found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {MOCK_IDEAS.map((idea) => (
        <IdeaCard key={idea._id} idea={idea} />
      ))}

      <IdeaListPagination currentPage={page} totalPages={10} />
    </div>
  )
}

export default IdeasList;
