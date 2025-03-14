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
    stage?: 'idea' | 'validation' | 'prototype' | 'mvp' | 'launched';
    risks?: string[];
    milestones?: {
        shortTerm?: string[];
        mediumTerm?: string[];
        longTerm?: string[];
    };
}



export interface StageConfig {
    value: 'idea' | 'validation' | 'prototype' | 'mvp' | 'launched';
    label: string;
    icon: React.ElementType;
    description: string;
    color: string;
  }