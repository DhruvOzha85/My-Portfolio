import { motion } from "framer-motion";
import { Trophy, Sparkles } from "lucide-react";
import { achievements, Achievement } from "@/data/achievements";
import { AchievementCard } from "./AchievementCard";

export function AchievementsSection({ 
  onImageClick 
}: { 
  onImageClick?: (achievement: Achievement, index: number) => void 
}) {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden scroll-mt-[100px]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--bg-glow-section)] opacity-60" />
        
        {/* Animated Glow Blobs */}
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[var(--accent-primary)]/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-[var(--accent-secondary)]/10 blur-[150px] rounded-full animate-pulse-slow" />
        
        {/* Floating Background Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] opacity-10"
        >
          <Trophy className="w-32 h-32 text-[var(--accent-primary)]" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[10%] opacity-10"
        >
          <Sparkles className="w-40 h-40 text-[var(--accent-secondary)]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Achievements <span className="gradient-text">🏆</span>
          </h2>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Moments that defined the journey — hackathons, wins & collaborations.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-16">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
              onImageClick={(photoIndex) => onImageClick?.(achievement, photoIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
