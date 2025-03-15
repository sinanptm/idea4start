export interface IIdea {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    userEmail?: string;
    userName?: string;
    userBuyMeACoffeeUrl?: string;
    industry?: string[];
    tags?: string[];
    upVotes?: number;
    downVotes?: number;
    problemStatement?: string;
    relatedUrls?: string[];
    stage?: Stage;
    risks?: string[];
    businessModel?: BusinessModel;
    voteScore?: number;
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
    cooperative = 'cooperative',
    sponsorship = 'sponsorship',
    other = 'other',
}

export enum StatusCode{
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    Ok = 200,
}

export interface StageConfig {
    value: 'idea' | 'validation' | 'prototype' | 'mvp' | 'launched';
    label: string;
    icon: React.ElementType;
    description: string;
    color: string;
  }