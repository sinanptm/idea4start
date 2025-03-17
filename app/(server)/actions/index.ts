'use server';

import connectDB from "@/lib/db/connect";
import { IIdea } from "@/types";
import Idea from "@/lib/db/models/Idea";
import { CreateIdeaInput, createIdeaSchema } from "@/lib/validations/idea.schema";
import { auth } from "@/auth";
connectDB();

export const createIdea = async (data: IIdea | CreateIdeaInput) => {
    try {
        const session = await auth();
        
        if (!session) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }

        const validatedData = createIdeaSchema.parse(data);
        const transformedData = {
            ...validatedData,
            businessModel: validatedData.businessModel?.[0]
        };

        await Idea.create(transformedData);

        return {
            success: true,
            message: "Idea created successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to create idea"
        }
    }
};
