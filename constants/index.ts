import { BusinessModel, StageConfig } from "@/types";
import { Home, Lightbulb, Info, Rocket, FlaskConical, Target, Flag, TrendingUp, Clock, ThumbsUp, List, BarChart } from "lucide-react";

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
    label: 'This Month',
  },
  {
    value: 'week',
    label: 'This Week',
  },
  {
    value: 'day',
    label: 'Today',
  },
  {
    value: 'year',
    label: 'This Year',
  },
  {
    value: 'all',
    label: 'All Time',
  }
];

export const STAGE_CONFIG: StageConfig[] = [
  {
    value: 'idea',
    label: 'Idea',
    icon: Lightbulb,
    description: 'Initial concept without validation',
    color: 'text-yellow-500'
  },
  {
    value: 'validation',
    label: 'Validation',
    icon: BarChart,
    description: 'Testing market demand and feasibility',
    color: 'text-blue-500'
  },
  {
    value: 'prototype',
    label: 'Prototype',
    icon: FlaskConical,
    description: 'Working model to demonstrate functionality',
    color: 'text-purple-500'
  },
  {
    value: 'mvp',
    label: 'MVP',
    icon: Rocket,
    description: 'Minimum viable product with core features',
    color: 'text-orange-500'
  },
  {
    value: 'launched',
    label: 'Launched',
    icon: Flag,
    description: 'Product is live and available to users',
    color: 'text-green-500'
  },
  {
    value: 'all',
    label: 'All Stages',
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

export const LANGUAGES = [
  {
    "value": "English"
  },
  {
    "value": "French"
  },
  {
    "value": "Swiss German"
  },
  {
    "value": "Italian"
  },
  {
    "value": "Romansh"
  },
  {
    "value": "Hungarian"
  },
  {
    "value": "Chinese"
  },
  {
    "value": "Arabic"
  },
  {
    "value": "Indonesian"
  },
  {
    "value": "Portuguese"
  },
  {
    "value": "Lao"
  },
  {
    "value": "Dutch"
  },
  {
    "value": "Papiamento"
  },
  {
    "value": "Swahili"
  },
  {
    "value": "Catalan"
  },
  {
    "value": "Kirundi"
  },
  {
    "value": "Afrikaans"
  },
  {
    "value": "Southern Ndebele"
  },
  {
    "value": "Northern Sotho"
  },
  {
    "value": "Southern Sotho"
  },
  {
    "value": "Swazi"
  },
  {
    "value": "Tswana"
  },
  {
    "value": "Tsonga"
  },
  {
    "value": "Venda"
  },
  {
    "value": "Xhosa"
  },
  {
    "value": "Zulu"
  },
  {
    "value": "Spanish"
  },
  {
    "value": "Carolinian"
  },
  {
    "value": "Chamorro"
  },
  {
    "value": "Macedonian"
  },
  {
    "value": "Guernésiais"
  },
  {
    "value": "Norwegian"
  },
  {
    "value": "Danish"
  },
  {
    "value": "Faroese"
  },
  {
    "value": "Russian"
  },
  {
    "value": "Uzbek"
  },
  {
    "value": "Sinhala"
  },
  {
    "value": "Tamil"
  },
  {
    "value": "Bengali"
  },
  {
    "value": "Aymara"
  },
  {
    "value": "Quechua"
  },
  {
    "value": "Malay"
  },
  {
    "value": "Turkish"
  },
  {
    "value": "Dari"
  },
  {
    "value": "Pashto"
  },
  {
    "value": "Turkmen"
  },
  {
    "value": "Cook Islands Māori"
  },
  {
    "value": "Finnish"
  },
  {
    "value": "Swedish"
  },
  {
    "value": "Samoan"
  },
  {
    "value": "Tokelauan"
  },
  {
    "value": "Upper Guinea Creole"
  },
  {
    "value": "Azerbaijani"
  },
  {
    "value": "Korean"
  },
  {
    "value": "Mauritian Creole"
  },
  {
    "value": "Greek"
  },
  {
    "value": "Croatian"
  },
  {
    "value": "Berber"
  },
  {
    "value": "Fijian"
  },
  {
    "value": "Fiji Hindi"
  },
  {
    "value": "German"
  },
  {
    "value": "Nepali"
  },
  {
    "value": "Georgian"
  },
  {
    "value": "Urdu"
  },
  {
    "value": "Hiri Motu"
  },
  {
    "value": "Tok Pisin"
  },
  {
    "value": "Norfuk"
  },
  {
    "value": "Malagasy"
  },
  {
    "value": "Hindi"
  },
  {
    "value": "Montenegrin"
  },
  {
    "value": "Guaraní"
  },
  {
    "value": "Ukrainian"
  },
  {
    "value": "Manx"
  },
  {
    "value": "Herero"
  },
  {
    "value": "Khoekhoe"
  },
  {
    "value": "Kwangali"
  },
  {
    "value": "Lozi"
  },
  {
    "value": "Ndonga"
  },
  {
    "value": "Bulgarian"
  },
  {
    "value": "Greenlandic"
  },
  {
    "value": "Khmer"
  },
  {
    "value": "Aramaic"
  },
  {
    "value": "Sorani"
  },
  {
    "value": "Kyrgyz"
  },
  {
    "value": "Chewa"
  },
  {
    "value": "Bosnian"
  },
  {
    "value": "Serbian"
  },
  {
    "value": "Amharic"
  },
  {
    "value": "Basque"
  },
  {
    "value": "Galician"
  },
  {
    "value": "Slovene"
  },
  {
    "value": "Sotho"
  },
  {
    "value": "Marshallese"
  },
  {
    "value": "Icelandic"
  },
  {
    "value": "Luxembourgish"
  },
  {
    "value": "Nauru"
  },
  {
    "value": "Hassaniya"
  },
  {
    "value": "Thai"
  },
  {
    "value": "Haitian Creole"
  },
  {
    "value": "Tuvaluan"
  },
  {
    "value": "Belarusian"
  },
  {
    "value": "Latvian"
  },
  {
    "value": "Palauan"
  },
  {
    "value": "Filipino"
  },
  {
    "value": "Kikongo"
  },
  {
    "value": "Lingala"
  },
  {
    "value": "Tshiluba"
  },
  {
    "value": "Somali"
  },
  {
    "value": "Czech"
  },
  {
    "value": "Slovak"
  },
  {
    "value": "Bislama"
  },
  {
    "value": "Niuean"
  },
  {
    "value": "Kinyarwanda"
  },
  {
    "value": "Estonian"
  },
  {
    "value": "Romanian"
  },
  {
    "value": "Tetum"
  },
  {
    "value": "Vietnamese"
  },
  {
    "value": "Latin"
  },
  {
    "value": "Irish"
  },
  {
    "value": "Norwegian Nynorsk"
  },
  {
    "value": "Norwegian Bokmål"
  },
  {
    "value": "Sami"
  },
  {
    "value": "Sango"
  },
  {
    "value": "Tigrinya"
  },
  {
    "value": "Lithuanian"
  },
  {
    "value": "Kazakh"
  },
  {
    "value": "Armenian"
  },
  {
    "value": "Jèrriais"
  },
  {
    "value": "Japanese"
  },
  {
    "value": "Seychellois Creole"
  },
  {
    "value": "Tajik"
  },
  {
    "value": "Maltese"
  },
  {
    "value": "Albanian"
  },
  {
    "value": "Maldivian"
  },
  {
    "value": "Persian (Farsi)"
  },
  {
    "value": "Belizean Creole"
  },
  {
    "value": "Burmese"
  },
  {
    "value": "Dzongkha"
  },
  {
    "value": "Jamaican Patois"
  },
  {
    "value": "Polish"
  },
  {
    "value": "Comorian"
  },
  {
    "value": "Tongan"
  },
  {
    "value": "Gilbertese"
  },
  {
    "value": "Chibarwe"
  },
  {
    "value": "Kalanga"
  },
  {
    "value": "Khoisan"
  },
  {
    "value": "Ndau"
  },
  {
    "value": "Northern Ndebele"
  },
  {
    "value": "Shona"
  },
  {
    "value": "Tonga"
  },
  {
    "value": "Zimbabwean Sign Language"
  },
  {
    "value": "Mongolian"
  },
  {
    "value": "Hebrew"
  },
  {
    "value": "Māori"
  },
  {
    "value": "New Zealand Sign Language"
  }
];