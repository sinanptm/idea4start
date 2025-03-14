import Container from "@/components/Container";
import { memo } from "react";
import HeaderSection from "@/components/HeaderSection";
const HomePage = () => {
  return (
    <Container>
      <div className="w-full flex flex-col gap-6">
        <HeaderSection />
      </div>
    </Container>
  );
};

export default memo(HomePage);