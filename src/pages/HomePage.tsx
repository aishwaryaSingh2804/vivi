import { LegacyPage } from '../components/LegacyPage';
import { HeroSection } from '../components/home/HeroSection';
import { HowViviWorks } from '../components/home/HowViviWorks';
import { pageContent } from '../content';
import { WorkflowSection } from "../components/home/Workflow/WorkflowSection";
export function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkflowSection />
<HowViviWorks />
      <LegacyPage
        html={pageContent.home}
        pageKey="home"
      />

    </>
  );
}