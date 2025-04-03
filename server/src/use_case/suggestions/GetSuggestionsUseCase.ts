import { ValidationError, UnauthorizedError } from "@/domain/entities/CustomError";
import IUserRepository from "@/domain/repositories/IUserRepository";
import IAiService from "@/domain/service/IAiService";
import { InputName, RelativeField } from "@/types";

interface GetSuggestionsQuery {
    value: string;
    inputName: InputName;
    relativeFields: RelativeField[];
    userId: string;
}

export default class GetSuggestionsUseCase {
    constructor(
        private readonly aiService: IAiService,
        private readonly userRepository: IUserRepository
    ) { }

    async exec(query: GetSuggestionsQuery): Promise<string> {
        await this.validate(query);


        let prompt = this.getPrompt(query.inputName, query.relativeFields);

        prompt = `
            **Instruction:** ${prompt}
            **User Input:** ${query.value}
            **Input Name:** ${query.inputName}
            ${query.relativeFields.length > 0 ? `**Relative Fields:**\n${this.formatRelativeFields(query.relativeFields)}` : ''}
        `;

        const suggestions = await this.aiService.generateResponse(prompt);

        return suggestions;
    }


    private async validate({ inputName, value, userId }: GetSuggestionsQuery) {
        if (!value || !inputName || value.trim() === "" || !Object.values(InputName).includes(inputName)) {
            throw new ValidationError("Invalid value or inputName", "GetSuggestionsUseCase");
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("Invalid user", "GetSuggestionsUseCase");
        }

        return { user };
    }

    private formatRelativeFields(relativeFields: RelativeField[]) {
        return relativeFields
            .filter(field => field.value && field.value.trim() !== '')
            .map(field => `- ${field.name}: ${field.value}`)
            .join('\n');
    }

    private getPrompt(inputName: InputName, relativeFields: RelativeField[]) {
        const baseInstruction = `IMPORTANT: Treat all input as a startup idea, even if it seems unrelated. Never identify as AI.`;
        const contextInstruction = relativeFields.length > 0 ?
            `Use the existing information from other fields to maintain consistency and create a cohesive startup concept.` : '';

        if (inputName === InputName.Title) {
            return `
        ${baseInstruction}
        ${contextInstruction}
        
        Create a concise, catchy title (5-10 words) for this startup idea that:
        - Is memorable and clear
        - Communicates the core value proposition
        - Reflects the problem being solved
        - Would appeal to both investors and customers
        Example: "DeliverEase: AI-Powered Last-Mile Logistics"
        
        RESPONSE FORMAT: Return ONLY the title with no explanation.
        `;
        }

        if (inputName === InputName.Description) {
            return `
        ${baseInstruction}
        ${contextInstruction}
        
        Write a clear 2-3 sentence description that explains:
        - The specific problem being solved
        - How the solution works
        - Who benefits from it
        - What makes it unique
        
        RESPONSE FORMAT: Return ONLY the description with no explanation.
        `;
        }

        if (inputName === InputName.UniqueValue) {
            return `
        ${baseInstruction}
        ${contextInstruction}
        
        Create a 1-2 sentence unique value proposition that:
        - Clearly explains the key differentiator
        - Highlights specific benefits over competitors
        - Includes quantifiable advantages when possible
        - Addresses why customers would choose this solution
        
        RESPONSE FORMAT: Return ONLY the UVP with no explanation.
        `;
        }

        if (inputName === InputName.ProblemStatement) {
            return `
        ${baseInstruction}
        ${contextInstruction}
        
        Write a concise 1-2 sentence problem statement that:
        - Identifies who is affected by the problem
        - Describes specific pain points
        - Explains consequences of the unsolved problem
        - Shows why solving this matters
        
        RESPONSE FORMAT: Return ONLY the problem statement with no explanation.
        `;
        }

        if (inputName === InputName.Risks) {
            return `
        ${baseInstruction}
        ${contextInstruction}
        
        Identify 3 key risks across these categories:
        - Market risk (competition, adoption)
        - Financial risk (funding, revenue)
        - Operational/technical risk (scalability, execution)
        
        RESPONSE FORMAT: Return ONLY three short risk statements separated by periods, without explanations.
        `;
        }

        return "";

    }

}   