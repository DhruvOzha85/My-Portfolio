import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSound } from "@/hooks/useSound";
import { ThemePicker } from "@/components/ThemePicker";
import { cn } from "@/lib/utils";
import { useArcadeMode } from "@/hooks/useArcadeMode";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";
import { Logo } from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();
  const { playClick } = useSound();
  const { toggleArcade } = useArcadeMode();
  const { warpTo } = useQuantumTransition();
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    playClick();
    setIsOpen(false);
    
    // Now we just navigate. The NavigationManager handles the warp effect.
    navigate(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
        <NavLink
          to="/"
          className="relative z-10"
          onClick={(e) => {
            e.preventDefault();
            handleClick("/");
          }}
        >
          <Logo />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={({ isActive }) => cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-2",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === (item.href === "/" ? "home" : item.href.slice(1)) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-full animate-accent-glow glow-sm"
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <Button
              variant="ghost"
              className="text-sm font-medium text-muted-foreground hover:text-primary h-9 px-4 hidden lg:flex"
              onClick={() => { playClick(); window.open("/DhruvOzha.pdf", "_blank"); }}
            >
              Resume
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { playClick(); toggleArcade(); }}
              title="Arcade Mode (Ctrl+G)"
              className="text-muted-foreground hover:text-primary"
            >
              <Gamepad2 className="h-5 w-5" />
            </Button>
            <ThemePicker />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { playClick(); toggleArcade(); }}
            title="Arcade Mode"
            className="text-muted-foreground hover:text-primary"
          >
            <Gamepad2 className="h-4 w-4" />
          </Button>
          <ThemePicker />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <ul className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                    className={({ isActive }) => cn(
                      "block py-2 text-lg font-medium transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <a
                  href="/DhruvOzha.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { playClick(); setIsOpen(false); }}
                  className="block py-2 text-lg font-medium text-primary"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
