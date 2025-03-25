'use server';

import connectDB from "@/lib/db/connect";
import Idea from "@/lib/db/models/Idea";
import { CreateIdeaInput, createIdeaSchema } from "@/lib/validations/idea.schema";
import validateSessionData from "@/lib/validateSessionData";
import { ProfileInput } from "@/lib/validations/profile.schema";

connectDB();

export const createIdea = async (data: CreateIdeaInput) => {
    try {
        const { success, message, user } = await validateSessionData();

        if (!success) {
            return {
                success: false,
                message: message
            };
        }
        const validatedData = createIdeaSchema.parse(data);
        const transformedData = {
            ...validatedData,
            businessModel: validatedData.businessModel?.[0]
        };

        await Idea.create({ ...transformedData, userId: user?._id });

        return {
            success: true,
            message: "Idea created successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to create idea"
        };
    }
};

export const editProfile = async (data: ProfileInput) => {
    try {
        const { success, message, user } = await validateSessionData();
    } catch (error) {
        console.log(error);
    }
};