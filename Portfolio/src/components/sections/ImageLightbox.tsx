import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Achievement } from "@/data/achievements";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement | null;
  startIndex?: number;
}

export function ImageLightbox({ 
  isOpen, 
  onClose, 
  achievement, 
  startIndex = 0 
}: ImageLightboxProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Sync Carousel with index when opened
  useEffect(() => {
    if (!api || !isOpen) return;
    // Use a small timeout to ensure carousel has rendered its items
    const timer = setTimeout(() => {
      api.scrollTo(startIndex, true);
    }, 50);
    return () => clearTimeout(timer);
  }, [api, isOpen, startIndex]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!achievement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] h-[90vh] p-0 border-none bg-black/60 backdrop-blur-2xl transition-all duration-500 shadow-2xl overflow-hidden focus-visible:outline-none z-[100]">
        <DialogTitle className="sr-only">Image Gallery for {achievement.title}</DialogTitle>
        
        <div className="relative w-full h-full flex flex-col group/lightbox">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto">
              <span className="text-[10px] sm:text-xs font-bold text-white/90 tracking-[0.2em] uppercase">
                {achievement.event} — {current + 1} / {count}
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 text-white pointer-events-auto group/close"
            >
              <X className="h-5 w-5 sm:h-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Main Carousel Area */}
          <div className="flex-1 min-h-0 relative">
            <Carousel setApi={setApi} className="w-full h-full">
              <CarouselContent className="h-full ml-0">
                {achievement.photos.map((photo, i) => (
                  <CarouselItem key={i} className="h-full pl-0 flex items-center justify-center p-4 sm:p-12">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative max-w-full max-h-full"
                     >
                        <img 
                            src={photo} 
                            alt={`${achievement.title} - ${i + 1}`}
                            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
                        />
                        {/* Subtle scanline overlay to match the theme */}
                        <div className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                     </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Internal Navigation Arrows (Visible on hover) */}
              <div className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-50 opacity-0 group-hover/lightbox:opacity-100 transition-opacity duration-300">
                <div className="pointer-events-auto">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 sm:h-14 sm:w-14 bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all transform hover:scale-110 active:scale-95" />
                </div>
                <div className="pointer-events-auto">
                    <CarouselNext className="static translate-y-0 h-12 w-12 sm:h-14 sm:w-14 bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all transform hover:scale-110 active:scale-95" />
                </div>
              </div>
            </Carousel>
          </div>

          {/* Bottom Footer (Minimal) */}
          <div className="p-4 sm:p-6 pt-0 text-center pointer-events-none opacity-40">
             <p className="text-white text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-medium">
               Digital Experience Integration — Suite_v2.0
             </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
