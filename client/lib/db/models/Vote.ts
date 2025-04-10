import { Schema, model, models } from "mongoose";

const voteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ideaId: {
        type: Schema.Types.ObjectId,
        ref: "Idea",
        required: true,
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

const Vote = models.Vote || model("Vote", voteSchema);

export default Vote;
