import { useMutation } from "@tanstack/react-query";

const likeComment = async (ideaId: string, commentId: string) => {
    const response = await fetch(`/api/idea/${ideaId}/comment`, {
        method: "PATCH",
        body: JSON.stringify({ commentId }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.json();
};

const useLikeComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, commentId }: { ideaId: string, commentId: string; }) => likeComment(ideaId, commentId),
    });
};

export default useLikeComment;