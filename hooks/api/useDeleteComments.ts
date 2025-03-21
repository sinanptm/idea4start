import { useMutation } from "@tanstack/react-query";

const deleteComment = async (ideaId: string, commentId: string) => {
    const response = await fetch(`/api/idea/${ideaId}/comment`, {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
    });

    return response.json();
};

const useDeleteComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, commentId }: { ideaId: string; commentId: string; }) => deleteComment(ideaId, commentId),
    });
};

export default useDeleteComment;
