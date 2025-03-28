import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/lib/api";

const useCreateComment = () => {
    return useMutation({
        mutationFn: ({ ideaId, content }: { ideaId: string, content: string; }) => createComment(ideaId, content),
    });
};

export default useCreateComment;