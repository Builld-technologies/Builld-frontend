"use client";

import { useInView } from "react-intersection-observer";
import { useScroll } from "@/context/scroll-context";
import { useEffect, useState, useRef } from "react";
import BackgroundAnimation from "@/components/ui/background-animation";
import ProcessIntroSection from "./process-intro-section";
import ProcessStepsSection from "./process-step-section";

export default function ProcessPage() {
  const [processRef, processInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const sectionRef = useRef<HTMLElement>(null);

  const { setActiveSection } = useScroll();
  const [processCardStep, setProcessCardStep] = useState(0);
  const [currentSection, setCurrentSection] = useState("intro");
  const [showFinalHeading, setShowFinalHeading] = useState(false);

  // Track scroll position to determine which subsection is visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate which section should be active based on scroll position
      if (scrollY < windowHeight * 0.5) {
        setCurrentSection("intro");
      } else if (scrollY < windowHeight * 1.5) {
        setCurrentSection("steps");
        // Start animating cards when steps section is visible
        if (processCardStep === 0) {
          setProcessCardStep(1);
          setTimeout(() => setProcessCardStep(2), 1200);
          setTimeout(() => setProcessCardStep(3), 2400);
          setTimeout(() => setProcessCardStep(4), 3600);
        }
      } else {
        setCurrentSection("weeks");
        setShowFinalHeading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [processCardStep]);

  // Set active section for global navigation
  useEffect(() => {
    if (processInView) {
      const timer = setTimeout(() => {
        setActiveSection("process");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [processInView, setActiveSection]);

  return (
    <section
      id="section-process"
      ref={(el) => {
        if (el) {
          processRef(el);
          sectionRef.current = el;
        }
      }}
      className="section-fullscreen snap-section relative"
    >
      <BackgroundAnimation withBlur={true} />

      {/* First Section: Process Introduction */}
      <ProcessIntroSection isActive={currentSection === "intro"} />

      {/* Combined Second/Third Section: Process Cards & Final Heading */}
      <ProcessStepsSection
        currentSection={currentSection}
        processCardStep={processCardStep}
        showFinalHeading={showFinalHeading}
      />
    </section>
  );
}
