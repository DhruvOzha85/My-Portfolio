import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for raw position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth tracking
  const dotSpringX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const dotSpringY = useSpring(mouseY, { stiffness: 800, damping: 50 });
  
  const ringSpringX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const ringSpringY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      // Check if mouse is over scrollbar area to prevent unwanted cursor visibility
      const isOnScrollbar = e.clientX >= document.documentElement.clientWidth;
      
      if (isOnScrollbar) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, .interactive-cursor");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleInteraction);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleInteraction);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const springConfig = { stiffness: 300, damping: 30 };

  return (
    <>
      {/* Small dot - follows closely */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none z-[9999] shadow-[0_0_10px_var(--accent-primary)]"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ scale: { type: "spring", ...springConfig } }}
      />
      
      {/* Outer ring - trails behind */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent-primary)] pointer-events-none z-[9999]"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.3 : 0,
          scale: isHovering ? 1.8 : 1,
          borderWidth: isHovering ? "1px" : "2px",
        }}
        transition={{ 
          scale: { type: "spring", ...springConfig },
          opacity: { duration: 0.2 }
        }}
      >
        <AnimatePresence>
          {isHovering && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.5 }}
               className="absolute inset-0 rounded-full bg-[var(--accent-primary)]/10"
             />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// Helper to keep framer-motion imports happy if used in other places
import { AnimatePresence } from "framer-motion";
