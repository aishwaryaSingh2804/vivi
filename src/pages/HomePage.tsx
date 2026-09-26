import { LegacyPage } from '../components/LegacyPage';
import { HeroSection } from '../components/home/HeroSection';
import { pageContent } from '../content';

export function HomePage() {
  return (
    <>
      <HeroSection />

      <LegacyPage
        html={pageContent.home}
        pageKey="home"
      />
    </>
  );
}