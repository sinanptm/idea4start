'use client'
import Container from "@/components/Container";
import IdeaHeader from "@/components/idea/IdeaHeader";
import IdeaList from "@/components/idea/IdeaList";
import IdeaFilters from "@/components/idea/IdeaFilters";
import { Suspense } from "react";
import { IIdea, BusinessModel } from "@/types";

// This would normally be fetched server-side
const mockIdeas: IIdea[] = [
  {
    _id: "1",
    title: "AI-Powered Content Generator for Small Businesses",
    description: "A tool that helps small businesses create marketing content using AI, saving time and resources.",
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-10-15"),
    isPublic: true,
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    userBuyMeACoffeeUrl: "https://buymeacoffee.com/sarahj",
    industry: ["Marketing", "AI"],
    tags: ["content", "ai", "marketing", "automation"],
    upVotes: 42,
    downVotes: 5,
    problemStatement: "Small businesses struggle to create consistent, high-quality content for marketing.",
    stage: "prototype",
    voteScore: 37,
    businessModel: BusinessModel.saas
  },
  {
    _id: "2",
    title: "Sustainable Packaging Marketplace",
    description: "A B2B marketplace connecting businesses with sustainable packaging suppliers to reduce environmental impact.",
    createdAt: new Date("2023-09-28"),
    updatedAt: new Date("2023-10-10"),
    isPublic: true,
    userName: "Michael Chen",
    userEmail: "michael@example.com",
    industry: ["Retail", "Sustainability"],
    tags: ["eco-friendly", "packaging", "marketplace", "b2b"],
    upVotes: 38,
    downVotes: 3,
    problemStatement: "Businesses struggle to find affordable sustainable packaging options.",
    stage: "validation",
    voteScore: 35,
    businessModel: BusinessModel.marketplace
  },
  {
    _id: "3",
    title: "Remote Team Wellness Platform",
    description: "A platform that helps remote teams stay connected and maintain mental wellness through activities and challenges.",
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-12"),
    isPublic: true,
    userName: "Alex Rivera",
    userEmail: "alex@example.com",
    userBuyMeACoffeeUrl: "https://buymeacoffee.com/alexr",
    industry: ["Health", "Remote Work"],
    tags: ["wellness", "remote work", "team building", "mental health"],
    upVotes: 56,
    downVotes: 8,
    problemStatement: "Remote teams struggle with isolation and maintaining team cohesion.",
    stage: "mvp",
    voteScore: 48,
    businessModel: BusinessModel.subscription
  }
];

export default function IdeasPage() {
  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <IdeaHeader />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <IdeaFilters />
          </div>
          
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="text-center py-10">Loading ideas...</div>}>
              <IdeaList ideas={mockIdeas} />
            </Suspense>
          </div>
        </div>
      </div>
    </Container>
  );
}
