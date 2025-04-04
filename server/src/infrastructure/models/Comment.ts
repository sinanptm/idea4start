import IComment from "@/domain/entities/IComment";
import { model, Schema } from "mongoose";

const commentSchema = new Schema<IComment>({
    ideaId: { type: Schema.Types.ObjectId, ref: 'Idea', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

commentSchema.index({ ideaId: 1 });
commentSchema.index({ userId: 1 });
commentSchema.index({ createdAt: -1 });

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;