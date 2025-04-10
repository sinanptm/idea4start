import { getSuggestion } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { GetSuggestionProps } from "@/types/props";

const useGetSuggestion = () => {
    return useMutation({
        mutationFn: ({ value, inputName, relativeFields }: GetSuggestionProps) => getSuggestion(value, inputName, relativeFields),
    });
};

export default useGetSuggestion;
