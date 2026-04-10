import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, AnimatePresence } from "framer-motion";
import { Award, Trophy, ChevronRight, Target } from "lucide-react";
import { certificates } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ─── Card dimensions (Responsive scaled for variety) ────────────────
const CARD_WIDTH = 440;       
const CARD_GAP = 40;          
const CARD_STEP = CARD_WIDTH + CARD_GAP;

export function CertificatesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // REVERSE ORDER: [Last, ..., 1st=SU_HACKATHON]
  // This allows us to move RIGHT while scrolling DOWN.
  const reversedCertificates = [7, 6, 5, 4, 3, 2, 1].map(id => certificates.find(c => c.id === id)!);

  const certCount = reversedCertificates.length;
  const lastIndex = certCount - 1;

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // EXACTLY like projects: Map [0.1, 0.9] to our index range.
  // For reverse scroll, we start at lastIndex (ID 1) and end at 0.
  const activeFloat = useTransform(scrollYProgress, [0.1, 0.9], [lastIndex, 0]);

  useMotionValueEvent(activeFloat, "change", (v) => {
    setActiveIndex(Math.round(v));
  });

  const baseOffset = (typeof window !== 'undefined' ? window.innerWidth / 2 : 750) - (CARD_WIDTH / 2);
  
  // Translation X: moves the track RIGHT as we scroll DOWN.
  const x = useTransform(activeFloat, [0, lastIndex], [baseOffset, baseOffset - (lastIndex * CARD_STEP)]);

  // Entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section
      id="certificates"
      ref={scrollRef}
      className="relative"
      style={{ 
        height: `${(certCount + 1) * 90}vh`,
        scrollMarginTop: "100px" 
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

        {/* ─── Header ─── */}
        <div className="relative z-20 pt-16 md:pt-24 pb-8 px-6 md:px-12 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Achievements</span>
              <div className="h-[2px] w-12 bg-primary" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              My <span className="gradient-text">Certificates</span>
            </h2>
          </motion.div>
        </div>

        {/* ─── Horizontal Track ─── */}
        <div className="flex-1 flex items-center relative mt-4">
          <motion.div
            style={{ x }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center" 
          >
            {reversedCertificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                index={index}
                activeFloat={activeFloat}
              />
            ))}
          </motion.div>
        </div>

        {/* ─── Footer / Navigation Progress ─── */}
        <div className="relative z-20 pb-16 flex flex-col items-center gap-10 px-6 md:px-20">
          <div className="flex items-center gap-3">
            {[...Array(certCount)].map((_, i) => {
                const dotIndex = lastIndex - i; 
                return (
                    <motion.div
                    key={dotIndex}
                    animate={{ 
                        width: activeIndex === dotIndex ? 24 : 8,
                        backgroundColor: activeIndex === dotIndex ? "var(--accent-primary)" : "rgba(255,255,255,0.1)",
                        opacity: activeIndex === dotIndex ? 1 : 0.5
                    }}
                    className="h-2 rounded-full transition-all duration-300"
                    />
                );
            })}
          </div>
          <div className="hidden md:flex items-center gap-3 text-muted-foreground/40 text-[10px] font-bold uppercase tracking-[0.4em]">
            <ChevronRight className="h-4 w-4 animate-pulse" />
            Scroll to Navigate
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ 
  cert, 
  index, 
  activeFloat,
}: { 
  cert: any; 
  index: number; 
  activeFloat: MotionValue<number>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Distance exactly as in Projects
  const distance = useTransform(activeFloat, (v) => Math.abs(index - v));

  // Mirror Projects exact transforms for focus [0, 1, 2]
  // Focal Scale: 1.15 at center (bit extra pop), 0.85 at 1 step, 0.75 at 2 steps
  const scale = useTransform(distance, [0, 1, 2], [1.15, 0.85, 0.75]);
  
  // Opacity: Center card = full, off-center = dimmed
  const opacity = useTransform(distance, [0, 1, 2], [1, 0.5, 0.3]);

  // Y Shift: Focal lift lift card as it centers
  const y = useTransform(distance, [0, 1, 2], [0, 15, 30]);

  // Glow: Focal Glow follows the scale/opacity logic
  const glowOpacity = useTransform(distance, [0, 1], [1, 0]);
  const glowScale = useTransform(distance, [0, 1], [1.2, 1]);

  // Entrance variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const isWinner = cert.id === 1;

  return (
    <>
      <motion.div
        variants={itemVariants}
        style={{ 
          width: CARD_WIDTH,
          scale,
          opacity,
          y,
          marginRight: CARD_GAP
        }}
        className="relative group shrink-0"
        onClick={() => setIsOpen(true)}
      >
        {/* Dynamic Focal Glow */}
        <motion.div 
          style={{ 
            opacity: glowOpacity,
            scale: glowScale,
          }}
          className={cn(
            "absolute -inset-8 rounded-[40px] blur-3xl -z-10 transition-colors duration-500",
            isWinner ? "bg-primary/40" : "bg-primary/20"
          )}
        />

        <div className={cn(
          "relative aspect-[16/11] rounded-3xl overflow-hidden border transition-all duration-500",
          isWinner 
            ? "border-primary/50 shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] bg-primary/5" 
            : "border-white/10 bg-white/5",
          "group-hover:border-primary/50 shadow-2xl"
        )}>
          {/* Certificate Image */}
          <img 
            src={cert.url} 
            alt={cert.title}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />

          {/* Premium Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end backdrop-blur-[2px]">
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileHover={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
             >
               <div className="flex items-center gap-2 mb-2">
                 <Target className="h-3 w-3 text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/90">{cert.issuer}</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                 {cert.title}
               </h3>
               <p className="text-white/80 text-sm line-clamp-3 leading-relaxed mb-4 font-medium">
                 {cert.description}
               </p>
               <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                 <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">{cert.date}</span>
                 <div className="h-1 w-1 rounded-full bg-primary/40" />
                 <span className="text-[10px] font-medium text-primary uppercase tracking-widest cursor-pointer hover:underline">View Full Details</span>
               </div>
             </motion.div>
          </div>

          {/* Winner Badge */}
          {isWinner && (
            <div className="absolute top-6 left-6 z-20">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 10px rgba(var(--primary-rgb),0.3)",
                    "0 0 30px rgba(var(--primary-rgb),0.6)",
                    "0 0 10px rgba(var(--primary-rgb),0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                WINNER
              </motion.div>
            </div>
          )}

          {/* Decor */}
          <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
            <Award className="h-8 w-8 text-primary glow-icon" />
          </div>
        </div>

        {/* Info label below card */}
        <motion.div 
          className="mt-8 mb-4 px-4"
          style={{ opacity }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary/80">{cert.issuer}</span>
          </div>
          <h4 className="text-xl md:text-2xl font-display font-bold text-foreground/90 group-hover:text-primary transition-colors">
            {cert.title}
          </h4>
        </motion.div>
      </motion.div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-white/10 shadow-[0_0_100px_rgba(var(--primary-rgb),0.3)]">
          <DialogTitle className="sr-only">{cert.title}</DialogTitle>
          <div className="relative w-full h-[85vh] flex items-center justify-center p-4">
            <img 
              src={cert.url} 
              alt={cert.title}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
