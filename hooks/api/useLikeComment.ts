import { useMutation } from "@tanstack/react-query";
import { likeComment } from "@/lib/api";
const useLikeComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, commentId }: { ideaId: string, commentId: string; }) => likeComment(ideaId, commentId),
    });
};

export default useLikeComment;