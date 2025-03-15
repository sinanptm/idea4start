import { IIdea , BusinessModel } from "@/types";
import { Model, model, models, Schema } from "mongoose";

const ideaSchema = new Schema<IIdea>({
    title: { 
        type: String, 
        required: true,
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: { 
        type: String, 
        required: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
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
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    userBuyMeACoffeeUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function(v: string) {
                if (!v) return true; 
                try {
                    new URL(v);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: 'Please enter a valid URL'
        }
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
        min: 0
    },
    downVotes: {
        type: Number,
        default: 0,
    },
    problemStatement: {
        type: String,
        trim: true,
        maxlength: [1000, 'Problem statement cannot exceed 1000 characters']
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
        type: String,
        enum: {
            values: Object.values(BusinessModel),
            message: '{VALUE} is not a valid business model'
        }
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
