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
import ProcessSection from "@/components/sections/process/process-section";
import ServicesSection from "@/components/sections/services-section";
import ContactUs from "@/components/sections/contact-us";
import HeroAndAboutSections from "@/components/sections/hero-about-section";

// Simple hook to detect mobile devices (width < 768px)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splashComplete, setSplashComplete] = useState(false);
  const { setActiveSection } = useScroll();
  const isScrollingRef = useRef(false);
  const isMobile = useIsMobile();

  // When splash is finished, mark complete and update active section.
  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
    setActiveSection("hero");
  }, [setActiveSection]);

  // Only attach custom snapping listeners on non-mobile devices.
  useEffect(() => {
    if (!containerRef.current || !splashComplete || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const sections = document.querySelectorAll('section[id^="section-"]');
      const windowHeight = window.innerHeight;
      let currentIndex = 0;

      // Find current section based on its distance to viewport center.
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (Math.abs(rect.top) < windowHeight / 2) {
          currentIndex = index;
        }
      });

      const targetIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction)
      );
      if (targetIndex === currentIndex) return;

      e.preventDefault();
      isScrollingRef.current = true;
      const targetSection = sections[targetIndex] as HTMLElement;
      targetSection.scrollIntoView({ behavior: "smooth" });
      const sectionId = targetSection.id.replace("section-", "") as SectionType;
      setActiveSection(sectionId);
      setTimeout(() => (isScrollingRef.current = false), 1000);
    };

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

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [splashComplete, isMobile, setActiveSection]);

  return (
    <div className="relative h-screen overflow-hidden">
      {splashComplete && <Header />}
      {splashComplete && <PageIndicator />}
      <div
        ref={containerRef}
        className={`h-screen overflow-y-auto scroll-smooth ${
          !isMobile ? "snap-y snap-mandatory" : ""
        }`}
      >
        <SplashScreen onComplete={handleSplashComplete} />
        <HeroAndAboutSections />
        <ProcessSection />
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
