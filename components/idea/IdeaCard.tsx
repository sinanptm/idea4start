'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import StageBadge from "@/components/idea/StageBadge";
import Vote from "@/components/idea/Vote";
import { IdeaCardProps } from "@/types/props";
import UserAvatar from "@/components/idea/UserAvatar";
import { memo } from "react";

const IdeaCard = ({ idea }: IdeaCardProps) => {
  const {
    _id,
    title,
    description,
    createdAt,
    tags,
    stage,
    businessModel,
    votes
  } = idea;

  // Format date
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  // Truncate description
  const truncatedDescription = description.length > 120 ? `${description.substring(0, 120)}...` : description;

  // Calculate engagement metrics
  const commentCount = Math.floor(Math.random() * 10); // Placeholder for actual comment count

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      {/* User info and metadata section */}
      <div className="flex border-b border-border/80">

        {/* Main content */}
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <Link href={`/ideas/${_id}`} className="hover:underline">
              <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
            </Link>
            <StageBadge stage={stage} />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5" >
              <UserAvatar name={idea.user?.name} url={idea.user?.image} className="h-5 w-5" />
              <span>{idea.user?.name}</span>
            </div>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{truncatedDescription}</p>

          {/* Tags section */}
          <div className="flex flex-wrap gap-1.5">
            {businessModel && (
              <Badge variant="outline" className="bg-primary/10 text-xs">
                {businessModel.replace(/([A-Z])/g, " $1").trim()}
              </Badge>
            )}

            {tags &&
              tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary/30 text-xs">
                  {tag}
                </Badge>
              ))}

            {tags && tags.length > 3 && (
              <Badge variant="secondary" className="bg-secondary/30 text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </div>

      {/* Forum-style footer with engagement metrics */}
      <CardFooter className="px-3 py-2 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Vote votes={votes || []} ideaId={_id} />

          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{commentCount}</span>
            </Button>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
          <Link href={`/ideas/${_id}`}>
            <span className="text-xs">View Thread</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(IdeaCard);