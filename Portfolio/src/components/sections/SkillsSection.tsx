import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, Skill } from "@/data/portfolio";
import { MagneticWrapper } from "@/components/MagneticWrapper";

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", ...skillCategories.map((c) => c.title)];

  const displayedSkills =
    activeTab === "All"
      ? skillCategories.flatMap((c) => c.skills)
      : skillCategories.find((c) => c.title === activeTab)?.skills || [];

  return (
    <section id="skills" className="section-padding relative scroll-mt-[100px]" aria-label="Technical Skills">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
            Technologies, languages, and tools I use to build things.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <MagneticWrapper key={tab} strength={0.2} maxDistance={60}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary border border-border/50 shadow-sm"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-primary rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            </MagneticWrapper>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="relative w-full aspect-square bg-card rounded-2xl border border-[var(--border-accent)] hover:border-[var(--accent-primary)]/50 transition-all duration-500 shadow-sm hover:shadow-2xl group overflow-hidden cursor-default"
    >
      {/* Icon Layer */}
      <div className="absolute inset-0 flex items-center justify-center p-4 transition-all duration-500 group-hover:blur-lg group-hover:scale-125 group-hover:opacity-10">
        <img
          src={skill.icon}
          alt={skill.name}
          loading="lazy"
          decoding="async"
          className={`w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 drop-shadow-sm ${
            skill.invertDark ? "dark:invert opacity-90 group-hover:opacity-100" : ""
          }`}
        />
      </div>

      {/* Name Overlay Layer - High Visibility */}
      <div className="absolute inset-0 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="text-sm sm:text-base md:text-xl font-display font-black text-center text-primary leading-tight px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          {skill.name}
        </span>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-primary/20 via-primary/5 to-transparent" />
    </motion.div>
  );
}
