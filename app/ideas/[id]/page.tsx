import Container from "@/components/Container";
import { IIdea, BusinessModel } from "@/types";
import IdeaDetailHeader from "@/components/idea/IdeaDetailHeader";
import IdeaDetailContent from "@/components/idea/IdeaDetailContent";
import IdeaDetailSidebar from "@/components/idea/IdeaDetailSideBar";
import IdeaComments from "@/components/idea/IdeaComments";
import { notFound } from "next/navigation";

// This would normally be fetched server-side based on the ID
const getMockIdea = (id: string): IIdea | undefined => {
  const mockIdeas: IIdea[] = [
    {
      _id: "1",
      title: "AI-Powered Content Generator for Small Businesses",
      description: "A tool that helps small businesses create marketing content using AI, saving time and resources. The platform would analyze the business's brand voice, target audience, and marketing goals to generate tailored content for social media, email campaigns, and blog posts. Features would include templates, customization options, and performance analytics.",
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
      problemStatement: "Small businesses struggle to create consistent, high-quality content for marketing due to limited resources, time constraints, and lack of specialized skills. This leads to inconsistent brand messaging and missed opportunities for customer engagement.",
      relatedUrls: ["https://example.com/blog/ai-marketing", "https://example.com/research/small-business-challenges"],
      stage: "prototype",
      risks: ["AI content quality consistency", "Market saturation", "Regulatory changes around AI content"],
      businessModel: BusinessModel.saas,
      voteScore: 37
    }
  ];
  
  return mockIdeas.find(idea => idea._id === id);
};

export default async function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }  ) {
  const idea = getMockIdea((await params).id);
  
  if (!idea) {
    notFound();
  }
  
  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IdeaDetailHeader idea={idea} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <IdeaDetailContent idea={idea} />
            <div className="mt-10">
              <IdeaComments ideaId={idea._id} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <IdeaDetailSidebar idea={idea} />
          </div>
        </div>
      </div>
    </Container>
  );
}
