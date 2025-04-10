import Comment from "@/lib/db/models/Comment";
import CommentLike from "@/lib/db/models/CommentLike";
import validateSessionData from "@/lib/validateSessionData";
import { StatusCode } from "@/types";
import { isValidObjectId, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/utils";

export const GET = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: StatusCode.BadRequest });
    }

    const commentsWithLikes = await Comment.aggregate([
        { $match: { ideaId: new Types.ObjectId(id) } },
        {
            $lookup: {
                from: "commentlikes",
                localField: "_id",
                foreignField: "commentId",
                as: "likes"
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
        { $unwind: "$user" },
        {
            $project: {
                _id: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                user: {
                    _id: "$user._id",
                    name: "$user.name",
                    email: "$user.email",
                    image: "$user.image"
                },
                likes: {
                    $map: {
                        input: "$likes",
                        as: "like",
                        in: {
                            _id: "$$like._id",
                            userId: "$$like.userId"
                        }
                    }
                },
                likesCount: { $size: "$likes" }
            }
        },
        { $sort: { likesCount: -1 } }
    ]);

    return NextResponse.json(commentsWithLikes, { status: StatusCode.Ok });
});

// comment create
export const POST = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    const { content } = await request.json();

    const { success, message, user } = await validateSessionData();

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 });
    }

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: StatusCode.BadRequest });
    }

    const comment = await Comment.create({ ideaId: id, userId: user?._id, content });

    return NextResponse.json({ comment: comment.toJSON() }, { status: StatusCode.Created });
});


// comment like
export const PATCH = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    const { commentId } = await request.json();

    const { success, message, user } = await validateSessionData();

    if (!success) {
        return NextResponse.json({ error: message }, { status: StatusCode.Unauthorized });
    }

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: StatusCode.BadRequest });
    }

    if (!isValidObjectId(commentId)) {
        return NextResponse.json({ error: "Invalid comment id" }, { status: StatusCode.BadRequest });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: StatusCode.NotFound });
    }

    const existingLike = await CommentLike.findOne({ commentId, userId: user?._id });

    if (existingLike) {
        await CommentLike.deleteOne({ _id: existingLike._id });
    } else {
        await CommentLike.create({ commentId, userId: user?._id });
    }

    return NextResponse.json({ message: "Comment like processed successfully" }, { status: StatusCode.Ok });
});

// comment delete
export const DELETE = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    const { commentId } = await request.json();

    const { success, message } = await validateSessionData();

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 });
    }

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: StatusCode.BadRequest });
    }

    if (!isValidObjectId(commentId)) {
        return NextResponse.json({ error: "Invalid comment id" }, { status: StatusCode.BadRequest });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: StatusCode.NotFound });
    }

    await Comment.deleteOne({ _id: commentId });

    await CommentLike.deleteMany({ commentId });

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: StatusCode.Ok });
});

// comment update
export const PUT = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) => {
    const { id } = await params;
    const { commentId, content } = await request.json();

    const { success, message } = await validateSessionData();

    if (!success) {
        return NextResponse.json({ error: message }, { status: StatusCode.Unauthorized });
    }

    if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid idea id" }, { status: StatusCode.BadRequest });
    }

    if (!isValidObjectId(commentId)) {
        return NextResponse.json({ error: "Invalid comment id" }, { status: StatusCode.BadRequest });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: StatusCode.NotFound });
    }

    comment.content = content;

    await comment.save();

    return NextResponse.json({ comment }, { status: StatusCode.Ok });
});
