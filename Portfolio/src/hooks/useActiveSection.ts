import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useActiveSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPathRef = useRef(pathname);
  const isNavigating = useRef(false);

  // Keep the ref in sync with the current URL
  useEffect(() => {
    currentPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    // We only set up ONE observer that lives for the lifetime of the component
    const observer = new IntersectionObserver(
      (entries) => {
        // If we are currently in middle of an automated navigation, skip detection
        if (isNavigating.current) return;

        let maxRatio = 0;
        let selectedId = "";
        
        entries.forEach((entry) => {
          const viewportRatio = entry.intersectionRect.height / entry.rootBounds!.height;
          if (entry.isIntersecting && viewportRatio > maxRatio) {
            maxRatio = viewportRatio;
            selectedId = entry.target.id;
          }
        });

        if (selectedId) {
          const newPath = selectedId === "home" ? "/" : `/${selectedId}`;
          
          if (newPath !== currentPathRef.current) {
            isNavigating.current = true;
            navigate(newPath, { replace: true });
            
            setTimeout(() => {
              isNavigating.current = false;
            }, 150);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: "-40% 0px -40% 0px", // Sharp focus on the center 20%
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [navigate]); // navigate is stable, so this only runs once on mount

  return null;
}
