import { IVote } from "@/types/interface";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

const useGetVotes = (votes: IVote[]) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const upVotes = useMemo(() => {
        return votes?.filter((vote) => vote.type === "up").length || 0;
    }, [votes]);

    const downVotes = useMemo(() => {
        return votes?.filter((vote) => vote.type === "down").length || 0;
    }, [votes]);

    const isUpVoted = useMemo(() => {
        return votes?.some((vote) => vote.userId === userId && vote.type === "up");
    }, [votes, userId]);

    const isDownVoted = useMemo(() => {
        return votes?.some((vote) => vote.userId === userId && vote.type === "down");
    }, [votes, userId]);

    return {
        upVotes,
        downVotes,
        isUpVoted,
        isDownVoted,
    };
};

export default useGetVotes;