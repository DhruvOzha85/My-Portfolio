import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories, Skill } from '@/data/portfolio';
import { Monitor, Cpu, Database, Cloud, Terminal } from 'lucide-react';


const CATEGORY_COLORS: Record<string, string> = {
  'Languages & Frameworks': 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
  'Databases & Backend': 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
  'Cloud & DevOps': 'from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30',
  'Tools & Platforms': 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
  'Specialized': 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
};

const CATEGORY_LABELS: Record<string, string> = {
  'Languages & Frameworks': 'LANGUAGE',
  'Databases & Backend': 'BACKEND',
  'Cloud & DevOps': 'CLOUD',
  'Tools & Platforms': 'TOOLS',
  'Specialized': 'SPECIALIZED',
};

export function CoreStack() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Group skills into belts
  const belts = useMemo(() => {
    const b1 = skillCategories.find(c => c.title === 'Languages & Frameworks')?.skills || [];
    const b2 = [
      ...(skillCategories.find(c => c.title === 'Databases & Backend')?.skills || []),
      ...(skillCategories.find(c => c.title === 'Cloud & DevOps')?.skills || [])
    ];
    const b3 = [
      ...(skillCategories.find(c => c.title === 'Tools & Platforms')?.skills || []),
      ...(skillCategories.find(c => c.title === 'Specialized')?.skills || [])
    ];

    return [
      { skills: b1, speed: 25, title: 'Languages & Frameworks' },
      { skills: b2, speed: 30, title: 'Backend & Cloud' },
      { skills: b3, speed: 35, title: 'Tools & Specialized' }
    ];
  }, []);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Core Stack">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            MY <span className="gradient-text">SKILLS</span>
          </h2>
          <div className="h-2 w-32 bg-primary mx-auto mt-6 rounded-full opacity-50 animate-pulse" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* Left Side Content */}
          <div className="w-full lg:w-[40%] space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-4">
                Core <span className="gradient-text">Stack</span>
              </h2>
              
              {/* 3D Monitor Display - Placed between Header and Features */}
              <div className="py-6">
                <MonitorDisplay skill={hoveredSkill} />
              </div>

              <p className="text-secondary-foreground/85 text-lg md:text-xl max-w-xl leading-relaxed">
                A highly curated, modern ecosystem of technologies I leverage to build robust, 
                scalable applications from the ground up to deployment.
              </p>
            </motion.div>

            {/* Features List */}
            <motion.ul 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4"
            >
              {[
                { title: 'High-Performance Backends', desc: 'Architecting systems in Node.js & C++' },
                { title: 'Responsive Frontends', desc: 'Beautiful UI/UX with React & Tailwind' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="mt-1 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase text-sm tracking-wider">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* Category Labels */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6 }}
               className="flex flex-wrap gap-3"
            >
              {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
                <span 
                  key={cat}
                  className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-tighter bg-gradient-to-br ${CATEGORY_COLORS[cat] || 'from-gray-500/20 to-slate-500/20 text-gray-400 border-gray-500/30'}`}
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Conveyor Belts */}
          <div className="w-full lg:w-[60%] h-[600px] relative pointer-events-auto">
            {/* Background Lines/Connections Decorative Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
                <path d="M50 0L200 300L350 600" stroke="var(--accent-primary)" strokeWidth="0.5" />
                <path d="M350 0L200 300L50 600" stroke="var(--accent-secondary)" strokeWidth="0.5" />
                <circle cx="200" cy="300" r="100" stroke="var(--accent-primary)" strokeWidth="0.5" strokeDasharray="10 5" />
              </svg>
            </div>

            <div 
              className="flex flex-row justify-center gap-4 md:gap-6 h-full mask-fade-y"
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {belts.map((belt, idx) => (
                <MarqueeColumn 
                  key={idx} 
                  skills={belt.skills} 
                  speed={belt.speed} 
                  reverse={idx % 2 === 0} 
                  className={idx >= 2 ? 'hidden md:flex' : 'flex'}
                  onHoverSkill={setHoveredSkill}
                />
              ))}
            </div>
            
            {/* Glossy Overlay/Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}

function MarqueeColumn({ skills, speed, reverse = false, className, onHoverSkill }: { 
  skills: Skill[], 
  speed: number, 
  reverse?: boolean, 
  className?: string,
  onHoverSkill: (skill: Skill | null) => void 
}) {
  // Double the skills for seamless loop
  const duplicatedSkills = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <div className={`flex flex-col gap-6 overflow-hidden h-full ${className}`}>
      <motion.div
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"]
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-6"
      >
        {duplicatedSkills.map((skill, i) => (
          <SkillCard 
            key={`${skill.name}-${i}`} 
            skill={skill} 
            onHover={() => onHoverSkill(skill)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function SkillCard({ skill, onHover }: { skill: Skill, onHover: () => void }) {
  return (
    <motion.div 
      onMouseEnter={onHover}
      whileHover={{ scale: 1.05, backgroundColor: "#252841" }}
      className="flex items-center gap-3 p-4 bg-[#1a1c2e]/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-[190px] md:w-[220px] transition-all duration-300 cursor-crosshair group"
    >
      <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-xl p-2 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className={`w-full h-full object-contain ${skill.invertDark ? 'dark:invert' : ''}`} 
        />
      </div>
      <span className="text-[13px] font-semibold text-white/95 truncate block">{skill.name}</span>
    </motion.div>
  );
}

function MonitorDisplay({ skill }: { skill: Skill | null }) {
  return (
    <div className="relative w-full max-w-[400px] perspective-1000">
      <motion.div
        initial={{ rotateY: -20, rotateX: 10 }}
        animate={{ 
          rotateY: skill ? -5 : -15,
          rotateX: skill ? 5 : 8,
          scale: skill ? 1.05 : 1
        }}
        className="relative z-10 bg-[#0f111a] border-[6px] border-[#2a2d3e] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden aspect-video flex flex-col"
      >
        {/* Screen Content */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10" />
          
          <AnimatePresence mode="wait">
            {!skill ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                   <div className="flex gap-1.5 items-end h-10 mb-2">
                     {[...Array(8)].map((_, i) => (
                       <motion.div
                         key={i}
                         animate={{ height: ["20%", "70%", "30%", "90%", "20%"] }}
                         transition={{ 
                           duration: 1.5, 
                           repeat: Infinity, 
                           delay: i * 0.15,
                           ease: "easeInOut"
                         }}
                         className="w-1.5 bg-emerald-500/40 rounded-full"
                       />
                     ))}
                   </div>
                   <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-4 border border-emerald-500/10 rounded-full"
                   />
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-emerald-500/50 font-mono tracking-widest uppercase mb-1 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    System Online
                  </div>
                  <h4 className="text-white/40 font-mono text-[11px] tracking-[0.3em] uppercase font-bold">
                    Ready to Build
                  </h4>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                   <img src={skill.icon} alt="" className={`w-full h-full object-contain ${skill.invertDark ? 'dark:invert' : ''}`} />
                </div>
                <div>
                   <h3 className="text-2xl font-bold gradient-text mb-1">{skill.name}</h3>
                   <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] text-emerald-500/80 font-mono tracking-widest uppercase">
                        Tech Identified
                      </span>
                   </div>
                   <p className="text-[11px] text-white/50 font-mono leading-relaxed max-w-[280px] mx-auto line-clamp-2 italic">
                     "{skill.description}"
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Monitor Base Decorative */}
        <div className="h-6 bg-[#2a2d3e] flex items-center px-4 justify-between border-t border-white/5">
           <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
           </div>
           <span className="text-[8px] text-white/20 font-mono">DHRUV_OS v4.0</span>
        </div>
      </motion.div>

      {/* Monitor Stand/Reflection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#1a1c2e] rounded-full blur-md opacity-50" />
    </div>
  );
}

