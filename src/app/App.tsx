import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SiteChrome } from '../components/SiteChrome';
import { ROUTES } from '../lib/routes';
import { HomePage } from '../pages/HomePage'; 
import { KidsPage } from '../pages/KidsPage'; 
import { HistoryPage } from '../pages/HistoryPage'; 
import { IndiaPage } from '../pages/IndiaPage'; 
import { MicrodramaPage } from '../pages/MicrodramaPage'; 
import { StudioPage } from '../pages/StudioPage'; 
import { ResourcesPage } from '../pages/ResourcesPage'; 
import { HowToUsePage } from '../pages/HowToUsePage'; 
import { BlogPage } from '../pages/BlogPage'; 
import { ContactPage } from '../pages/ContactPage'; 
import { CommunityPage } from '../pages/CommunityPage'; 
import { PricingPage } from '../pages/PricingPage'; 
import { FAQPage } from '../pages/FAQPage'; 
import { PrivacyPage } from '../pages/PrivacyPage'; 
import { CreditsPage } from '../pages/CreditsPage'; 
import { TermsPage } from '../pages/TermsPage'; 
import { RefundPage } from '../pages/RefundPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

const titles: Record<string, string> = {
  [ROUTES.HOME]: 'Vivi — AI Video Storytelling',
  [ROUTES.KIDS]: 'Vivi — Kids Stories',
  [ROUTES.HISTORY]: 'Vivi — History Stories',
  [ROUTES.INDIA]: 'Vivi — India Stories',
  [ROUTES.MICRODRAMA]: 'Vivi — Microdramas',
  [ROUTES.STUDIO]: 'Vivi Studio',
  [ROUTES.RESOURCES]: 'Vivi — Resources',
  [ROUTES.HOW_TO_USE]: 'Vivi — How to Use',
  [ROUTES.BLOG]: 'Vivi — Blog',
  [ROUTES.CONTACT]: 'Vivi — Contact',
  [ROUTES.COMMUNITY]: 'Vivi — Community',
  [ROUTES.PRICING]: 'Vivi — Pricing',
  [ROUTES.FAQ]: 'Vivi — FAQ',
  [ROUTES.PRIVACY]: 'Vivi — Privacy Policy',
  [ROUTES.CREDITS]: 'Vivi — Credit Calculator',
  [ROUTES.TERMS]: 'Vivi — Terms & Conditions',
  [ROUTES.REFUND]: 'Vivi — Refund & Cancellation',

  [ROUTES.LOGIN]: 'Vivi — Log In',
  [ROUTES.SIGNUP]: 'Vivi — Sign Up',
};

function MetaTitle(){const {pathname}=useLocation(); const title=titles[pathname]??'Vivi AI'; document.title=title; const description='Vivi AI creates long-form videos with consistent characters and complete story arcs.'; let meta=document.querySelector('meta[name=description]') as HTMLMetaElement|null; if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);} meta.content=description; let canonical=document.querySelector('link[rel=canonical]') as HTMLLinkElement|null; if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);} canonical.href=window.location.origin+pathname; return null;}
export function AppShell() {
  return (
    <>
      <MetaTitle />

      <SiteChrome />

      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.KIDS}
          element={<KidsPage />}
        />

        <Route
          path={ROUTES.HISTORY}
          element={<HistoryPage />}
        />

        <Route
          path={ROUTES.INDIA}
          element={<IndiaPage />}
        />

        <Route
          path={ROUTES.MICRODRAMA}
          element={<MicrodramaPage />}
        />

        <Route
          path={ROUTES.STUDIO}
          element={<StudioPage />}
        />

        <Route
          path={ROUTES.RESOURCES}
          element={<ResourcesPage />}
        />

        <Route
          path={ROUTES.HOW_TO_USE}
          element={<HowToUsePage />}
        />

        <Route
          path={ROUTES.BLOG}
          element={<BlogPage />}
        />

        <Route
          path={ROUTES.CONTACT}
          element={<ContactPage />}
        />

        <Route
          path={ROUTES.COMMUNITY}
          element={<CommunityPage />}
        />

        <Route
          path={ROUTES.PRICING}
          element={<PricingPage />}
        />

        <Route
          path={ROUTES.FAQ}
          element={<FAQPage />}
        />

        <Route
          path={ROUTES.PRIVACY}
          element={<PrivacyPage />}
        />

        <Route
          path={ROUTES.CREDITS}
          element={<CreditsPage />}
        />

        <Route
          path={ROUTES.TERMS}
          element={<TermsPage />}
        />

        <Route
          path={ROUTES.REFUND}
          element={<RefundPage />}
        />

        {/* AUTH */}
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />

        <Route
          path={ROUTES.SIGNUP}
          element={<SignupPage />}
        />

        <Route
          path="/404"
          element={
            <div className="not-found">
              <h1>Page not found</h1>
              <p>
                The page you're looking for doesn't exist.
              </p>
            </div>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
    </>
  );
}
export function App(){return <BrowserRouter><AppShell/></BrowserRouter>}
