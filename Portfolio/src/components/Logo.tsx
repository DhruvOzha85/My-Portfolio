import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("relative flex items-center justify-center group cursor-pointer", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glass Background */}
      <div className="absolute inset-0 bg-[var(--accent-primary)]/10 backdrop-blur-md rounded-lg border border-[var(--border-accent)] group-hover:bg-[var(--accent-primary)]/20 transition-all duration-300 animate-accent-glow glow-sm" />
      
      {/* Initials */}
      <div className="relative z-10 flex items-center px-3 py-1.5">
        <span className="text-2xl font-display font-black tracking-tighter">
          <span className="text-[var(--accent-primary)]">D</span>
          <span className="text-[var(--text-heading)] -ml-1">O</span>
        </span>
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-[var(--accent-primary)]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      {/* Modern Accent */}
      <motion.div 
        className="absolute -bottom-0.5 left-2 right-2 h-[2px] bg-[var(--accent-primary)] rounded-full opacity-10"
        layoutId="logo-underline"
      />
    </motion.div>
  );
}
