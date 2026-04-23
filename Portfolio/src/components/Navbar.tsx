  import { useState, useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Menu, X, Gamepad2 } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { navItems, socialLinks } from "@/data/portfolio";
  import { useActiveSection } from "@/hooks/useActiveSection";
  import { useSound } from "@/hooks/useSound";
  import { ThemePicker } from "@/components/ThemePicker";
  import { cn } from "@/lib/utils";
  import { useArcadeMode } from "@/hooks/useArcadeMode";
  import { useQuantumTransition } from "@/hooks/useQuantumTransition";
  import { Logo } from "./Logo";
  import { NavLink, useNavigate, useLocation } from "react-router-dom";

  export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { playClick } = useSound();
    const { toggleArcade } = useArcadeMode();
    const { warpTo } = useQuantumTransition();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Highlight strictly based on the URL route
    const isSelected = (itemHref: string) => {
      return pathname === itemHref;
    };

    // ESC key to close menu
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          playClick();
          setIsOpen(false);
        }
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, playClick]);

    const handleClick = (href: string) => {
      playClick();
      setIsOpen(false);
      
      // Now we just navigate. The NavigationManager handles the warp effect.
      // We pass manualNav: true so the manager knows to trigger the warp animation.
      navigate(href, { state: { manualNav: true } });
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
                      "text-base font-medium transition-colors hover:text-primary relative py-2 px-1",
                      isActive ? "text-primary" : "text-secondary-foreground/80"
                    )}
                  >
                    {item.label}
                    {isSelected(item.href) && (
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
                className="text-base font-medium text-muted-foreground hover:text-primary h-9 px-4 hidden lg:flex"
                data-voice-target="resume"
                onClick={() => { playClick(); window.open(socialLinks.resume, "_blank"); }}
              >
                Resume
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { playClick(); toggleArcade(); }}
                title="Arcade Mode (Ctrl+G)"
                className="text-muted-foreground hover:text-primary hidden lg:flex"
              >
                <Gamepad2 className="h-5 w-5" />
              </Button>
              <ThemePicker />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemePicker />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              className="md:hidden glass border-t border-border overflow-hidden"
            >
              <motion.ul 
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1
                    }
                  }
                }}
                className="container mx-auto px-4 py-12 flex flex-col gap-8"
              >
                {navItems.map((item) => (
                  <motion.li 
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                  >
                    <NavLink
                      to={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item.href);
                      }}
                      className={({ isActive }) => cn(
                        "block py-3 text-3xl font-bold transition-colors tracking-wide",
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }}
                >
                  <a
                    href={socialLinks.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-voice-target="resume"
                    onClick={() => { playClick(); setIsOpen(false); }}
                    className="block py-3 text-3xl font-bold text-primary hover:text-primary/80 transition-colors tracking-wide"
                  >
                    Resume
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    );
  }
