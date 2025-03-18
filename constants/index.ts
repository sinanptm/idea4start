import { BusinessModel, StageConfig } from "@/types";
import { Home, Lightbulb, Info, Rocket, FlaskConical, Target, Flag, TrendingUp, Clock, ThumbsUp, List, Calendar } from "lucide-react";

export const APP_NAME = "Idea4Start";
export const APPLICATION_URL = "https://idea4startup.vercel.app";

export const NAV_MAIN_ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Ideas",
    url: "/ideas",
    icon: Lightbulb,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
];

export const IDEA_SORT_OPTIONS = [
  {
    value: `relevance`,
    label: 'Relevance',
    icon: Target,
  },
  {
    value: 'trending',
    label: 'Trending',
    icon: TrendingUp,
  },
  {
    value: 'latest',
    label: 'Latest',
    icon: Clock,
  },
  {
    value: 'topvoted',
    label: 'Top Voted',
    icon: ThumbsUp,
  }
];

export const IDEA_TIME_PERIOD_OPTIONS = [
  {
    value: 'month',
    label: 'Monthly',
  },
  {
    value: 'week',
    label: 'Weekly',
  },
  {
    value: 'day',
    label: 'Daily',
  },
  {
    value: 'year',
    label: 'Yearly',
  }
];

export const STAGE_CONFIG: StageConfig[] = [
  {
    value: 'idea',
    label: 'Idea',
    icon: Lightbulb,
    description: 'Initial concept phase',
    color: 'text-yellow-500'
  },
  {
    value: 'validation',
    label: 'Validation',
    icon: Target,
    description: 'Market research & validation',
    color: 'text-blue-500'
  },
  {
    value: 'prototype',
    label: 'Prototype',
    icon: FlaskConical,
    description: 'Building & testing phase',
    color: 'text-purple-500'
  },
  {
    value: 'mvp',
    label: 'MVP',
    icon: Rocket,
    description: 'Minimum viable product',
    color: 'text-orange-500'
  },
  {
    value: 'launched',
    label: 'Launched',
    icon: Flag,
    description: 'Live in production',
    color: 'text-green-500'
  },
  {
    value: 'all',
    label: 'All',
    icon: List,
    description: 'All ideas',
    color: 'text-gray-500'
  }
];

export const BUSINESS_MODEL = [
  { id: BusinessModel.saas, label: "SaaS" },
  { id: BusinessModel.physicalProduct, label: "Physical Product" },
  { id: BusinessModel.subscription, label: "Subscription" },
  { id: BusinessModel.adModel, label: "Ad Model" },
  { id: BusinessModel.membership, label: "Membership" },
  { id: BusinessModel.freemium, label: "Freemium" },
  { id: BusinessModel.marketplace, label: "Marketplace" },
  { id: BusinessModel.licensing, label: "Licensing" },
  { id: BusinessModel.oneTimePurchase, label: "One-Time Purchase" },
  { id: BusinessModel.transactionFee, label: "Transaction Fee" },
  { id: BusinessModel.affiliateMarketing, label: "Affiliate Marketing" },
  { id: BusinessModel.consulting, label: "Consulting" },
  { id: BusinessModel.crowdsourcing, label: "Crowdsourcing" },
  { id: BusinessModel.payPerUse, label: "Pay Per Use" },
  { id: BusinessModel.dataMonetization, label: "Data Monetization" },
  { id: BusinessModel.hardwarePlusSoftware, label: "Hardware + Software" },
  { id: BusinessModel.platformAsAService, label: "Platform as a Service (PaaS)" },
  { id: BusinessModel.blockchainBased, label: "Blockchain-Based" },
  { id: BusinessModel.donationBased, label: "Donation-Based" },
  { id: BusinessModel.bundling, label: "Bundling" },
  { id: BusinessModel.franchise, label: "Franchise" },
  { id: BusinessModel.peerToPeer, label: "Peer-to-Peer" },
  { id: BusinessModel.cooperative, label: "Cooperative" },
  { id: BusinessModel.sponsorship, label: "Sponsorship" },
  { id: BusinessModel.other, label: "Other" }
];


export const INDUSTRIES = [
  { id: "advertising", label: "Advertising" },
  { id: "aerospace", label: "Aerospace" },
  { id: "agriculture", label: "Agriculture" },
  { id: "artificialIntelligence", label: "Artificial Intelligence" },
  { id: "automotive", label: "Automotive" },
  { id: "beauty", label: "Beauty" },
  { id: "biotechnology", label: "Biotechnology" },
  { id: "blockchain", label: "Blockchain" },
  { id: "cannabis", label: "Cannabis" },
  { id: "chemicals", label: "Chemicals" },
  { id: "construction", label: "Construction" },
  { id: "consulting", label: "Consulting" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "defense", label: "Defense" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "education", label: "Education" },
  { id: "energy", label: "Energy" },
  { id: "entertainment", label: "Entertainment" },
  { id: "environmental", label: "Environmental" },
  { id: "fashion", label: "Fashion" },
  { id: "finance", label: "Finance" },
  { id: "foodBeverage", label: "Food & Beverage" },
  { id: "furniture", label: "Furniture" },
  { id: "gaming", label: "Gaming" },
  { id: "government", label: "Government" },
  { id: "healthcare", label: "Healthcare" },
  { id: "hospitality", label: "Hospitality" },
  { id: "insurance", label: "Insurance" },
  { id: "legalServices", label: "Legal Services" },
  { id: "logistics", label: "Logistics" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "marketing", label: "Marketing" },
  { id: "media", label: "Media" },
  { id: "mining", label: "Mining" },
  { id: "nonprofit", label: "Non-Profit" },
  { id: "packaging", label: "Packaging" },
  { id: "pets", label: "Pets" },
  { id: "pharmaceuticals", label: "Pharmaceuticals" },
  { id: "printing", label: "Printing" },
  { id: "realEstate", label: "Real Estate" },
  { id: "renewableEnergy", label: "Renewable Energy" },
  { id: "research", label: "Research" },
  { id: "retail", label: "Retail" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
  { id: "telecommunications", label: "Telecommunications" },
  { id: "textiles", label: "Textiles" },
  { id: "tourism", label: "Tourism" },
  { id: "transportation", label: "Transportation" },
  { id: "wasteManagement", label: "Waste Management" },
  { id: "other", label: "Other" },
];
