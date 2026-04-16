import { motion, AnimatePresence } from "framer-motion";
import { figmaDesigns } from "@/data/portfolio";
import { ExternalLink, Layout, Palette, Smartphone, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categoryIcons: Record<string, any> = {
  "Academic Assessment": Layout,
  "Product Design": Palette,
  "UI Exploration": Smartphone,
  "UX Research": Layout,
  "Semester Project": Smartphone,
};

export function FigmaSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedDesigns = showAll ? figmaDesigns : figmaDesigns.slice(0, 3);

  return (
    <section id="designs" className="section-padding relative overflow-hidden" aria-label="UI/UX Designs">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            UI/UX <span className="gradient-text">Designs</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of high-fidelity prototypes and architectural blueprints for digital products, focused on usability and modern aesthetics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedDesigns.map((design, index) => {
              const Icon = categoryIcons[design.category] || Layout;
              
              return (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                  className="group relative"
                >
                  <div className="relative h-full glass rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-primary/20">
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      
                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-primary)]">
                         <Icon className="w-3 h-3" />
                         {design.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-4">
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                        {design.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed h-12 line-clamp-2">
                        {design.description}
                      </p>

                      <div className="pt-4">
                        <MagneticWrapper strength={0.3}>
                          <Button
                            variant="ghost"
                            className="w-full justify-between group/btn border-2 border-dashed border-white/10 hover:border-primary hover:bg-primary/10 rounded-2xl h-12"
                            onClick={() => window.open(design.figmaUrl, "_blank")}
                          >
                            <span className="text-xs font-bold uppercase tracking-widest">Open Workspace</span>
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </Button>
                        </MagneticWrapper>
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                      <div className="absolute top-[-20%] right-[-20%] w-[140%] h-[140%] bg-primary/20 rotate-45 blur-xl group-hover:bg-primary/40 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {figmaDesigns.length > 3 && (
          <motion.div 
            layout
            className="mt-16 flex justify-center"
          >
            <MagneticWrapper strength={0.2}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-12 border-primary/30 hover:border-primary text-primary hover:bg-primary/5 transition-all h-14"
                onClick={() => setShowAll(!showAll)}
              >
                <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs">
                  {showAll ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View More Designs <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </div>
              </Button>
            </MagneticWrapper>
          </motion.div>
        )}
      </div>
    </section>
  );
}
