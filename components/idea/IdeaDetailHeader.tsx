import { IIdea } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Flag, Coffee } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import StageBadge from "@/components/idea/StageBadge";
import useGetVotes from "@/hooks/useGetVotes";

interface IdeaDetailHeaderProps {
  idea: IIdea;
}

export default function IdeaDetailHeader({ idea }: IdeaDetailHeaderProps) {
  const { title, user, userBuyMeACoffeeUrl, createdAt, stage } = idea;
  const { upVotes, downVotes } = useGetVotes(idea.votes || []);

  // Get initials for avatar fallback
  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "?";

  // Format date
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/ideas">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Ideas</span>
          </Link>
        </Button>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <StageBadge stage={stage} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://avatar.vercel.sh/${user?.name}`} alt={user?.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-sm text-muted-foreground">Posted {timeAgo}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {userBuyMeACoffeeUrl && (
              <Button variant="outline" size="sm" className="gap-1.5">
                <Coffee className="h-4 w-4" />
                <span>Support Creator</span>
              </Button>
            )}

            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{upVotes}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ThumbsDown className="h-4 w-4" />
            <span>{downVotes}</span>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {upVotes - downVotes > 0 ? "+" : ""}
          {upVotes - downVotes} points
        </div>
      </div>
    </div>
  );
}

