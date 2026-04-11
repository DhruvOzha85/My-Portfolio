import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Trophy, ArrowRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { achievements } from "@/data/achievements";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function AchievementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { warpTo } = useQuantumTransition();
  const navigate = useNavigate();

  // Find the latest achievement
  const latestAchievement = achievements.find(a => a.isLatest) || achievements[0];

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    // Check if already shown in this session
    const hasBeenShown = sessionStorage.getItem("achievement-popup-shown");
    
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("achievement-popup-shown", "true");
      }, 3000); // 3s delay for better discovery

      return () => clearTimeout(timer);
    }
  }, []);

  const handleViewDetails = () => {
    setIsOpen(false);
    // Navigate and trigger smooth warp through NavigationManager
    setTimeout(() => {
      navigate("/achievements", { state: { manualNav: true } });
    }, 150);
  };

  if (!latestAchievement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card/80 backdrop-blur-3xl border-primary/20 shadow-[0_0_80px_-12px_rgba(var(--primary-rgb),0.5)]">
        <DialogTitle className="sr-only">Latest Achievement: {latestAchievement.title}</DialogTitle>
        
        <div className="relative group/popup">
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-[60] p-2.5 rounded-full bg-background/40 hover:bg-background/60 transition-colors backdrop-blur-md"
          >
            <X className="h-5 w-5" />
          </button>

            <div className="h-[450px] w-full relative group/gallery transition-all duration-500">
              {/* Tech Decorations */}
              <div className="absolute top-4 left-4 z-50 flex items-center gap-2 pointer-events-none">
                <Badge className="bg-[var(--bg-card)]/60 backdrop-blur-md border-[var(--border-accent)] text-[var(--accent-primary)] font-bold px-3 py-1">
                  NEW
                </Badge>
                <Badge variant="outline" className="bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[10px] uppercase tracking-tighter shadow-[0_0_10px_var(--glow-primary)]">
                  LATEST WIN
                </Badge>
              </div>

              <Carousel setApi={setApi} className="w-full h-full">
                <CarouselContent className="h-full">
                  {latestAchievement.photos.map((photo, i) => (
                    <CarouselItem key={i} className="h-full">
                      <div className="relative h-[450px] w-full bg-[var(--bg-secondary)]/30">
                         {/* Decorative Placeholder Background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <Trophy className="w-16 h-16 text-[var(--accent-primary)] animate-pulse" />
                        </div>

                        <img 
                          src={photo} 
                          alt={`${latestAchievement.title} - ${i + 1}`}
                          className="w-full h-full object-cover relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-20" />
                        
                        {/* Scanline Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Internal Navigation arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity pointer-events-none z-50">
                  <CarouselPrevious className="relative left-0 pointer-events-auto bg-background/30 border-white/10 hover:bg-primary/20" />
                  <CarouselNext className="relative right-0 pointer-events-auto bg-background/30 border-white/10 hover:bg-primary/20" />
                </div>

              {/* Indicators */}
              <div className="absolute bottom-6 right-8 flex gap-1 z-30">
                {Array.from({ length: count }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      current === i 
                        ? "w-4 bg-[var(--accent-primary)] shadow-[0_0_10px_var(--glow-primary)]" 
                        : "w-1 bg-[var(--text-muted)]/30"
                    )}
                  />
                ))}
              </div>
            </Carousel>
            
            {/* Animated Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 left-8 p-4 rounded-2xl bg-[var(--accent-primary)] shadow-xl shadow-[var(--glow-primary)]/40 z-40"
            >
              <Trophy className="h-8 w-8 text-[var(--bg-card)]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-[var(--bg-card)]/30 rounded-2xl pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 pt-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-[var(--accent-primary)] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)]/80">Latest Achievement!</span>
            </div>
            
            <h3 className="text-2xl font-display font-bold mb-3 gradient-text">
              {latestAchievement.title}
            </h3>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2">
              {latestAchievement.projectDescription}
            </p>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleViewDetails}
                className="w-full h-12 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl font-bold group text-[var(--bg-card)]"
              >
                View Full Details
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors text-center py-2"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
