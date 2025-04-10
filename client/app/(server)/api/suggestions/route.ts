import { NextRequest, NextResponse } from "next/server";
import { InputName, StatusCode, RelativeField } from "@/types";
import { auth } from "@/auth";
import AiService from "@/lib/AiService";
import { withErrorHandler } from "@/lib/utils";

const aiService = new AiService();

export const POST = withErrorHandler(async (request: NextRequest) => {
    const { value, inputName, relativeFields = [] } = await request.json();

    const validation = await validate(value, inputName);

    if (validation.error) {
        return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    let prompt = getPrompt(inputName, relativeFields);

    prompt = `
    **Instruction:** ${prompt}
    **User Input:** ${value}
    **Input Name:** ${inputName}
    ${relativeFields.length > 0 ? `**Relative Fields:**\n${formatRelativeFields(relativeFields)}` : ''}
    `;

    const response = await aiService.generateResponse(prompt);

    return NextResponse.json(response);
});

const formatRelativeFields = (relativeFields: RelativeField[]) => {
    return relativeFields
        .filter(field => field.value && field.value.trim() !== '')
        .map(field => `- ${field.name}: ${field.value}`)
        .join('\n');
};

const getPrompt = (inputName: InputName, relativeFields = []) => {
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
};

const validate = async (value: string, inputName: InputName) => {
    if (!value || !inputName || value.trim() === "" || !Object.values(InputName).includes(inputName)) {
        return { error: "Invalid value or inputName", status: StatusCode.BadRequest };
    }

    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Unauthorized", status: StatusCode.Unauthorized };
    }

    return { error: null, status: StatusCode.Ok };
};