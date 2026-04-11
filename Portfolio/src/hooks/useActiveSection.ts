import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let selectedId = "";
        
        entries.forEach((entry) => {
          // Calculate how much of the viewport this section occupies
          const viewportRatio = entry.intersectionRect.height / entry.rootBounds!.height;
          
          // We also check intersectionRatio to ensure it's actually in view
          if (entry.isIntersecting && viewportRatio > maxRatio) {
            maxRatio = viewportRatio;
            selectedId = entry.target.id;
          }
        });

        // Always prioritize the section that occupies most of the viewport
        if (selectedId) setActiveSection(selectedId);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -40% 0px", // Biased towards the top of the viewport
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return { activeSection, setActiveSection };
}
