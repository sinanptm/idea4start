import { ICommentLike } from "@/types/interface";
import { model, Model, models, Schema } from "mongoose";

const commentLikeSchema = new Schema<ICommentLike>({
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: false,
    versionKey: false
});

const CommentLike = (models.CommentLike as Model<ICommentLike>) || model<ICommentLike>("CommentLike", commentLikeSchema);

export default CommentLike;