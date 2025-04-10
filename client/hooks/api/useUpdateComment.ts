import { updateComment } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const useUpdateComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, commentId, content }: { ideaId: string; commentId: string; content: string; }) => updateComment(ideaId, commentId, content),
    });
};

export default useUpdateComment;
