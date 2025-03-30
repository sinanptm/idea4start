import IUser from "./IUser";
import IVote from "./IVote";

interface IIdea {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    userId?: IUser['_id'];
    industry?: string[];
    tags?: string[];
    problemStatement?: string;
    relatedUrls?: string[];
    stage?: Stage;
    risks?: string[];
    businessModel?: BusinessModel;
}

export interface IIdeaWithRelations extends IIdea {
    user?: IUser;
    uniqueValue?: string;
    votes?: IVote[];
    trendingScore?: number;
    upVoteCount?: number;
    downVoteCount?: number;
    commentCount?: number;
    userLiked?: boolean;
}

export type Stage = 'idea' | 'validation' | 'prototype' | 'mvp' | 'launched';
export enum BusinessModel {
    saas = 'saas',
    physicalProduct = 'physicalProduct',
    subscription = 'subscription',
    adModel = 'adModel',
    membership = 'membership',
    freemium = 'freemium',
    marketplace = 'marketplace',
    licensing = 'licensing',
    oneTimePurchase = 'oneTimePurchase',
    transactionFee = 'transactionFee',
    affiliateMarketing = 'affiliateMarketing',
    consulting = 'consulting',
    crowdsourcing = 'crowdsourcing',
    payPerUse = 'payPerUse',
    dataMonetization = 'dataMonetization',
    hardwarePlusSoftware = 'hardwarePlusSoftware',
    platformAsAService = 'platformAsAService',
    blockchainBased = 'blockchainBased',
    donationBased = 'donationBased',
    bundling = 'bundling',
    franchise = 'franchise',
    peerToPeer = 'peerToPeer',
    sponsorship = 'sponsorship',
    other = 'other',
}


export default IIdea;