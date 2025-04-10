import { getComments } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetComments = ({ ideaId }: { ideaId: string; }) => {
    return useQuery({
        queryKey: ["comments", ideaId],
        queryFn: () => getComments(ideaId),
    });
};

export default useGetComments;
