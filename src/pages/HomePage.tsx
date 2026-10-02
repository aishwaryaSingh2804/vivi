import { LegacyPage } from '../components/LegacyPage';
import { HeroSection } from '../components/home/HeroSection';
import { pageContent } from '../content';
import { WorkflowSection } from "../components/home/Workflow/WorkflowSection";
import { PricingSection } from "../components/pricing/PricingSection";
import { WhyVivi } from "../components/home/WhyVivi";
import Newsletter from "../components/Newsletter";
import { BenefitsSection } from "../components/home/BenefitsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkflowSection />
      <WhyVivi />
      <BenefitsSection />
      <LegacyPage
        html={pageContent.home}
        pageKey="home"
      />
      <PricingSection />
<Newsletter />
    </>
  );
}