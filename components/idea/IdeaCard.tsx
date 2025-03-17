'use client'

import type { IIdea } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, MessageSquare, Coffee } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import StageBadge from "@/components/idea/StageBadge"

interface IdeaCardProps {
  idea: IIdea
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const {
    _id,
    title,
    description,
    createdAt,
    userBuyMeACoffeeUrl,
    tags,
    upVotes = 0,
    downVotes = 0,
    stage,
    businessModel,
  } = idea

  // Get initials for avatar fallback
  const initials = idea.user?.name
    ? idea.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?"

  // Format date
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  // Truncate description
  const truncatedDescription = description.length > 160 ? `${description.substring(0, 160)}...` : description

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <Link href={`/ideas/${_id}`} className="hover:underline">
              <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={idea.user?.image} alt={idea.user?.name} />
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
                <span>{idea.user?.name}</span>
              </div>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          <StageBadge stage={stage} />
        </div>

        <p className="mt-3 text-muted-foreground">{truncatedDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {businessModel && (
            <Badge variant="outline" className="bg-primary/10">
              {businessModel.replace(/([A-Z])/g, " $1").trim()}
            </Badge>
          )}

          {tags &&
            tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary/30">
                {tag}
              </Badge>
            ))}

          {tags && tags.length > 3 && (
            <Badge variant="secondary" className="bg-secondary/30">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{upVotes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{downVotes}</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Discuss</span>
          </Button>
        </div>

        {userBuyMeACoffeeUrl && (
          <Button variant="outline" size="sm" className="h-8">
            <Coffee className="h-4 w-4 mr-1.5" />
            <span>Support</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

