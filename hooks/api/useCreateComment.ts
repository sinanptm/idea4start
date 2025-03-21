import { useMutation } from "@tanstack/react-query";

const createComment = async (ideaId: string, content: string) => {
    const response = await fetch(`/api/idea/${ideaId}/comment`, {
        method: "POST",
        body: JSON.stringify({ content }),
    });

    return response.json();
};

const useCreateComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, content }: { ideaId: string, content: string; }) => createComment(ideaId, content),
    });
};

export default useCreateComment;