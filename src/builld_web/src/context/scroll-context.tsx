"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// specific types for the section names
export type SectionType = "splash" | "home" | "about" | "process" | "services";

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

  const scrollToSection = (section: SectionType) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Update active section
      setActiveSection(section);

      // Reset isScrolling flag after animation completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    } else {
      isScrolling.current = false;
    }
  };

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const sections: SectionType[] = [
        "splash",
        "home",
        "about",
        "process",
        "services",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check which section is currently visible
      for (const section of sections) {
        const element = document.getElementById(`section-${section}`);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          // Consider a section active when it occupies a significant portion of the viewport
          if (
            (top <= 100 && bottom >= window.innerHeight / 2) ||
            (scrollPosition >= elementTop && scrollPosition <= elementBottom)
          ) {
            if (activeSection !== section) {
              setActiveSection(section);
            }

            // Update process card step if we're in the process section
            if (section === "process") {
              const processHeight = elementBottom - elementTop;
              const relativePosition =
                (scrollPosition - elementTop) / processHeight;

              const newStep =
                relativePosition < 0.2
                  ? 0
                  : relativePosition < 0.4
                  ? 1
                  : relativePosition < 0.6
                  ? 2
                  : relativePosition < 0.8
                  ? 3
                  : 4;

              setProcessCardStep(newStep);
            }

            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

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
