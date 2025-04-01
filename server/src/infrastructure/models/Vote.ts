import { Schema, model } from "mongoose";
import IVote from "@/domain/entities/IVote";

const voteSchema = new Schema<IVote>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    ideaId: {
        type: Schema.Types.ObjectId,
        ref: "Idea",
        required: true,
        unique: true,
        index: true
    },
    type: {
        type: String,
        enum: ["up", "down"],
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

voteSchema.index({ userId: 1, ideaId: 1 }, { unique: true });

const Vote = model("Vote", voteSchema);

export default Vote;
