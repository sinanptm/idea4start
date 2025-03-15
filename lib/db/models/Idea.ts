import { IIdea  } from "@/types";
import { Model, model, models, Schema } from "mongoose";

const ideaSchema = new Schema<IIdea>({
    title: { 
        type: String, 
        required: true,
        trim: true,
    },
    description: { 
        type: String, 
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    userEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    userName: {
        type: String,
        trim: true,
    },
    userBuyMeACoffeeUrl: {
        type: String,
        trim: true
    },
    industry: [{
        type: String,
        trim: true
    }],
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    upVotes: {
        type: Number,
        default: 0,
    },
    downVotes: {
        type: Number,
        default: 0,
    },
    problemStatement: {
        type: String,
        trim: true,
    },
    relatedUrls: [{
        type: String,
        trim: true
    }],
    stage: {
        type: String,
        enum: {
            values: ['idea', 'validation', 'prototype', 'mvp', 'launched'],
            message: '{VALUE} is not a valid stage'
        },
        default: 'idea'
    },
    risks: [{
        type: String,
        trim: true
    }],
    businessModel: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
ideaSchema.index({ tags: 1 });
ideaSchema.index({ industry: 1 });
ideaSchema.index({ stage: 1 });
ideaSchema.index({ createdAt: -1 });
ideaSchema.index({ upVotes: -1 });
ideaSchema.index({ title: 'text', description: 'text' }); // Text search index

// Virtual for vote score
ideaSchema.virtual('voteScore').get(function() {
    return this.upVotes! - this.downVotes!;
});

// Pre-save middleware to clean up tags
ideaSchema.pre('save', function(next) {
    if (this.tags) {
        this.tags = this.tags
            .map(tag => tag.toLowerCase().trim())
            .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
    }
    if (this.industry) {
        this.industry = this.industry
            .filter((ind, index, self) => self.indexOf(ind) === index); // Remove duplicates
    }
    next();
});

// Instance method to safely update votes
ideaSchema.methods.updateVotes = async function(type: 'up' | 'down', increment: boolean) {
    const field = type === 'up' ? 'upVotes' : 'downVotes';
    const update = increment ? 1 : -1;
    this[field] = Math.max(0, this[field] + update);
    return this.save();
};

// const idea = await Idea.findById(ideaId);
// await idea.updateVotes('up', true);  // Increases upVotes by 1
// const idea = await Idea.findById(ideaId);
// await idea.updateVotes('down', false);  // Decreases downVotes by 1 (but never below 0)


const Idea = (models.Idea as Model<IIdea>) || model<IIdea>("Idea", ideaSchema);

export default Idea;
