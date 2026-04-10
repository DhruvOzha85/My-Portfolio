import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Mic, MicOff, Navigation, Square, PenLine, Info, X, Zap, Terminal, Activity, Globe, MousePointer2 } from "lucide-react";
import { useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useVoiceCommand } from "@/hooks/useVoiceCommand";
import { useGuidedTour } from "@/hooks/useGuidedTour";
import { cn } from "@/lib/utils";

// ─── Constants & Types ───────────────────────────────────────────────
type SectionId = 'home' | 'about' | 'skills' | 'achievements' | 'projects' | 'certificates' | 'leetcode' | 'contact';

interface SectionConfig {
  label: string;
  color: string;
  icon: React.ReactNode;
}

const SECTION_MAP: Record<SectionId, SectionConfig> = {
  home: { label: "MISSION_LOG", color: "var(--accent-primary)", icon: <Globe className="w-3 h-3" /> },
  about: { label: "PROFILE_GENESIS", color: "#3b82f6", icon: <MousePointer2 className="w-3 h-3" /> },
  skills: { label: "CAPABILITIES_MATRIX", color: "#8b5cf6", icon: <Zap className="w-3 h-3" /> },
  achievements: { label: "VICTORY_ARCHIVE", color: "#10b981", icon: <Activity className="w-3 h-3" /> },
  projects: { label: "PROJECT_LABORATORY", color: "#f43f5e", icon: <Terminal className="w-3 h-3" /> },
  certificates: { label: "STANDARD_VALIDATION", color: "#06b6d4", icon: <Square className="w-3 h-3" /> },
  leetcode: { label: "LOGIC_CORE_METRICS", color: "#eab308", icon: <Activity className="w-3 h-3" /> },
  contact: { label: "COMMS_UPLINK", color: "#f97316", icon: <Mic className="w-3 h-3" /> },
};

