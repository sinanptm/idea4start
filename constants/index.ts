import { BusinessModel, StageConfig } from "@/types";
import { Home, Lightbulb, Info, Rocket, FlaskConical, Target, Flag, TrendingUp, Clock, ThumbsUp, List } from "lucide-react";

export const APP_NAME = "Idea4Start";

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
  },
  
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
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "realEstate", label: "Real Estate" },
  { id: "transportation", label: "Transportation" },
  { id: "entertainment", label: "Entertainment" },
  { id: "foodBeverage", label: "Food & Beverage" },
  { id: "retail", label: "Retail" },
  { id: "energy", label: "Energy" },
  { id: "agriculture", label: "Agriculture" },
  { id: "media", label: "Media" },
  { id: "sports", label: "Sports" }
];
