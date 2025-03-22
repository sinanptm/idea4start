"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Flag, Coffee } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import StageBadge from "@/components/idea/StageBadge";
import Vote from "@/components/idea/Vote";
import { IdeaDetailHeaderProps } from "@/types/props";
import { memo } from "react";
import ShareButton from "@/components/ShareButton";


const IdeaDetailHeader = ({ idea }: IdeaDetailHeaderProps) => {
  const { title, user, userBuyMeACoffeeUrl, createdAt, stage } = idea;

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "?";

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

            <ShareButton title={title} />

            <Button variant="outline" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Vote votes={idea.votes || []} ideaId={idea._id} />
    </div>
  );
};

export default memo(IdeaDetailHeader);

