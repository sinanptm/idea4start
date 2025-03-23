import Container from "@/components/Container";
import { memo } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedIdeas from "@/components/home/FeaturedIdeas";
import CTASection from "@/components/home/CTASection";
import HowItWorks from "@/components/home/HowItWorks";
import AiSection from "@/components/home/AiSection";

const HomePage = () => {
  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        <AiSection />
        <FeaturedIdeas />
        <HowItWorks />
        <CTASection />
      </div>
    </Container>
  );
};

export default memo(HomePage)

