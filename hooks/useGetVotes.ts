import { IVote } from "@/types/interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useCreateVote from "./api/useCreateVote";
import { toast } from "./useToast";

const useGetVotes = (votes: IVote[], ideaId: string) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const { mutate: createVote, isPending: isSubmitting } = useCreateVote();
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [upVotes, setUpVotes] = useState(0);
    const [downVotes, setDownVotes] = useState(0);

    const totalVotes = useMemo(() => votes?.length || 0, [votes]);

    useEffect(() => {
        const userVote = votes?.find((vote) => vote.userId === userId);
        setIsUpVoted(userVote?.type === "up");
        setIsDownVoted(userVote?.type === "down");
        setUpVotes(votes?.filter((vote) => vote.type === "up").length || 0);
        setDownVotes(votes?.filter((vote) => vote.type === "down").length || 0);
    }, [votes, userId]);

    const handleVote = useCallback((voteType: "up" | "down") => {
        const isUp = voteType === "up";
        const previousUpVotes = upVotes;
        const previousDownVotes = downVotes;

        setUpVotes(Math.max(0, isUp ? upVotes + 1 : upVotes - 1));
        setDownVotes(Math.max(0, isUp ? downVotes - 1 : downVotes + 1));
        setIsUpVoted(isUp);
        setIsDownVoted(!isUp);

        createVote(
            { ideaId, voteType },
            {
                onError: () => {
                    setUpVotes(previousUpVotes);
                    setDownVotes(previousDownVotes);
                    setIsUpVoted(!isUp);
                    setIsDownVoted(isUp);
                    toast({
                        title: "Error",
                        description: "Failed to vote",
                        variant: "destructive",
                    });
                },
            }
        );
    }, [createVote, ideaId, upVotes, downVotes]);

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