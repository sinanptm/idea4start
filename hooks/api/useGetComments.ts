import { useQuery } from "@tanstack/react-query";

const getComments = async (ideaId: string) => {
    const response = await fetch(`/api/idea/${ideaId}/comment`);
    return response.json();
};

const useGetComments = ({ ideaId }: { ideaId: string; }) => {
    return useQuery({
        queryKey: ["comments", ideaId],
        queryFn: () => getComments(ideaId),
    });
};

export default useGetComments;
