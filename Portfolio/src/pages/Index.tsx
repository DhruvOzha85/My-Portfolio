import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Preloader } from "@/components/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { LeetCodeSection } from "@/components/sections/LeetCodeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { AchievementPopup } from "@/components/sections/AchievementPopup";
import { ImageLightbox } from "@/components/sections/ImageLightbox";
import type { Achievement } from "@/data/achievements";

const Index = () => {
  const [lightboxData, setLightboxData] = useState<{ achievement: Achievement; startIndex: number } | null>(null);

  return (
    <div className="relative min-h-screen" style={{ overflowX: 'clip' }}>
      <Preloader />
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AchievementsSection 
          onImageClick={(achievement, index) => setLightboxData({ achievement, startIndex: index })} 
        />
        <ProjectsSection />
        <CertificatesSection />
        <LeetCodeSection />
        <ContactSection />
      </main>

      <Footer />
      <AchievementPopup />
      
      <ImageLightbox 
        isOpen={!!lightboxData} 
        onClose={() => setLightboxData(null)}
        achievement={lightboxData?.achievement || null}
        startIndex={lightboxData?.startIndex || 0}
      />
    </div>
  );
};

export default Index;
