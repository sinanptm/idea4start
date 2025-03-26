import { memo } from "react";
import Container from "@/components/Container";
import HeroSection from "@/components/home/HeroSection";
import FeaturedIdeas from "@/components/home/FeaturedIdeas";
import HowItWorks from "@/components/home/HowItWorks";
import AiSection from "@/components/home/AiSection";
import CommunitySection from "@/components/home/CommunitySection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16 lg:space-y-20 py-6 md:py-8">
        <HeroSection />
        <FeaturedIdeas />
        <HowItWorks />
        <AiSection />
        <CommunitySection />
        <TestimonialSection />
        <CTASection />
      </div>
    </Container>
  );
};

export default memo(HomePage);