// ─── Magnetic Wrapper Component ──────────────────────────────────────
function MagneticWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Global Backdrop Overlay ─────────────────────────────────────────
function GlobalBackdrop({ active, color }: { active: boolean; color: string }) {
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] pointer-events-none overflow-hidden"
        >
          {/* Darken/Blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />
          
          {/* Digital Grid Layer */}
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{ 
              backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
              backgroundSize: '32px 32px' 
            }} 
          />
          
          {/* Scanline Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

          {/* HUD Brackets (Corners) */}
          <div className="absolute inset-8 border border-white/5 pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: color }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: color }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: color }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: color }} />
          </div>
          
          {/* Animated Scanline */}
          <motion.div 
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-[2px] opacity-30"
            style={{ 
              background: `linear-gradient(to right, transparent, ${color}, transparent)` 
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ─── Command Guide Modal ──────────────────────────────────────────────
function CommandGuide({ onClose }: { onClose: () => void }) {
  const categories = [
    {
      title: "Navigation",
      commands: ["Go to Projects", "Show Achievements", "Open Skills", "Visit Contact", "Scroll Down/Up"]
    },
    {
      title: "Social & Professional",
      commands: ["Open GitHub", "Go to LinkedIn", "View Resume", "Visit YouTube", "Launch LeetCode"]
    },
    {
      title: "Missions & Insights",
      commands: ["Launch CropPilot Mission", "Display Project Dossier", "Start Guided Tour", "End Tour"]
    },
    {
      title: "System Control",
      commands: ["Synchronize [Theme] Theme", "Enable Auto Mode", "Start Dictation", "Stop Writing"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-[550px] bg-black/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-[var(--border-accent)] z-[110] shadow-[0_0_80px_rgba(var(--primary-rgb),0.3)]"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20">
            <Terminal className="h-5 w-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Jarvis_Operation_Manual</h3>
            <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Interface v2.2 // System Synchronized</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="h-5 w-5 text-white/60" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-3">
            <h4 className="text-[11px] font-black text-[var(--accent-primary)] uppercase tracking-tighter border-l-2 border-[var(--accent-primary)] pl-3 mb-4">{cat.title}</h4>
            {cat.commands.map((cmd) => (
              <div key={cmd} className="group flex items-center gap-3 cursor-default">
                <div className="w-1.5 h-1.5 rotate-45 border border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] transition-all" />
                <span className="text-[11px] font-mono text-white/50 group-hover:text-white transition-colors">"{cmd}"</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between opacity-60">
        <div className="flex gap-4">
           <span className="text-[9px] font-mono text-white/40 uppercase">Latency: 14ms</span>
           <span className="text-[9px] font-mono text-white/40 uppercase">Buffer: Stable</span>
        </div>
        <div className="flex gap-1.5">
           {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export function VoiceAssistant() {
  const { isTouring, tourFeedback, currentStop, currentStopIndex, totalStops, startTour, stopTour } = useGuidedTour();
  const [showGuide, setShowGuide] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  
  // Section Detection logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionId;
          if (SECTION_MAP[id]) setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ['home', 'about', 'skills', 'achievements', 'projects', 'certificates', 'leetcode', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTourCommand = useCallback((action: 'start' | 'stop') => {
    if (action === 'start') startTour();
    else stopTour();
  }, [startTour, stopTour]);

  const { isListening, isDictating, transcript, feedback, toggleListening } = useVoiceCommand(handleTourCommand);

  const showWidget = isListening || feedback || isTouring || tourFeedback;
  const isAssistantActive = isListening || isTouring || isDictating;
  const currentConfig = SECTION_MAP[activeSection];

  // ─── Visual state determination ────────────────────────────────────
  const mainColor = isDictating ? "#f59e0b" : isTouring ? "#10b981" : currentConfig.color;

  const statusLabel = isDictating
    ? "SYSTEM: DICTATION"
    : isTouring
    ? `JARVIS TOUR [${currentStopIndex + 1}/${totalStops}]`
    : isListening
    ? `UPLINK: ${currentConfig.label}`
    : `SECTOR: ${currentConfig.label}`;

  const statusContent = () => {
    if (isTouring) {
      return (
        <span className="text-xs font-mono truncate text-white animate-in slide-in-from-bottom-2 duration-300">
          {tourFeedback || currentStop?.title || "Initializing..."}
        </span>
      );
    }

    if (isDictating) {
      return (
        <span className="text-xs font-mono truncate text-[#f59e0b] glitch-text">
          {transcript ? `"${transcript}..."` : feedback || "Await spoken input..."}
        </span>
      );
    }

    if (transcript) {
      return (
        <span className="text-xs font-mono truncate text-white animate-pulse">
          "{transcript}..."
        </span>
      );
    }

    return (
      <span className="text-xs font-mono truncate text-white/40 group-hover:text-white/70 transition-colors">
        {feedback || tourFeedback || "Awaiting Voice Triggers"}
      </span>
    );
  };

  return (
    <>
      <GlobalBackdrop active={isAssistantActive} color={mainColor} />
      
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col items-center gap-4 w-full px-4">
        <AnimatePresence>
          {showGuide && <CommandGuide onClose={() => setShowGuide(false)} />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showWidget && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              className="pointer-events-auto flex items-center gap-8 px-10 py-6 rounded-[3rem] border-2 shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-black/80 backdrop-blur-2xl group relative overflow-hidden min-w-[350px] max-w-[650px]"
              style={{
                borderColor: `${mainColor}40`,
                boxShadow: `0 0 40px ${mainColor}15`
              }}
            >
              {/* Internal HUD Elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: mainColor }} />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: mainColor }} />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              
              {/* Left Activity Indicator */}
              <MagneticWrapper>
                <button 
                  onClick={isTouring ? stopTour : toggleListening}
                  className="relative group/trigger w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
                  style={{ 
                    backgroundColor: `${mainColor}10`,
                    borderColor: `${mainColor}30`
                  }}
                >
                  {(isAssistantActive) && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ repeat: Infinity, duration: isDictating ? 1.5 : 3 }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: mainColor }}
                    />
                  )}
                  {isTouring ? (
                    <X className="w-6 h-6 text-red-400 group-hover/trigger:scale-110 transition-transform" />
                  ) : isDictating ? (
                    <Activity className="w-6 h-6 animate-pulse" style={{ color: "#f59e0b" }} />
                  ) : isListening ? (
                    <Mic className="w-6 h-6" style={{ color: mainColor }} />
                  ) : (
                    <MicOff className="w-6 h-6 text-white/20" />
                  )}
                </button>
              </MagneticWrapper>

              {/* Status Display Area */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                   {isAssistantActive && (
                     <motion.div 
                       animate={{ opacity: [1, 0.4, 1] }} 
                       transition={{ duration: 1, repeat: Infinity }}
                       className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
                       style={{ backgroundColor: mainColor, color: mainColor }}
                     />
                   )}
                   <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase font-mono glitch-text"
                    style={{ color: mainColor }}
                    data-text={statusLabel}
                  >
                    {statusLabel}
                  </span>
                </div>
                {statusContent()}
              </div>

              {/* Right Action Stack */}
              <div className="flex items-center gap-4">
                <MagneticWrapper>
                  <button 
                    onClick={() => setShowGuide(!showGuide)}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all shadow-sm"
                    title="Operation Manual"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                </MagneticWrapper>

                {isDictating ? (
                  <MagneticWrapper>
                    <button
                      onClick={toggleListening}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all bg-[#f59e0b] hover:bg-[#d97706] text-black hover:scale-105"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      HALT
                    </button>
                  </MagneticWrapper>
                ) : isTouring ? (
                  <MagneticWrapper>
                    <button
                      onClick={stopTour}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all bg-red-600/20 text-red-500 border border-red-600/30 hover:bg-red-600/40 hover:scale-105"
                    >
                      <Globe className="w-4 h-4 animate-spin-slow" />
                      TERMINATE
                    </button>
                  </MagneticWrapper>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
