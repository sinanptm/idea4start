'use server';
import connectDB from "@/lib/db/connect";
import { IIdea } from "@/types";
import Idea from "@/lib/db/models/Idea";
import { errorCatcher } from "@/lib/utils";

export const createIdea = errorCatcher(async (data: IIdea) => {
    await connectDB();
    const idea = await Idea.create(data);
    return idea;
});