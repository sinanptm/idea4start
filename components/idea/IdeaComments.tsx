'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, Reply, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import useGetComments from "@/hooks/api/useGetComments";
import { useState } from "react";
import { IComment, ICommentLike } from "@/types/interface";
import { useSession } from "next-auth/react";
import useCreateComment from "@/hooks/api/useCreateComment";
import useLikeComment from "@/hooks/api/useLikeComment";
import { cn } from "@/lib/utils";
import { IdeaCommentsProps } from "@/types/props";
import { toast } from "@/hooks/useToast";

const IdeaComments = ({ ideaId }: IdeaCommentsProps) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const { data, isLoading } = useGetComments({ ideaId });
  const comments = data?.comments || [];
  const { mutate: createComment, isPending: isCreating } = useCreateComment();
  const { mutate: likeComment, isPending: isLiking } = useLikeComment();

  const handleCreateComment = () => {
    if (!content.trim()) return;
    const newCommentId = `comment_${Math.random().toString(36).substring(2, 15)}`;

    const newComment = {
      _id: newCommentId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: session?.user,
      likes: [],
    };

    comments.push(newComment);

    createComment(
      { ideaId, content },
      {
        onSuccess: () => {
          toast({
            title: "Comment created successfully",
            description: "Your comment has been created successfully",
            variant: "success",
          });
          setContent("");
        },
        onError: () => {
          toast({
            title: "Error creating comment",
            description: "Your comment has been created successfully",
            variant: "destructive",
          });
          comments.pop();
        },
      }
    );
  };

  const handleLikeComment = (commentId: string) => {
    const id = `like_${Math.random().toString(36).substring(2, 15)}`;
    const newLike = {
      _id: id,
      userId: session?.user?.id,
      commentId,
    };

    const comment = comments.find((comment: IComment) => comment._id === commentId);
    if (!comment) {
      toast({
        title: "Error",
        description: "Comment not found",
        variant: "destructive"
      });
      return;
    }

    const existingLikeIndex = comment.likes?.findIndex((like: ICommentLike) => like.userId === session?.user?.id);

    try {
      if (existingLikeIndex !== undefined && existingLikeIndex >= 0) {
        comment.likes?.splice(existingLikeIndex, 1);
      } else {
        if (!comment.likes) {
          comment.likes = [];
        }
        comment.likes.push(newLike);
      }

      likeComment({ ideaId, commentId }, {
        onError: () => {
          if (existingLikeIndex !== undefined && existingLikeIndex >= 0) {
            comment.likes?.push(newLike);
          } else {
            comment.likes?.pop();
          }
          toast({
            title: "Error liking comment",
            description: "Failed to like comment",
            variant: "destructive",
          });
        },
      });
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const isCommentLiked = (comment: IComment) => {
    return comment.likes?.some(like => like.userId === session?.user?.id);
  };

  const getLikeCount = (comment: IComment) => {
    return comment.likes?.length || 0;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Discussion ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {session ? (
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>
                {session.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Share your thoughts or ask a question..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                onClick={handleCreateComment}
                disabled={isCreating || !content.trim()}
              >
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post Comment
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Please sign in to comment
          </div>
        )}

        <div className="space-y-6 pt-4">
          {comments.map((comment: IComment) => (
            <div key={comment._id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={comment.user?.image} />
                  <AvatarFallback>
                    {comment.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="font-medium">{comment.user?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                  <p className="mt-2 break-words">{comment.content}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 px-2",
                        isCommentLiked(comment) ? "text-red-500" : "text-muted-foreground"
                      )}
                      onClick={() => handleLikeComment(comment._id)}
                      disabled={isLiking || !session}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-muted-foreground">{getLikeCount(comment)}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      className="h-8 px-2 text-muted-foreground"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      <span>Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaComments;

