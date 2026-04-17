import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { ExternalLink, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { cn } from "@/lib/utils";

/** Generate a voice-target slug from a project title */
function voiceSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// ─── Card dimensions ───────────────────────────────────────────────
const CARD_WIDTH = 520;       // px — base card width (large as requested)
const CARD_GAP = 40;          // px — gap between cards
const CARD_STEP = CARD_WIDTH + CARD_GAP; // total step per card

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Requested Order: CropPilot (2), AI Adaptive (3), PinIndia (4), others
  const sortedProjects = [2, 3, 4, 1, 5, 6, 7, 8, 9].map(id => projects.find(p => p.id === id)!);
  const mobileProjects = showAllMobile ? sortedProjects : sortedProjects.slice(0, 3);

  const projectCount = sortedProjects.length;
  const lastIndex = projectCount - 1;

  // ─── Scroll tracking ─────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // activeFloat 0 -> lastIndex
  const activeFloat = useTransform(scrollYProgress, [0.1, 0.9], [0, lastIndex]);

  // Track the active index for the progress dots
  useMotionValueEvent(activeFloat, "change", (v) => {
    setActiveIndex(Math.round(v));
  });

  // Horizontal translation: 
  // Base offset to center index 0 at start
  const baseOffset = (typeof window !== 'undefined' ? window.innerWidth / 2 : 750) - (CARD_WIDTH / 2);
  
  // Total X = baseOffset - scroll-linked offset
  const x = useTransform(activeFloat, [0, lastIndex], [baseOffset, baseOffset - (lastIndex * CARD_STEP)]);

  return (
    <section id="projects" className="relative scroll-mt-[100px]">
      
      {/* ─── Mobile / Tablet View ─── */}
      <div className="block lg:hidden py-16 px-4 md:px-8 bg-background">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            A curated showcase of high-performance builds.
          </p>
        </div>
        
        <div className="flex flex-col gap-8 md:gap-12">
          {mobileProjects.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {sortedProjects.length > 3 && (
          <div className="mt-12 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="rounded-full px-8 border-primary text-primary hover:bg-primary/10"
            >
              {showAllMobile ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>

      {/* ─── Desktop View ─── */}
      <div
        ref={scrollRef}
        className="hidden lg:block relative"
        style={{ height: `${(projectCount + 1) * 90}vh` }}
      >
        {/* ─── Sticky Viewport ─── */}
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

          {/* ─── Header ─── */}
          <div className="relative z-20 pt-10 md:pt-14 pb-2 px-6 md:px-12 lg:px-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-2">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              A curated showcase of high-performance builds.
            </p>
          </div>

          {/* ─── Horizontal Track ─── */}
          <div className="flex-1 flex items-center relative">
            <motion.div
              style={{ x }}
              className="flex items-center"
            >
              {sortedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  activeFloat={activeFloat}
                />
              ))}
            </motion.div>
          </div>

          {/* ─── Progress Dots ─── */}
          <div className="relative z-20 pb-8 flex items-center justify-center gap-3">
            {sortedProjects.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all duration-500",
                  activeIndex === i
                    ? "w-8 h-2.5 bg-primary shadow-lg shadow-primary/40"
                    : "w-2.5 h-2.5 bg-border/50 hover:bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Individual Project Card ─────────────────────────────────────────
function ProjectCard({
  project,
  index,
  activeFloat,
}: {
  project: (typeof projects)[number];
  index: number;
  activeFloat: MotionValue<number>;
}) {
  // Only CropPilot (ID 2) is the Flagship
  const isFlagship = project.id === 2;
  
  // Distance from current focus
  const distance = useTransform(activeFloat, (v) => Math.abs(index - v));

  // Scale: center card = 1, off-center = smaller
  const scale = useTransform(distance, [0, 1, 2], [1, 0.85, 0.75]);

  // Opacity: center card = full, off-center = dimmed
  const opacity = useTransform(distance, [0, 1, 2], [1, 0.5, 0.3]);

  // Slight vertical offset for depth
  const y = useTransform(distance, [0, 1, 2], [0, 15, 30]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        width: CARD_WIDTH,
      }}
      className="flex-shrink-0 relative z-10 transition-[z-index] duration-300"
    >
      <div style={{ marginRight: CARD_GAP }}>
        {/* ─── Card ─── */}
        <div
          className={cn(
            "group bg-card rounded-2xl border overflow-hidden transition-all duration-500 flex flex-col",
            "hover:shadow-2xl hover:shadow-[var(--glow-primary)]/20",
            isFlagship
              ? "border-[var(--accent-primary)]/40 shadow-lg shadow-[var(--glow-primary)]/10"
              : "border-[var(--border-accent)] hover:border-[var(--accent-primary)]/50"
          )}
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-secondary/30 flex items-center justify-center h-72 md:h-80">
            {isFlagship && (
              <span className="absolute top-4 left-4 z-20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                ✨ Flagship
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-50" />
            <img
              src={project.image}
              alt={`${project.title} — ${project.techStack.join(", ")} project by Dhruv Ozha`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between p-5 md:p-7 flex-1">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-medium tracking-wide rounded-full bg-secondary/60 text-secondary-foreground border border-border/40 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.liveUrl !== "#" && (
                <MagneticWrapper strength={0.3} maxDistance={100}>
                  <Button
                    variant="default"
                    size="sm"
                    className="gradient-bg rounded-lg flex-1 min-w-[110px] whitespace-nowrap shadow-lg shadow-primary/20 hover:scale-[1.03] transition-transform font-bold text-[11px] md:text-xs xl:text-sm px-2"
                    asChild
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-voice-target={`${voiceSlug(project.title)}-demo`}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Live Demo
                    </a>
                  </Button>
                </MagneticWrapper>
              )}
              {project.githubUrl !== "#" && (
                <MagneticWrapper strength={0.3} maxDistance={100}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-[110px] whitespace-nowrap rounded-lg hover:bg-secondary hover:text-foreground hover:scale-[1.03] transition-transform text-muted-foreground font-bold text-[11px] md:text-xs xl:text-sm px-2"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-voice-target={`${voiceSlug(project.title)}-source`}
                    >
                      <Github className="h-3.5 w-3.5 mr-1" />
                      Source
                    </a>
                  </Button>
                </MagneticWrapper>
              )}
              {project.youtubeUrl && (
                <MagneticWrapper strength={0.3} maxDistance={100}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-[110px] whitespace-nowrap rounded-lg border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 hover:scale-[1.03] transition-transform font-bold text-[11px] md:text-xs xl:text-sm px-2"
                    asChild
                  >
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-voice-target={`${voiceSlug(project.title)}-youtube`}
                    >
                      <Youtube className="h-3.5 w-3.5 mr-1" />
                      Watch Demo
                    </a>
                  </Button>
                </MagneticWrapper>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Individual Mobile Project Card ──────────────────────────────────
function MobileProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const isFlagship = project.id === 2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "bg-card rounded-2xl border overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-[var(--glow-primary)]/20 transition-all duration-500",
        isFlagship
          ? "border-[var(--accent-primary)]/40 shadow-lg shadow-[var(--glow-primary)]/10"
          : "border-[var(--border-accent)] hover:border-[var(--accent-primary)]/50"
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary/30 flex items-center justify-center h-72 md:h-80">
        {isFlagship && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full shadow-xl flex items-center gap-1.5 backdrop-blur-md">
            ✨ Flagship
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-50" />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 mx-auto"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between p-5 md:p-7 flex-1">
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[10px] font-medium tracking-wide rounded-full bg-secondary/60 text-secondary-foreground border border-border/40 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.liveUrl !== "#" && (
            <Button
              variant="default"
              size="sm"
              className="gradient-bg rounded-lg flex-1 min-w-[110px] whitespace-nowrap shadow-lg shadow-primary/20 font-bold text-[11px] md:text-sm px-2"
              asChild
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl !== "#" && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-[110px] whitespace-nowrap rounded-lg text-muted-foreground font-bold text-[11px] md:text-sm px-2"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5 mr-1" />
                Source
              </a>
            </Button>
          )}
          {project.youtubeUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-[110px] whitespace-nowrap rounded-lg border-red-500/50 text-red-500 font-bold text-[11px] md:text-sm px-2"
              asChild
            >
              <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Youtube className="h-3.5 w-3.5 mr-1" />
                Watch Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
