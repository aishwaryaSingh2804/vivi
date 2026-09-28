import { LegacyPage } from '../components/LegacyPage';
import { HeroSection } from '../components/home/HeroSection';
import { HowViviWorks } from '../components/home/HowViviWorks';
import { pageContent } from '../content';

export function HomePage() {
  return (
    <>
      <HeroSection />
<HowViviWorks />
      <LegacyPage
        html={pageContent.home}
        pageKey="home"
      />

    </>
  );
}