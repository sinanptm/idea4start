import { getSuggestion } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { InputName } from "@/types";

const useGetSuggestion = () => {
    return useMutation({
        mutationFn: ({ value, inputName }: { value: string, inputName: InputName; }) => getSuggestion(value, inputName),
    });
};

export default useGetSuggestion;
