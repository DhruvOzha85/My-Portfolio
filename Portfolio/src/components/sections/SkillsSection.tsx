import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/portfolio";

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", ...skillCategories.map((c) => c.title)];

  const displayedSkills =
    activeTab === "All"
      ? skillCategories.flatMap((c) => c.skills)
      : skillCategories.find((c) => c.title === activeTab)?.skills || [];

  return (
    <section id="skills" className="section-padding bg-secondary/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies, languages, and tools I use to build things.
          </p>
        </motion.div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
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
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="bg-card w-full rounded-2xl p-4 md:p-6 border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg flex flex-col items-center justify-center gap-3 md:gap-4 cursor-default group"
              >
                <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-secondary/50 rounded-2xl p-3 md:p-3.5 group-hover:bg-primary/10 transition-colors duration-300">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-full h-full object-contain transition-all duration-300 drop-shadow-sm ${
                      skill.invertDark ? "dark:invert opacity-80 group-hover:opacity-100" : ""
                    }`}
                  />
                </div>
                <span className="text-sm font-display font-medium text-center text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
