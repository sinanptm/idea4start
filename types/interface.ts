import { Stage } from ".";
import { BusinessModel } from ".";

export interface IIdea {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    userId?: string;
    userBuyMeACoffeeUrl?: string;
    industry?: string[];
    tags?: string[];
    problemStatement?: string;
    relatedUrls?: string[];
    stage?: Stage;
    risks?: string[];
    businessModel?: BusinessModel;
    user?: IUser;
    uniqueValue?: string;
    votes?: IVote[];
}

export interface IVote {
    _id: string;
    ideaId?: string;
    userId?: string;
    type: 'up' | 'down';
}

export interface IUser {
    _id: string;
    email: string;
    name: string;
    image: string;
}

export interface IComment {
    _id: string;
    ideaId?: string;
    userId?: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes?: ICommentLike[];
    user?: IUser;
}

export interface ICommentLike {
    _id: string;
    commentId?: string;
    userId?: string;
}