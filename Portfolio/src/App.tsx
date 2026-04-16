import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ArcadeProvider } from "@/hooks/useArcadeMode";
import { QuantumProvider } from "@/hooks/useQuantumTransition";
import { QuantumTransition } from "@/components/QuantumTransition";
import { NavigationManager } from "@/components/NavigationManager";
import { HelmetProvider } from "react-helmet-async";

// Lazy-load heavy interactive components
const VoiceAssistant = lazy(() => import("@/components/VoiceAssistant").then(m => ({ default: m.VoiceAssistant })));
const ArcadeMode = lazy(() => import("@/components/ArcadeMode").then(m => ({ default: m.ArcadeMode })));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <QuantumProvider>
        <ArcadeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Suspense fallback={null}>
              <VoiceAssistant />
            </Suspense>
            <QuantumTransition />
            <Suspense fallback={null}>
              <ArcadeMode />
            </Suspense>
            <BrowserRouter>
              <NavigationManager />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<Index />} />
                <Route path="/skills" element={<Index />} />
                <Route path="/achievements" element={<Index />} />
                <Route path="/designs" element={<Index />} />
                <Route path="/projects" element={<Index />} />
                <Route path="/certificates" element={<Index />} />
                <Route path="/leetcode" element={<Index />} />
                <Route path="/contact" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ArcadeProvider>
      </QuantumProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

