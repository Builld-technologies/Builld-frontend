"use client";

import { motion } from "framer-motion";
import { useScroll, SectionType } from "@/context/scroll-context";
import { useState, useEffect, useRef } from "react";

export default function PageIndicator() {
  const { activeSection, scrollToSection } = useScroll();
  const [stableSection, setStableSection] =
    useState<SectionType>(activeSection);
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

  // Define sections to display in the indicator
  // Note: We're not showing 'splash' in the navigation dots
  const sections: SectionType[] = [
    "hero",
    "about",
    "process",
    "process-steps",
    "services",
    "contact",
  ];

  const labels: Record<SectionType, string> = {
    hero: "Home",
    about: "About",
    process: "Process",
    "process-steps": "Steps",
    services: "Services",
    contact: "Contact",
    splash: "Splash", // Included for type safety but not used in UI
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-6">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => {
            setStableSection(section); // Update immediately for responsive UI
            scrollToSection(section);
          }}
          className="w-6 h-6 relative flex items-center justify-center group"
          aria-label={`Go to ${labels[section]} section`}
        >
          {/* Active ring animation */}
          {stableSection === section && (
            <motion.div
              className="w-5 h-5 rounded-full border border-white absolute"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
            />
          )}

          {/* Dot with dynamic scaling */}
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: stableSection === section ? 1 : 0.8,
              opacity: stableSection === section ? 1 : 0.6,
            }}
            transition={{ type: "spring", damping: 15 }}
          />

          {/* Tooltip that appears on hover */}
          <div className="opacity-0 group-hover:opacity-100 absolute right-8 whitespace-nowrap bg-black/70 px-2 py-1 rounded text-xs transition-opacity duration-200">
            {labels[section]}
          </div>
        </button>
      ))}
    </div>
  );
}
