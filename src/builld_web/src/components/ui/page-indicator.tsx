"use client";

import { motion } from "framer-motion";
import { useScroll } from "@/context/scroll-context";

type SectionType = "splash" | "home" | "about" | "process" | "services";

export default function PageIndicator() {
  const { activeSection, scrollToSection } = useScroll();

  const sections: SectionType[] = ["home", "about", "process", "services"];

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-6 items-center">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="w-6 h-6 relative flex items-center justify-center"
          aria-label={`Go to ${section} section`}
        >
          {activeSection === section ? (
            <motion.div
              className="w-5 h-5 rounded-full border border-white absolute"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : null}
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: activeSection === section ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />
        </button>
      ))}
    </div>
  );
}
