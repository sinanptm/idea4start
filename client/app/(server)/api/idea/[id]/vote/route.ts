import Vote from "@/lib/db/models/Vote";
import validateSessionData from "@/lib/validateSessionData";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/utils";

export const PATCH = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
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
        if (existingVote.type === 'neutral') {
            await Vote.deleteOne({ _id: existingVote._id });
        } else {
            existingVote.type = voteType;
            await existingVote.save();
        }
    } else {
        await Vote.create({ userId: user?._id, ideaId: id, type: voteType });
    }

    return NextResponse.json({ message: "Vote processed successfully" }, { status: 200 });
});