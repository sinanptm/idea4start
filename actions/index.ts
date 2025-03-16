'use server';
import connectDB from "@/lib/db/connect";
import { IIdea } from "@/types";
import Idea from "@/lib/db/models/Idea";
import { CreateIdeaInput, createIdeaSchema } from "@/lib/validations/idea.schema";
connectDB();

export const createIdea = async (data: IIdea | CreateIdeaInput) => {
    try {
        //validate data
        const validatedData = createIdeaSchema.parse(data);
        const transformedData = {
            ...validatedData,
            businessModel: validatedData.businessModel?.[0]
        };
        await Idea.create(transformedData);
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to create idea"
        }
    }
};