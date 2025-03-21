import { IComment } from "@/types/interface";
import { model, Model, models, Schema } from "mongoose";

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

const Comment = (models.Comment as Model<IComment>) || model<IComment>("Comment", commentSchema);

export default Comment;