import { deleteComment } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";


const useDeleteComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, commentId }: { ideaId: string; commentId: string; }) => deleteComment(ideaId, commentId),
    });
};

export default useDeleteComment;
