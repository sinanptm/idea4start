import type { IIdea } from "@/types"
import IdeaCard from "@/components/idea/IdeaCard"

interface IdeasListProps {
  ideas: IIdea[]
}

export default function IdeasList({ ideas }: IdeasListProps) {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border">
        <h3 className="text-lg font-medium">No ideas found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea._id} idea={idea} />
      ))}
    </div>
  )
}

