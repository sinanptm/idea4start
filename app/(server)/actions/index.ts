'use server';

import connectDB from "@/lib/db/connect";
import Idea from "@/lib/db/models/Idea";
import { CreateIdeaInput, createIdeaSchema } from "@/lib/validations/idea.schema";
import editProfileSchema, { ProfileInput } from "@/lib/validations/profile.schema";
import validateSessionData from "@/lib/validateSessionData";
import User from "@/lib/db/models/User";

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

        if (!success) {
            throw new Error(message);
        }

        const validatedData = editProfileSchema.parse(data);
        const transformedData = {
            ...validatedData,
            userId: user?._id
        };

        await User.findByIdAndUpdate(user?._id, transformedData);

        return {
            success: true,
            message: "Profile updated successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to edit profile"
        };
    }
};