"use client";

import { motion } from "framer-motion";
import { useScroll, SectionType } from "@/context/scroll-context";
import { useState, useEffect, useRef } from "react";

export default function PageIndicator() {
  const { activeSection, scrollToSection } = useScroll();
  const [stableSection, setStableSection] =
    useState<SectionType>(activeSection);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update stable section with debounce to prevent flickering during fast scrolling
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Use a timeout for stability during scrolling
    timeoutRef.current = setTimeout(() => {
      setStableSection(activeSection);
    }, 200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeSection]);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth >= 768); // Hide on screens smaller than md breakpoint
    };

    // Check on initial load
    checkScreenSize();

    // Add listener for screen size changes
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Define sections to display in the indicator
  const sections: SectionType[] = [
    "hero",
    "about",
    "process",
    "services",
    "contact",
  ];

  const labels: Record<SectionType, string> = {
    hero: "Home",
    about: "About",
    process: "Process",
    "process-steps": "Process",
    services: "Services",
    contact: "Contact",
    splash: "Splash",
  };

  // Map process-steps to process for indicator display
  const getNormalizedSection = (section: SectionType): SectionType => {
    return section === "process-steps" ? "process" : section;
  };

  // Get the display section based on the current active section
  const normalizedActiveSection = getNormalizedSection(stableSection);

  // If not visible (small screens), return null
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex-col space-y-4 lg:space-y-6 hidden md:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => {
            setStableSection(section); // Update immediately for responsive UI
            scrollToSection(section);
          }}
          className="w-5 h-5 lg:w-6 lg:h-6 relative flex items-center justify-center group"
          aria-label={`Go to ${labels[section]} section`}
        >
          {/* Active ring animation */}
          {normalizedActiveSection === section && (
            <motion.div
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-white absolute"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
            />
          )}

          {/* Dot with dynamic scaling */}
          <motion.div
            className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white"
            animate={{
              scale: normalizedActiveSection === section ? 1 : 0.8,
              opacity: normalizedActiveSection === section ? 1 : 0.6,
            }}
            transition={{ type: "spring", damping: 15 }}
          />

          {/* Tooltip that appears on hover */}
          <div className="opacity-0 group-hover:opacity-100 absolute right-8 whitespace-nowrap bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs transition-opacity duration-200 pointer-events-none">
            {labels[section]}
          </div>
        </button>
      ))}
    </motion.div>
  );
}
