import { useState, useCallback, useRef, useEffect } from "react";

export interface TourStop {
  sectionId: string;
  title: string;
  narration: string;
}

const tourStops: TourStop[] = [
  {
    sectionId: "home",
    title: "Maison Link",
    narration: "Initiating global protocol. Welcome to the neural interface of Dhruv Ozha. I am Jarvis. Data streams are synchronized. We are currently at the Mission Home. Awaiting your command to proceed to the next sector.",
  },
  {
    sectionId: "about",
    title: "Biometric Data",
    narration: "Sector: Profile Genesis. Accessing biometric archives. Dhruv is an architect of high-performance digital environments. His focus: React, Node.js, and advanced user experience design. Profile integrity: Excellent.",
  },
  {
    sectionId: "skills",
    title: "Technical Matrix",
    narration: "Neural network analysis of the Capabilities Matrix complete. We are seeing a full-stack deployment of modern technologies. Note the infinite stream of technical mastery here—a robust foundation for any mission.",
  },
  {
    sectionId: "achievements",
    title: "Victory Archive",
    narration: "Uplink to Victory Archives confirmed. This sector contains records of excellence and hackathon dominance. You can access the Mission Dossier for each victory to view insights or launch live project environments.",
  },
  {
    sectionId: "projects",
    title: "Forge Laboratory",
    narration: "Entering the Project Laboratory. Each cell here represents a successful deployment of code to solve high-stakes problems. Our flagship, CropPilot, is fully interactive. You can launch the mission directly from this sector.",
  },
  {
    sectionId: "certificates",
    title: "Trust Validation",
    narration: "Sector: Standard Validation. Scanning official verification tokens. These certifications from AWS, Walmart, and Skyscanner verify Dhruv's proficiency in large-scale system engineering.",
  },
  {
    sectionId: "leetcode",
    title: "Logic Core",
    narration: "Logic Core telemetry active. Dhruv maintains a consistent practice of algorithmic optimization. Data structures and algorithms are synchronized. Performance metrics: Stable and high.",
  },
  {
    sectionId: "contact",
    title: "Communications Uplink",
    narration: "Mission reaching final phase. Our Communications Uplink is locked. To collaborate or initiate a new mission, select your preferred channel. Jarvis, signing off. System standby. Connection terminated.",
  },
];

export function useGuidedTour() {
  const [isTouring, setIsTouring] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(-1);
  const [tourFeedback, setTourFeedback] = useState("");
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!synthRef.current) { resolve(); return; }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      utterance.volume = 1;

      // Try to pick a good English voice
      const voices = synthRef.current.getVoices();
      const preferred = voices.find(v => 
        v.name.includes("Google UK English Male") || 
        v.name.includes("Daniel") || 
        v.name.includes("Microsoft David") ||
        v.name.includes("Google US English")
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        if (e.error === 'canceled') resolve(); 
        else reject(e);
      };
      
      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string): Promise<void> => {
    return new Promise((resolve) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Wait for scroll to finish
        setTimeout(resolve, 1200);
      } else {
        resolve();
      }
    });
  }, []);

  const startTour = useCallback(async () => {
    if (!synthRef.current) {
      setTourFeedback("Text-to-Speech not supported in this browser.");
      return;
    }

    isCancelledRef.current = false;
    setIsTouring(true);
    setCurrentStopIndex(0);

    // Ensure voices are loaded
    if (synthRef.current.getVoices().length === 0) {
      await new Promise<void>((resolve) => {
        synthRef.current!.onvoiceschanged = () => resolve();
        setTimeout(resolve, 500);
      });
    }

    for (let i = 0; i < tourStops.length; i++) {
      if (isCancelledRef.current) break;
      
      const stop = tourStops[i];
      setCurrentStopIndex(i);
      setTourFeedback(`📍 ${stop.title}`);
      
      // Scroll to section
      await scrollToSection(stop.sectionId);
      if (isCancelledRef.current) break;

      // Small pause before speaking
      await new Promise(r => setTimeout(r, 400));
      if (isCancelledRef.current) break;

      // Narrate
      try {
        await speak(stop.narration);
      } catch {
        // Speech was cancelled or errored, continue
      }
      if (isCancelledRef.current) break;

      // Pause between stops
      await new Promise(r => setTimeout(r, 800));
    }

    if (!isCancelledRef.current) {
      setTourFeedback("✅ Tour complete!");
      setTimeout(() => {
        setTourFeedback("");
        setIsTouring(false);
        setCurrentStopIndex(-1);
      }, 3000);
    }
  }, [speak, scrollToSection]);

  const stopTour = useCallback(() => {
    isCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsTouring(false);
    setCurrentStopIndex(-1);
    setTourFeedback("Tour stopped.");
    setTimeout(() => setTourFeedback(""), 2000);
  }, []);

  return {
    isTouring,
    currentStopIndex,
    tourFeedback,
    currentStop: currentStopIndex >= 0 ? tourStops[currentStopIndex] : null,
    totalStops: tourStops.length,
    startTour,
    stopTour,
  };
}
