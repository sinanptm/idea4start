import { useMutation } from "@tanstack/react-query";

const updateComment = async (ideaId: string, commentId: string, content: string) => {
    const response = await fetch(`/api/idea/${ideaId}/comment`, {
        method: "PUT",
        body: JSON.stringify({ commentId, content }),
    });
    return response.json();
};

const useUpdateComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, commentId, content }: { ideaId: string; commentId: string; content: string; }) => updateComment(ideaId, commentId, content),
    });
};

export default useUpdateComment;
