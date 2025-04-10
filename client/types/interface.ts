import { Stage, BusinessModel } from ".";

export interface IIdea {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    userId?: string;
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
    trendingScore?: number;
    upVoteCount?: number;
    downVoteCount?: number;
    commentCount?: number;
    userLiked?: boolean;
}

export interface CommentWithUser extends IComment {
    user: IUser;
    likes: ICommentLike[];
    likesCount: number;
}

export interface IVote {
    _id: string;
    ideaId?: string;
    userId?: string;
    type: 'up' | 'down' | 'neutral';
}

export interface IUser {
    _id: string;
    email: string;
    name: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
    designation?: string;
    company?: string;
    location?: string;
    bio?: string;
    website?: string;
    twitter?: string;
    buyMeACoffee?: string;
    linkedin?: string;
    github?: string;
    phoneNumber?: string;
    role?: 'user' | 'admin' | 'moderator';
    languages?: string[];
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