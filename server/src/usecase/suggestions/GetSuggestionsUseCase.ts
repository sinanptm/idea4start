import IAiService from "@/domain/service/IAiService";
import { InputName, RelativeField } from "@/types";
interface GetSuggestionsQuery {
    value: string;
    inputName: InputName;
    relativeFields: RelativeField[];
}

export default class GetSuggestionsUseCase {
    constructor(private readonly aiService: IAiService) { }

    async exec(query: GetSuggestionsQuery): Promise<string[]> {
        return [];
    }
}   