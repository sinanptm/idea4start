import { IVote } from "@/types/interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useCreateVote from "./api/useCreateVote";
import { toast } from "./useToast";

const useGetVotes = (votes: IVote[], ideaId: string) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [upVotes, setUpVotes] = useState(0);
    const [downVotes, setDownVotes] = useState(0);
    const { mutate: createVote, isPending: isSubmitting } = useCreateVote();

    const totalVotes = useMemo(() => votes?.length || 0, [votes]);

    useEffect(() => {
        const userVote = votes?.find((vote) => vote.userId === userId);
        setIsUpVoted(userVote?.type === "up");
        setIsDownVoted(userVote?.type === "down");
        setUpVotes(votes?.filter((vote) => vote.type === "up").length || 0);
        setDownVotes(votes?.filter((vote) => vote.type === "down").length || 0);
    }, [votes, userId]);

    const handleVote = useCallback((voteType: "up" | "down" | "neutral") => {
        const previousUpVotes = upVotes;
        const previousDownVotes = downVotes;
        const previousIsUpVoted = isUpVoted;
        const previousIsDownVoted = isDownVoted;

        // Handle neutral vote (removing the vote)
        if (voteType === "neutral") {
            if (isUpVoted) setUpVotes(upVotes - 1);
            if (isDownVoted) setDownVotes(downVotes - 1);
            setIsUpVoted(false);
            setIsDownVoted(false);
        } else {
            // Handle up/down votes
            const isUp = voteType === "up";
            if (isUp && !isUpVoted) {
                setUpVotes(upVotes + 1);
                if (isDownVoted) setDownVotes(downVotes - 1);
            } else if (!isUp && !isDownVoted) {
                setDownVotes(downVotes + 1);
                if (isUpVoted) setUpVotes(upVotes - 1);
            }
            setIsUpVoted(isUp);
            setIsDownVoted(!isUp);
        }

        createVote(
            { ideaId, voteType },
            {
                onError: () => {
                    // Restore previous state on error
                    setUpVotes(previousUpVotes);
                    setDownVotes(previousDownVotes);
                    setIsUpVoted(previousIsUpVoted);
                    setIsDownVoted(previousIsDownVoted);
                    toast({
                        title: "Error ❌",
                        description: "Failed to update vote",
                        variant: "destructive",
                    });
                },
            }
        );
    }, [createVote, ideaId, upVotes, downVotes, isUpVoted, isDownVoted]);

    return {
        upVotes,
        downVotes,
        isUpVoted,
        isDownVoted,
        totalVotes,
        handleVote,
        isSubmitting
    };
};

export default useGetVotes;