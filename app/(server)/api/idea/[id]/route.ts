import Idea from "@/lib/db/models/Idea";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { isValidObjectId } from "mongoose";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    console.log(id);

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: 400 });
    }

    let idea = await Idea.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);

    console.log(idea);

    idea = idea[0];

    if (!idea) {
        return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(idea);
};
