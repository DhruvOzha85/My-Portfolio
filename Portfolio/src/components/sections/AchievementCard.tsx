import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, Users, Linkedin, Sparkles, MessageSquare, Globe, Info, X, Zap, Activity, Monitor, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Achievement } from "@/data/achievements";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  onImageClick?: (photoIndex: number) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function AchievementCard({ achievement, index, onImageClick }: AchievementCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-[1000px] mx-auto mb-20 px-4 sm:px-0"
    >
        <div 
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] p-1 transition-all duration-700",
            "bg-gradient-to-br from-[var(--border-accent)] via-transparent to-[var(--border-accent)]",
            "animate-accent-glow shadow-[0_0_50px_-12px_var(--glow-primary)]"
          )}
        >
          <div 
            className="relative bg-[var(--bg-card)]/80 backdrop-blur-3xl rounded-[2.4rem] overflow-hidden p-6 lg:p-10 group/card"
          >
            {/* Reflective Hover Sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.4rem] z-50">
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover/card:left-[150%] transition-all [transition-duration:1200ms] ease-in-out" />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              
              <motion.div variants={itemVariants} className="lg:w-[60%] flex flex-col gap-6">
                {/* Caption (Moved to Top) */}
                <div className="flex flex-col gap-1 px-2">
                  <p className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-[0.2em]">
                    Captured Moments
                  </p>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[var(--accent-primary)] to-transparent" />
                  <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-widest mt-1">
                    {achievement.event} — Gallery
                  </p>
                </div>
  
                <div className="relative group/gallery aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border-accent)] glow-sm transition-all duration-500 hover:glow-md">
                  {/* Decorative Digital Stamp */}
                  <div className="absolute top-24 -right-12 rotate-90 z-40 pointer-events-none opacity-20 group-hover/gallery:opacity-40 transition-opacity">
                    <div className="flex flex-col items-center border border-[var(--accent-primary)] px-4 py-1 rounded-sm gap-1">
                      <span className="text-[8px] font-bold text-[var(--accent-primary)] tracking-[0.5em]">CERTIFIED WIN</span>
                      <div className="w-full h-[1px] bg-[var(--accent-primary)]/40" />
                      <span className="text-[6px] font-mono text-[var(--accent-primary)]">ID_{achievement.id}_SU_2026</span>
                    </div>
                  </div>
  
                  {/* Tech Corners */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)] z-40 opacity-50 group-hover/gallery:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-primary)] z-40 opacity-50 group-hover/gallery:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-primary)] z-40 opacity-50 group-hover/gallery:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)] z-40 opacity-50 group-hover/gallery:opacity-100 transition-opacity" />
  
                    {/* Gallery Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 px-2 py-1 rounded-md bg-[var(--bg-card)]/40 backdrop-blur-md border border-[var(--border-accent)] text-[10px] font-bold text-[var(--accent-primary)] opacity-0 group-hover/gallery:opacity-100 transition-opacity">
                      {current + 1} / {count}
                    </div>
  
                    <Carousel setApi={setApi} className="w-full h-full cursor-none">
                    <CarouselContent className="h-full">
                      {achievement.photos.map((photo, i) => (
                        <CarouselItem key={i} className="h-full">
                          <div 
                            className="relative h-full w-full bg-[var(--bg-secondary)]/30 group/img cursor-none"
                            onClick={() => onImageClick?.(i)}
                          >
                            {/* Scale overlay on hover */}
                            <div className="absolute inset-0 bg-[var(--accent-primary)]/5 opacity-0 group-hover/img:opacity-100 transition-opacity z-20 pointer-events-none" />
                            
                            {/* Decorative Placeholder Background */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                              <Sparkles className="w-12 h-12 text-[var(--accent-primary)] animate-pulse" />
                            </div>
                            
                            <img
                              src={photo}
                              alt={`${achievement.title} - ${i + 1}`}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover/gallery:scale-110 relative z-10"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/80 via-transparent to-transparent opacity-40 z-20" />
                            
                            {/* Scanline Effect Overlay */}
                            <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    
                    {/* Navigation Arrows */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                      <CarouselPrevious className="relative left-0 pointer-events-auto bg-[var(--bg-card)]/40 backdrop-blur-md border-[var(--border-accent)] hover:bg-[var(--accent-primary)]/20 cursor-none" />
                      <CarouselNext className="relative right-0 pointer-events-auto bg-[var(--bg-card)]/40 backdrop-blur-md border-[var(--border-accent)] hover:bg-[var(--accent-primary)]/20 cursor-none" />
                    </div>
                  </Carousel>
                  
                  {/* Event Label Overlay */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <Badge className="bg-[var(--bg-card)]/60 backdrop-blur-md border-[var(--border-accent)] text-[var(--accent-primary)] font-bold px-3 py-1">
                      {achievement.event.split(',')[0]}
                    </Badge>
                    <Badge variant="outline" className="bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[10px] uppercase tracking-tighter">
                      HD GALLERY
                    </Badge>
                  </div>
                </div>
  
                {/* Dot Indicators */}
                <div className="flex justify-center gap-2">
                  {Array.from({ length: count }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        current === i 
                          ? "w-8 bg-[var(--accent-primary)] shadow-[0_0_10px_var(--glow-primary)]" 
                          : "w-1.5 bg-[var(--text-muted)]/20"
                      )}
                    />
                  ))}
                </div>
  
                {/* Project Insight Box (Interactive & Enlarged) */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 p-8 rounded-[2rem] bg-[var(--accent-primary)]/5 border border-[var(--border-accent)] hover:border-[var(--accent-primary)]/40 transition-all cursor-none group/insight relative overflow-hidden shadow-lg hover:shadow-[var(--glow-primary)]/10"
                  onClick={() => setIsDetailsOpen(true)}
                >
                  {/* Background Decor */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover/insight:bg-[var(--accent-primary)]/20 transition-colors" />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-xl bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]">
                         <Zap className="h-5 w-5 animate-pulse" />
                       </div>
                       <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)]">Project Dossier v2.0</span>
                     </div>
                     <div className="p-2 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                       <Info className="h-4 w-4" />
                     </div>
                  </div>
                  
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 relative z-10 opacity-90">
                    {achievement.detailedInfo?.challenge || "View detailed project breakdown, core challenges, and architectural solutions implemented for this hackathon winning project."}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-primary)] uppercase tracking-[0.2em] relative z-10">
                    <span>Analyze Mission Details</span>
                    <div className="h-[1px] flex-1 bg-[var(--accent-primary)]/20" />
                    <span className="opacity-0 group-hover/insight:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-[10px]">Open Archive</span>
                  </div>
                </motion.div>
  
                {/* LIVE PROJECT PREVIEW BOX (New) */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-4 p-8 rounded-[2rem] bg-gradient-to-br from-[#10b981]/10 to-transparent border border-[#10b981]/20 hover:border-[#10b981]/40 transition-all cursor-none group/preview relative overflow-hidden shadow-lg hover:shadow-[#10b981]/10"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover/preview:bg-[#10b981]/20 transition-colors" />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-xl bg-[#10b981]/20 text-[#10b981]">
                         <Activity className="h-5 w-5 animate-bounce-slow" />
                       </div>
                       <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Live Environment</span>
                     </div>
                     <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                       <span className="text-[10px] font-bold text-[#10b981]">ACTIVE</span>
                     </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-[var(--text-heading)] mb-2 relative z-10">
                    Launch {achievement.title.includes('CropPilot') ? 'CropPilot' : 'Mission'} Explorer
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-6 relative z-10 opacity-80 italic">
                    "Execute production build to explore the live application natively within this terminal."
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-[#10b981] uppercase tracking-[0.2em] relative z-10">
                    <span>Engage Live Shell</span>
                    <div className="h-[1px] flex-1 bg-[#10b981]/20" />
                    <Monitor className="h-4 w-4 opacity-40 group-hover/preview:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </motion.div>
  
              {/* Project Insight Dialog */}
              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-[var(--bg-card)]/95 backdrop-blur-3xl border-[var(--border-accent)] shadow-[0_0_100px_-12px_rgba(var(--primary-rgb),0.3)] z-[110] cursor-none">
                  <DialogTitle className="sr-only">Project Insights: {achievement.title}</DialogTitle>
                  
                  <div className="relative p-8 sm:p-12 cursor-none">
                    <button 
                      onClick={() => setIsDetailsOpen(false)} 
                      className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-20 cursor-none"
                    >
                      <X className="h-6 w-6 text-[var(--text-muted)]" />
                    </button>
  
                    <div className="flex flex-col gap-10 relative z-10">
                      <header>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--accent-primary)] to-transparent" />
                          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--accent-primary)]">Official Dossier</span>
                        </div>
                        <h3 className="text-4xl lg:text-5xl font-display font-bold gradient-text pb-2">
                          {achievement.event.split(',')[0]} Project Breakdown
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase mt-4">
                          Sector: {achievement.location.split(',')[1] || "Bhilwara"} — Node_ID: {achievement.id}
                        </p>
                      </header>
  
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InsightItem 
                          icon={<Zap className="h-5 w-5 text-[var(--accent-primary)]"/>} 
                          title="The Challenge" 
                          content={achievement.detailedInfo?.challenge} 
                        />
                        <InsightItem 
                          icon={<Sparkles className="h-5 w-5 text-[var(--accent-primary)]"/>} 
                          title="The Solution" 
                          content={achievement.detailedInfo?.solution} 
                        />
                        <InsightItem 
                          icon={<Trophy className="h-5 w-5 text-[var(--accent-primary)]"/>} 
                          title="The Impact" 
                          content={achievement.detailedInfo?.impact} 
                        />
                      </div>
  
                      <div className="pt-10 border-t border-[var(--border-accent)]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-3">
                           {achievement.techStack.map(tech => (
                             <Badge key={tech} variant="outline" className="border-[var(--accent-primary)]/20 text-[10px] uppercase font-mono px-3 py-1 bg-[var(--accent-primary)]/5">
                               {tech}
                             </Badge>
                           ))}
                        </div>
                        <div className="text-[10px] font-bold text-[var(--text-muted)] tracking-[0.5em] uppercase opacity-50 pb-1">
                          Deployment_v4.2.0 // Quantum_Sync
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                  </div>
                </DialogContent>
              </Dialog>
   
             {/* Live Project Preview Dialog (Iframe) */}
             <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
               <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden bg-black/95 border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.2)] z-[120] flex flex-col cursor-none">
                 <DialogTitle className="sr-only">Live Environment: {achievement.title}</DialogTitle>
                 
                 {/* Preview Header */}
                 <div className="h-14 bg-white/5 border-b border-white/10 px-6 flex items-center justify-between shrink-0 cursor-none">
                   <div className="flex items-center gap-4 cursor-none">
                      <div className="flex gap-1.5 cursor-none">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="h-4 w-[1px] bg-white/10 mx-2" />
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                        <Monitor className="h-3 w-3" />
                        <span>Live Interface — {achievement.links.demo?.replace('https://', '')}</span>
                      </div>
                   </div>
                   
                   <button 
                     onClick={() => setIsPreviewOpen(false)}
                     className="text-[10px] font-bold text-white/40 hover:text-white transition-colors bg-white/5 px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 cursor-none"
                   >
                     TERMINATE CONNECTION [ESC]
                   </button>
                 </div>
  
                 {/* Iframe Container */}
                 <div className="flex-1 relative bg-white/5 cursor-none">
                   {!achievement.links.demo ? (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                        <Activity className="h-12 w-12 text-[#10b981] mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold text-white mb-2">Environment Offline</h3>
                        <p className="text-sm text-white/40 max-w-sm">The live environment for this mission is currently unreachable or not configured.</p>
                     </div>
                   ) : (
                     <iframe 
                       src={achievement.links.demo} 
                       className="w-full h-full border-none"
                       title={`${achievement.title} Preview`}
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     />
                   )}
                   
                   {/* Loading Overlay (Subtle) */}
                   <div className="absolute bottom-6 right-6 pointer-events-none">
                     <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-[#10b981]/30 flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                       <span className="text-[10px] font-bold text-[#10b981] tracking-[0.2em] uppercase">Secure Stream Active</span>
                     </div>
                   </div>
                 </div>
               </DialogContent>
             </Dialog>
  
               {/* RIGHT COLUMN — Achievement Info */}
              <div className="flex-1 flex flex-col">
                {/* Badge Row */}
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-subtle)] border border-[var(--border-accent)]">
                    <Trophy className="h-4 w-4 text-[var(--accent-primary)]" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--text-heading)]">
                      {achievement.position}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  </div>
                </motion.div>
  
                {/* Title */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    <span className="text-[var(--accent-primary)]">Won {achievement.position}</span>
                     <span className="text-[var(--text-heading)]">— {achievement.event}</span>
                  </h3>
                </motion.div>
  
                {/* Meta Row */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 text-sm font-medium text-[var(--text-secondary)] mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--accent-primary)]/70" />
                    <span>{achievement.event} | {achievement.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--accent-primary)]/70" />
                    <span>{achievement.location}</span>
                  </div>
                </motion.div>
  
                {/* Description */}
                <motion.div variants={itemVariants} className="mb-8">
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                    <span className="text-[var(--text-heading)] font-semibold">{achievement.title}:</span> {achievement.projectDescription}
                  </p>
                </motion.div>
  
                {/* Tech Stack Chips */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
                  {achievement.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/10 transition-colors cursor-none"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
  
                {/* TEAM MEMBERS SECTION */}
                <motion.div variants={itemVariants} className="mb-10">
                  <div className="flex items-center gap-2 mb-5">
                    <Users className="h-4 w-4 text-[var(--accent-primary)]" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Team Members</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {achievement.team.map((member, i) => (
                      <a
                        key={i}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/member flex items-center justify-between p-2 lg:p-3 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-accent)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-subtle)] transition-all duration-300 cursor-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10 border border-[var(--border-accent)] group-hover/member:border-[var(--accent-primary)] transition-colors">
                              <AvatarFallback className="bg-[var(--accent-primary)] text-[var(--text-inverse)] font-bold text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 rounded-full group-hover/member:glow-md transition-all opacity-0 group-hover/member:opacity-100" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[var(--text-heading)] group-hover/member:translate-x-1 transition-transform">{member.name}</span>
                            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold opacity-70">{member.role}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-full opacity-0 group-hover/member:opacity-100 transition-opacity bg-[var(--accent-primary)]/10">
                          <Linkedin className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
  
                {/* CTA Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {achievement.links.github && (
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-xl border-[var(--accent-primary)]/30 text-[var(--text-heading)] hover:bg-[var(--accent-primary)]/10 font-bold group cursor-none"
                      asChild
                    >
                      <a href={achievement.links.github} target="_blank" rel="noopener noreferrer" className="cursor-none">
                        <MessageSquare className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Source
                      </a>
                    </Button>
                  )}
                  {achievement.links.demo && (
                    <Button 
                      className="h-12 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-inverse)] font-bold shadow-lg shadow-[var(--glow-primary)]/20 hover:brightness-110 transition-all group cursor-none"
                      asChild
                    >
                      <a href={achievement.links.demo} target="_blank" rel="noopener noreferrer" className="cursor-none">
                        <Globe className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </motion.div>
  
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

function InsightItem({ icon, title, content }: { icon: React.ReactNode; title: string; content?: string }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent-primary)]/30 transition-all group/item">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] group-hover/item:scale-110 transition-transform">
          {icon}
        </div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-heading)]">{title}</h4>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {content || "Information pending for this project sector."}
      </p>
    </div>
  );
}
