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
      <div className="absolute inset-0 bg-primary/10 backdrop-blur-md rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-all duration-300" />
      
      {/* Initials */}
      <div className="relative z-10 flex items-center px-3 py-1.5">
        <span className="text-2xl font-display font-black tracking-tighter">
          <span className="text-primary">D</span>
          <span className="text-foreground -ml-1">O</span>
        </span>
        
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Modern Accent */}
      <motion.div 
        className="absolute -bottom-0.5 left-2 right-2 h-[2px] bg-primary rounded-full opacity-0 group-hover:opacity-100"
        layoutId="logo-underline"
      />
    </motion.div>
  );
}
