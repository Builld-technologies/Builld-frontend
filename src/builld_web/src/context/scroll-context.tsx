"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

// Updated section types with unnecessary sections removed
export type SectionType =
  | "splash"
  | "hero"
  | "about"
  | "process"
  | "process-steps"
  | "services"
  | "contact";

type ScrollContextType = {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  scrollToSection: (section: SectionType) => void;
  processCardStep: number;
  setProcessCardStep: (step: number) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionType>("splash");
  const [processCardStep, setProcessCardStep] = useState(0);
  const isScrolling = useRef(false);
  const manualSectionUpdateRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = useCallback((section: SectionType) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    manualSectionUpdateRef.current = true;

    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Update active section immediately for better UX
      setActiveSection(section);

      // Reset isScrolling flag after animation completes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
        manualSectionUpdateRef.current = false;
      }, 1000);
    } else {
      isScrolling.current = false;
      manualSectionUpdateRef.current = false;
    }
  }, []);

  // Debounced section setter to prevent rapid changes
  const debouncedSetActiveSection = useCallback(
    (section: SectionType) => {
      if (section === activeSection || manualSectionUpdateRef.current) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setActiveSection(section);
      }, 100);
    },
    [activeSection]
  );

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current || manualSectionUpdateRef.current) return;

      // Updated sections array with correct order
      const sections: SectionType[] = [
        "splash",
        "hero",
        "about",
        "process",
        "process-steps",
        "services",
        "contact",
      ];

      // Find which section has the most viewport coverage
      let maxVisibleSection: SectionType | null = null;
      let maxVisibleArea = 0;

      for (const section of sections) {
        const element = document.getElementById(`section-${section}`);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of this section is visible in the viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);

        if (visibleBottom > visibleTop) {
          const visibleArea = visibleBottom - visibleTop;
          // Give slightly more weight to sections near the top of the viewport
          const adjustedArea =
            visibleArea * (1 + (1 - visibleTop / windowHeight) * 0.1);

          if (adjustedArea > maxVisibleArea) {
            maxVisibleArea = adjustedArea;
            maxVisibleSection = section;
          }
        }
      }

      if (maxVisibleSection && maxVisibleSection !== activeSection) {
        debouncedSetActiveSection(maxVisibleSection);
      }

      // Update process card step if we're in the process section
      if (activeSection === "process") {
        const processSection = document.getElementById(`section-process`);
        if (processSection) {
          const { top, height } = processSection.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, -top / height));

          const newStep = Math.min(4, Math.floor(progress * 5));
          setProcessCardStep(newStep);
        }
      }
    };

    // Use both scroll and wheel events for more reliable detection
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });

    // Run initially to set the correct section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [activeSection, debouncedSetActiveSection]);

  return (
    <ScrollContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollToSection,
        processCardStep,
        setProcessCardStep,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
