"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Flag,
  Coffee,
  MoreHorizontal,
  Trash,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import StageBadge from "@/components/idea/StageBadge";
import Vote from "@/components/idea/Vote";
import { IdeaDetailHeaderProps } from "@/types/props";
import { memo } from "react";
import ShareButton from "@/components/ShareButton";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteIdea from "@/hooks/api/useDeleteIdea";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";


const IdeaDetailHeader = ({ idea }: IdeaDetailHeaderProps) => {
  const { title, user, userBuyMeACoffeeUrl, createdAt, stage } = idea;
  const { data: session } = useSession();
  const { mutate: deleteIdea, isPending: isDeleting } = useDeleteIdea();
  const router = useRouter();


  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const handleDelete = () => {
    deleteIdea(idea._id, {
      onSuccess: () => {
        toast({
          title: "Idea deleted successfully",
        });
        router.push("/ideas");
      },
      onError: () => {
        toast({
          title: "Failed to delete idea",
          description: "Please try again",
          variant: "destructive",
        });
      },
    });
  };

  const handleEdit = () => {
    console.log("Edit idea");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="sm" asChild className="text-sm sm:text-base">
          <Link href="/ideas">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Ideas</span>
          </Link>
        </Button>
      </div>

      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <StageBadge stage={stage} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h1>

        <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between gap-y-2 sm:gap-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>

            <div className="text-sm sm:text-base">
              <div className="font-medium text-white">{user?.name}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Posted {timeAgo}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {userBuyMeACoffeeUrl && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-white border-white text-xs sm:text-sm"
              >
                <Coffee className="h-4 w-4" />
                <span>Support</span>
              </Button>
            )}

            <ShareButton
              className="text-white border-white text-xs sm:text-sm"
              title={title}
            />

            <Button variant="outline" size="icon" className="text-white border-white">
              <Flag className="h-4 w-4" />
            </Button>

            {session?.user?.id === user?._id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="text-white border-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 sm:w-40 bg-background text-white border border-muted">
                  <DropdownMenuItem
                    onClick={handleEdit}
                    className="cursor-pointer hover:bg-muted gap-2 text-sm"
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="cursor-pointer text-red-500 hover:bg-muted gap-2 text-sm"
                  >
                    <Trash className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <Vote votes={idea.votes || []} ideaId={idea._id} />
    </div>
  );
};

export default memo(IdeaDetailHeader);
