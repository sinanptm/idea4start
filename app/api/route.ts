import connectDB from "@/lib/db/connect";
import Idea from "@/lib/db/models/Idea";
import { NextResponse } from "next/server";
import { StatusCode } from "@/types";
import { serializeData } from "@/lib/utils";

connectDB();

export const GET = async () => {
    try {
        const ideas = await Idea.find()
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: serializeData(ideas),
            status: StatusCode.Ok
        });
    } catch (error) {
        console.error('Error fetching ideas:', error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch ideas",
            status: StatusCode.InternalServerError
        });
    }
}
