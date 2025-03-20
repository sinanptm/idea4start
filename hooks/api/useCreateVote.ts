import { useMutation, useQueryClient } from "@tanstack/react-query";
import useIdeasFilter from "../useIdeasFilter";

const createVote = async (ideaId: string, voteType: "up" | "down") => {
    const response = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({ voteType }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to create vote");
    }

    return response.json();
};

const useCreateVote = () => {
    const queryClient = useQueryClient();
    const { businessModel, industry, stage, sort, search, page, timePeriod } = useIdeasFilter();
    return useMutation({
        mutationFn: ({ ideaId, voteType }: { ideaId: string, voteType: "up" | "down"; }) => {
            return createVote(ideaId, voteType);
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["ideas", businessModel, industry, stage, sort, search, page, timePeriod] });

            const previousVotes = queryClient.getQueryData(["ideas", businessModel, industry, stage, sort, search, page, timePeriod]);

            return { previousVotes };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onError: (err, variables, context) => {
            queryClient.setQueryData(["ideas", businessModel, industry, stage, sort, search, page, timePeriod], context?.previousVotes);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["ideas", businessModel, industry, stage, sort, search, page, timePeriod] });
        }
    });
};

export default useCreateVote;
