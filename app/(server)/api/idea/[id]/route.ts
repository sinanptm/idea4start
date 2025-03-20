import Idea from "@/lib/db/models/Idea";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { isValidObjectId } from "mongoose";
import validateSessionData from "@/lib/validateSessionData";
import Vote from "@/lib/db/models/Vote";
export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;

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


    idea = idea[0];

    if (!idea) {
        return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(idea);
};

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    const { voteType } = await request.json();

    const { success, message, user } = await validateSessionData();

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 });
    }

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: 400 });
    }

    const existingVote = await Vote.findOne({ userId: user?._id, ideaId: id });

    if (existingVote) {
        existingVote.type = voteType;
        await existingVote.save();
    } else {
        await Vote.create({ userId: user?._id, ideaId: id, type: voteType });
    }

    return NextResponse.json({ message: "Vote processed successfully" }, { status: 200 });
};