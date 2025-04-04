import ICommentLike from "@/domain/entities/ICommentLike";
import { model, Schema } from "mongoose";

const commentLikeSchema = new Schema<ICommentLike>({
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: false,
    versionKey: false
});

const CommentLike = model<ICommentLike>("CommentLike", commentLikeSchema);

export default CommentLike;