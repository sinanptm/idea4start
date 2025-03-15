'use server';
import connectDB from "@/lib/db/connect";
import { IIdea } from "@/types";
import Idea from "@/lib/db/models/Idea";
import { errorCatcher } from "@/lib/utils";
import { createIdeaSchema } from "@/lib/validations/idea.schema";
connectDB();

export const createIdea = errorCatcher(async (data: IIdea) => {
    //validate data
    const validatedData = createIdeaSchema.parse(data);
    const transformedData = {
        ...validatedData,
        businessModel: validatedData.businessModel?.[0]
    };
    await Idea.create(transformedData);
});