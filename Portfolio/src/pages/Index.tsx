import { useState, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { Footer } from "@/components/sections/Footer";
import type { Achievement } from "@/data/achievements";

// Lazy-load heavy / below-fold components to reduce initial bundle
const BackgroundEffects = lazy(() => import("@/components/BackgroundEffects").then(m => ({ default: m.BackgroundEffects })));
const SkillsSection = lazy(() => import("@/components/sections/SkillsSection").then(m => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const AchievementsSection = lazy(() => import("@/components/sections/AchievementsSection").then(m => ({ default: m.AchievementsSection })));
const CertificatesSection = lazy(() => import("@/components/sections/CertificatesSection").then(m => ({ default: m.CertificatesSection })));
const LeetCodeSection = lazy(() => import("@/components/sections/LeetCodeSection").then(m => ({ default: m.LeetCodeSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const AchievementPopup = lazy(() => import("@/components/sections/AchievementPopup").then(m => ({ default: m.AchievementPopup })));
const ImageLightbox = lazy(() => import("@/components/sections/ImageLightbox").then(m => ({ default: m.ImageLightbox })));

const Index = () => {
  const [lightboxData, setLightboxData] = useState<{ achievement: Achievement; startIndex: number } | null>(null);

  return (
    <div className="relative min-h-screen" style={{ overflowX: 'clip' }}>
      <SEO />
      <Preloader />
      <CustomCursor />
      <Suspense fallback={null}>
        <BackgroundEffects />
      </Suspense>
      <Navbar />

      <main role="main" aria-label="Portfolio content">
        <HeroSection />
        <AboutSection />
        <Suspense fallback={<div className="min-h-screen" />}>
          <SkillsSection />
          <AchievementsSection 
            onImageClick={(achievement, index) => setLightboxData({ achievement, startIndex: index })} 
          />
          <ProjectsSection />
          <CertificatesSection />
          <LeetCodeSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <AchievementPopup />
        <ImageLightbox 
          isOpen={!!lightboxData} 
          onClose={() => setLightboxData(null)}
          achievement={lightboxData?.achievement || null}
          startIndex={lightboxData?.startIndex || 0}
        />
      </Suspense>
    </div>
  );
};

export default Index;
