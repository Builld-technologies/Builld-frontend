"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  ScrollProvider,
  useScroll,
  SectionType,
} from "@/context/scroll-context";
import Header from "@/components/layout/header";
import PageIndicator from "@/components/ui/page-indicator";
import SplashScreen from "@/components/sections/splash-screen";
import ProcessSection from "@/components/sections/process-section";
import ProcessSteps from "@/components/sections/process-steps";
import AllInWeeksSection from "@/components/sections/all-in-weeks";
import ServicesSection from "@/components/sections/services-section";
import ContactUs from "@/components/sections/contact-us";
import HeroAndAboutSections from "@/components/sections/hero_about_section";

function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splashComplete, setSplashComplete] = useState(false);
  const { setActiveSection } = useScroll();
  const isScrollingRef = useRef(false);

  // Handle splash completion
  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
    setActiveSection("hero");
  }, [setActiveSection]);

  // Setup scroll snapping
  useEffect(() => {
    if (!containerRef.current || !splashComplete) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const sections = document.querySelectorAll('section[id^="section-"]');

      // Find current section
      const windowHeight = window.innerHeight;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (Math.abs(rect.top) < windowHeight / 2) {
          currentIndex = index;
        }
      });

      // Calculate target section
      const targetIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction)
      );

      if (targetIndex === currentIndex) return;

      e.preventDefault();
      isScrollingRef.current = true;

      // Scroll to target section
      const targetSection = sections[targetIndex] as HTMLElement;
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Update active section
      const sectionId = targetSection.id.replace("section-", "") as SectionType;
      setActiveSection(sectionId);

      // Reset scrolling flag
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    // Touch handling
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current) return;

      const touchY = e.touches[0].clientY;
      const direction = touchStartY > touchY ? 1 : -1;

      if (Math.abs(touchStartY - touchY) > 50) {
        const event = new WheelEvent("wheel", { deltaY: direction });
        handleWheel(event);
      }
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [splashComplete, setActiveSection]);

  return (
    <div className="relative h-screen overflow-hidden">
      {splashComplete && <Header />}
      {splashComplete && <PageIndicator />}

      <div
        className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
        ref={containerRef}
      >
        <SplashScreen onComplete={handleSplashComplete} />
        <HeroAndAboutSections />
        <ProcessSection />
        <ProcessSteps />
        <AllInWeeksSection />
        <ServicesSection />
        <ContactUs />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ScrollProvider>
      <HomeContent />
    </ScrollProvider>
  );
}
