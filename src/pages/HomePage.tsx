import { LegacyPage } from '../components/LegacyPage';
import { HeroSection } from '../components/home/HeroSection';
import { pageContent } from '../content';
import { WorkflowSection } from "../components/home/Workflow/WorkflowSection";
export function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkflowSection />
      <LegacyPage
        html={pageContent.home}
        pageKey="home"
      />

    </>
  );
}