import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

import { lazy, Suspense, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Index";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/StructuredData";
import PageTransition from "@/components/PageTransition";
import { initMetrikaTracking } from "@/utils/metrika";

const Citizens = lazy(() => import("@/pages/Citizens"));
const Services = lazy(() => import("@/pages/Services"));
const Pricing = lazy(() => import("@/pages/Pricing"));

const About = lazy(() => import("@/pages/About"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const DTPLawyer = lazy(() => import("@/components/DTPLawyer"));
const DTPLawyerChoice = lazy(() => import("@/pages/DTPLawyerChoice"));
const GuiltDetermination = lazy(() => import("@/pages/GuiltDetermination"));
const InsuranceDispute = lazy(() => import("@/pages/InsuranceDispute"));
const DamageClaim = lazy(() => import("@/pages/DamageClaim"));
const DamageClaimB = lazy(() => import("@/pages/DamageClaimB"));
const LicenseAlcohol = lazy(() => import("@/pages/LicenseAlcohol"));
const IllegalFine = lazy(() => import("@/pages/IllegalFine"));
const BadRepair = lazy(() => import("@/pages/BadRepair"));
const Migration = lazy(() => import("@/pages/Migration"));

const Sitemap = lazy(() => import("@/pages/Sitemap"));
const Promo = lazy(() => import("@/pages/Promo"));
const ConsumerRights = lazy(() => import("@/pages/ConsumerRights"));
const CarLawyer = lazy(() => import("@/pages/CarLawyer"));
const Business = lazy(() => import("@/pages/Business"));
const BusinessServices = lazy(
  () => import("@/pages/business/BusinessServices"),
);
const BusinessCases = lazy(() => import("@/pages/business/BusinessCases"));
const BusinessPricing = lazy(() => import("@/pages/business/BusinessPricing"));
const BusinessContactsPage = lazy(
  () => import("@/pages/business/BusinessContacts"),
);
const ConsumerProtection = lazy(() => import("@/pages/ConsumerProtection"));
const DTPLanding = lazy(() => import("@/pages/DTPLanding"));
const FamilyLawyer = lazy(() => import("@/pages/FamilyLawyer"));
const BankruptcyLawyer = lazy(() => import("@/pages/BankruptcyLawyer"));
const DebtCollection = lazy(() => import("@/pages/DebtCollection"));
const FloodDamage = lazy(() => import("@/pages/FloodDamage"));
const RealEstateLawyer = lazy(() => import("@/pages/RealEstateLawyer"));
const CriminalLawyer = lazy(() => import("@/pages/CriminalLawyer"));

// ДОБАВЛЕНЫ НОВЫЕ ИМПОРТЫ ↓
const DocumentAnalysis = lazy(() => import("@/pages/DocumentAnalysis"));
const CourtRepresentation = lazy(() => import("@/pages/CourtRepresentation"));
const ConstructionDisputes = lazy(() => import("@/pages/ConstructionDisputes"));
const LaborLaw = lazy(() => import("@/pages/LaborLaw"));
const LandLaw = lazy(() => import("@/pages/LandLaw"));

function AppContent() {
  const location = useLocation();
  const showNavigation = location.pathname !== "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      initMetrikaTracking();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageTransition />
      <div className="min-h-screen bg-background">
        {showNavigation && <Navigation />}
        <main>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/citizens" element={<Citizens />} />
              <Route path="/business" element={<Business />} />
              <Route path="/business/services" element={<BusinessServices />} />
              <Route path="/business/cases" element={<BusinessCases />} />
              <Route path="/business/pricing" element={<BusinessPricing />} />
              <Route
                path="/business/contacts"
                element={<BusinessContactsPage />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dtp-lawyer" element={<DTPLawyerChoice />} />
              <Route
                path="/dtp-lawyer/guilt-determination"
                element={<GuiltDetermination />}
              />
              <Route
                path="/dtp-lawyer/insurance-dispute"
                element={<InsuranceDispute />}
              />
              <Route
                path="/dtp-lawyer/damage-claim"
                element={<DamageClaim />}
              />
              <Route
                path="/dtp-lawyer/damage-claim-b"
                element={<DamageClaimB />}
              />
              <Route
                path="/dtp-lawyer/license-alcohol"
                element={<LicenseAlcohol />}
              />
              <Route
                path="/dtp-lawyer/illegal-fine"
                element={<IllegalFine />}
              />
              <Route path="/dtp-lawyer/bad-repair" element={<BadRepair />} />
              <Route path="/migration" element={<Migration />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sitemap.xml" element={<Sitemap />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/consumer-rights" element={<ConsumerRights />} />
              <Route
                path="/consumer-protection"
                element={<ConsumerProtection />}
              />
              <Route path="/car-lawyer" element={<CarLawyer />} />
              <Route path="/dtp-landing" element={<DTPLanding />} />
              <Route path="/family-lawyer" element={<FamilyLawyer />} />
              <Route path="/bankruptcy-lawyer" element={<BankruptcyLawyer />} />
              <Route path="/debt-collection" element={<DebtCollection />} />
              <Route path="/flood-damage" element={<FloodDamage />} />
              <Route
                path="/real-estate-lawyer"
                element={<RealEstateLawyer />}
              />
              <Route path="/criminal-lawyer" element={<CriminalLawyer />} />
              // ДОБАВЛЕНЫ НОВЫЕ МАРШРУТЫ ↓
              <Route path="/document-analysis" element={<DocumentAnalysis />} />
              <Route
                path="/court-representation"
                element={<CourtRepresentation />}
              />
              <Route
                path="/construction-disputes"
                element={<ConstructionDisputes />}
              />
              <Route path="/labor-law" element={<LaborLaw />} />
              <Route path="/land-law" element={<LandLaw />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <ScrollToTop />
        <SmoothScroll />
        <StructuredData />
        <Toaster />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
