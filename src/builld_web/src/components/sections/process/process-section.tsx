"use client";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import BackgroundAnimation from "../../ui/background-animation";
import { useScroll } from "@/context/scroll-context";
import ProcessIntro from "./process-intro";
import ProcessSteps from "./process-steps";

export default function ProcessSection() {
  const { setActiveSection } = useScroll();

  // Main section ref for navigation
  const [mainSectionRef, mainSectionInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Steps section with progressive animations
  const [stepsRef, stepsInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Set active section based on which part is in view
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mainSectionInView && !stepsInView) {
        setActiveSection("process");
      } else if (stepsInView) {
        setActiveSection("process-steps");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mainSectionInView, stepsInView, setActiveSection]);

  return (
    <>
      {/* Intro Section */}
      <section
        ref={mainSectionRef}
        id="section-process"
        className="relative section-fullscreen snap-section min-h-screen w-full flex items-center"
      >
        <BackgroundAnimation withBlur={true} />
        <ProcessIntro />
      </section>

      {/* Steps Section */}
      <section
        ref={stepsRef}
        id="section-process-steps"
        className="relative z-10 section-fullscreen snap-section min-h-screen w-full flex items-center justify-center"
      >
        <BackgroundAnimation withBlur={true} />
        <ProcessSteps inView={stepsInView} />
      </section>
    </>
  );
}
