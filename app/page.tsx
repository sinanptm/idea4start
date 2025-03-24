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
      <div className="px-4 sm:px-6 lg:px-8 py-12 space-y-10">
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
