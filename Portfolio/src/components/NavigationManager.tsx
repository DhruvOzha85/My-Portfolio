import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";
import { useActiveSection } from "@/hooks/useActiveSection";

export function NavigationManager() {
  const { pathname } = useLocation();
  const { warpTo } = useQuantumTransition();
  const { setActiveSection } = useActiveSection();
  const lastPathname = useRef(pathname);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // 1. Determine target section from path
    // e.g. "/projects" -> "projects", "/" -> "home"
    const targetSection = pathname === "/" ? "home" : pathname.slice(1);
    
    // 2. Sync active section state for Navbar highlighting
    setActiveSection(targetSection);

    // 3. Handle the warp transition
    const handleWarp = () => {
      // For initial load, we wait slightly for preloader and components to mount
      const delay = isInitialLoad.current ? 3500 : 0; 
      
      setTimeout(() => {
        warpTo(targetSection);
        isInitialLoad.current = false;
      }, delay);
    };

    // Only warp if the path actually changed or it's the first visit
    if (pathname !== lastPathname.current || isInitialLoad.current) {
      handleWarp();
    }
    
    lastPathname.current = pathname;
  }, [pathname, warpTo, setActiveSection]);

  return null; // This is a headless logic component
}
