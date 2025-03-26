import Idea from "@/lib/db/models/Idea";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { isValidObjectId } from "mongoose";
import validateSessionData from "@/lib/validateSessionData";
import Comment from "@/lib/db/models/Comment";
import Vote from "@/lib/db/models/Vote";
import connectDB from "@/lib/db/connect";
import CommentLike from "@/lib/db/models/CommentLike";
import { withErrorHandler } from "@/lib/utils";
import { IIdea } from "@/types/interface";
connectDB();

export const GET = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
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
        }, {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                createdAt: 1,
                updatedAt: 1,
                isPublic: 1,
                industry: 1,
                tags: 1,
                problemStatement: 1,
                relatedUrls: 1,
                stage: 1,
                risks: 1,
                businessModel: 1,
                uniqueValue: 1,
                user: {
                    _id: "$user._id",
                    name: "$user.name",
                    image: "$user.image",
                    buyMeACoffee: "$user.buyMeACoffee"
                }
            }
        }
    ]);

    idea = idea[0];

    if (!idea) {
        return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }


    return NextResponse.json(idea);

});

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id ❌" }, { status: 400 });
    }

    const [idea, sessionData] = await Promise.all([
        Idea.findById(id),
        validateSessionData()
    ]);

    if (!idea) {
        return NextResponse.json({ error: "Idea not found 🔍" }, { status: 404 });
    }

    const { success, message, user } = sessionData;

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 });
    }

    if (user?._id.toString() !== idea.userId!.toString()) {
        return NextResponse.json({ error: "Unauthorized ⛔" }, { status: 401 });
    }

    await Promise.all([
        Idea.findByIdAndDelete(id),
        Comment.deleteMany({ ideaId: id }),
        Vote.deleteMany({ ideaId: id }),
        CommentLike.deleteMany({
            commentId: {
                $in: (await Comment.find({ ideaId: id }, "_id")).map(c => c._id)
            }
        })
    ]);

    return NextResponse.json({
        message: "Idea deleted successfully ✅",
        ideaId: id
    }, { status: 200 });

});