import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section with highest intersection ratio
        let maxRatio = 0;
        let selectedId = "";
        
        entries.forEach((entry) => {
          // If a section is large enough to cover the viewport, intersectionRatio might be low
          // because it's only a fraction of the section's total height.
          // We calculate its "viewport occupancy" - how much of the viewport it fills.
          const viewportRatio = entry.intersectionRect.height / entry.rootBounds!.height;
          
          if (entry.isIntersecting && viewportRatio > maxRatio) {
            maxRatio = viewportRatio;
            selectedId = entry.target.id;
          }
        });

        if (selectedId) setActiveSection(selectedId);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-20% 0px -20% 0px", // Focus on the center 60% of viewport
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
