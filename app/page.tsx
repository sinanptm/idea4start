import Container from "@/components/Container";
import { memo } from "react";
import HeaderSection from "@/components/HeaderSection";

const HomePage = () => {
  return (
    <Container>
      <div className="w-full flex flex-col gap-6">
        <HeaderSection />
      </div>
      <div className="w-full flex flex-col gap-6 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">TODO List:</h2>
        <ul className="space-y-3 list-disc pl-5">
          <li>Implement Auth0 for authentication</li>
          <li>Add ai validation to the ideas when creating </li>
          <li>Add ai Enhancements to the fields when creating ideas, eg: title, description, value proposition, etc.</li>
          <li>Implement featured ideas section</li>
          <li>Create &quot;How it works&quot; section</li>
          <li>Add About us page with the story of the website</li>
          <li>Add comment section to each idea</li>
        </ul>
      </div>
    </Container>
  );
};

export default memo(HomePage);