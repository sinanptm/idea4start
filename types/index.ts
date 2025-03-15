export interface Idea {
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
    isDeleted?: boolean;
    upVotes?: number;
    downVotes?: number;
    problemStatement?: string;
    relatedUrls?: string[];
    competitiveAnalysis?: {
        competitors?: string[];
        uniqueValue?: string;
    };
    stage?: Stage;
    risks?: string[];
    businessModel?: BusinessModel;
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


export interface StageConfig {
    value: 'idea' | 'validation' | 'prototype' | 'mvp' | 'launched';
    label: string;
    icon: React.ElementType;
    description: string;
    color: string;
  }