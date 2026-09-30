import { LegacyPage } from '../components/LegacyPage';
import { HeroSection } from '../components/home/HeroSection';
import { pageContent } from '../content';
import { WorkflowSection } from "../components/home/Workflow/WorkflowSection";
import { PricingSection } from "../components/pricing/PricingSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkflowSection />
      <LegacyPage
        html={pageContent.home}
        pageKey="home"
      />
      <PricingSection />

    </>
  );
}