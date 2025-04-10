import { Button } from "../ui/button";
import useGetVotes from "@/hooks/useGetVotes";
import { cn } from '@/lib/utils';
import { VoteProps } from '@/types/props';
import Image from 'next/image';
import { memo } from "react";

const Vote = ({ votes, ideaId }: VoteProps) => {
    const { upVotes, totalVotes, isDownVoted, isUpVoted, handleVote, isSubmitting } = useGetVotes(votes || [], ideaId);

    return (
        <section className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    aria-label="upvote"
                    aria-disabled={isSubmitting}
                    className={cn(
                        "rounded-full h-8 w-8 p-0 transition-colors",
                        isUpVoted
                            ? "bg-green-100 text-green-600 hover:bg-green-100 hover:text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                    onClick={() => handleVote(isUpVoted ? "neutral" : "up")}
                >
                    <Image
                        src="/assets/arrow-up.svg"
                        alt="upvote"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                    />
                </Button>
                <span className={cn("text-xs font-medium", isUpVoted ? "text-green-600 dark:text-green-400" : "")}>
                    {upVotes}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    aria-label="downvote"
                    aria-disabled={isSubmitting}
                    className={cn(
                        "rounded-full h-8 w-8 p-0 transition-colors",
                        isDownVoted
                            ? "bg-red-100 text-red-600 hover:bg-red-100 hover:text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                    onClick={() => handleVote(isDownVoted ? "neutral" : "down")}
                >
                    <Image
                        src="/assets/arrow-down.svg"
                        alt="downvote"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                    />
                </Button>
            </div>
            <div className="text-xs font-medium text-muted-foreground ml-1">{totalVotes} votes</div>
        </section>
    );
};

export default memo(Vote);