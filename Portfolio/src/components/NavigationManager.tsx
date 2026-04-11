import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";

export function NavigationManager() {
  const { pathname, state } = useLocation();
  const { warpTo } = useQuantumTransition();
  const lastPathname = useRef(pathname);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // 1. Determine target section from path
    const targetSection = pathname === "/" ? "home" : pathname.slice(1);
    
    // 2. Handle the warp transition
    const handleWarp = () => {
      // For initial load, we wait for preloader
      const delay = isInitialLoad.current ? 3500 : 0; 
      
      setTimeout(() => {
        warpTo(targetSection);
        isInitialLoad.current = false;
      }, delay);
    };

    // Only warp if:
    // a) It's the first time landing on the site (deep link support)
    // b) The path changed AND it was a manual user action (clicked a link)
    const isManualNav = (state as any)?.manualNav;
    const pathChanged = pathname !== lastPathname.current;

    if (isInitialLoad.current || (pathChanged && isManualNav)) {
      handleWarp();
    }
    
    lastPathname.current = pathname;
  }, [pathname, state, warpTo]);

  return null;
}
