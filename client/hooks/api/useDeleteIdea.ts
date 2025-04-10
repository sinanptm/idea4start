import { deleteIdea } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const useDeleteIdea = () => {
    return useMutation({ mutationFn: deleteIdea });
};

export default useDeleteIdea;