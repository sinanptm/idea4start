import { IIdea } from "./interface";

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

export type HomePageStatics = {
    totalUsers: number;
    totalIdeas: number;
    trendingIdeas: IIdea[];
};

export enum InputName {
    Title = "title",
    Description = "description",
    UniqueValue = "uniqueValue",
    ProblemStatement = "problemStatement",
    Risks = "risks",
    BusinessModel = "businessModel",
    Industries = "industries",
    Tags = "tags",
}

export enum StatusCode {
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    Ok = 200,
}

export interface StageConfig {
    value: 'idea' | 'validation' | 'prototype' | 'mvp' | 'launched' | 'all';
    label: string;
    icon: React.ElementType;
    description: string;
    color: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export type RelativeField = {
    name: InputName;
    value: string;
};
