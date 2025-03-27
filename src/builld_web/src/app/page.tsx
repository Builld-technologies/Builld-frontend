"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollProvider } from "@/context/scroll-context";
import Header from "@/components/layout/header";
import PageIndicator from "@/components/ui/page-indicator";
import SplashScreen from "@/components/sections/splash-screen";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProcessSection from "@/components/sections/process-section";
import ProcessSteps from "@/components/sections/process-steps";
import AllInWeeksSection from "@/components/sections/all-in-weeks";
import ServicesSection from "@/components/sections/services-section";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splashComplete, setSplashComplete] = useState(false);
  const initialScrollHandled = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let isScrolling = false;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      const sections = document.querySelectorAll('section[id^="section-"]');

      let currentIndex = 0;
      let currentSectionFound = false;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= 100 &&
          rect.bottom >= window.innerHeight / 3 &&
          !currentSectionFound
        ) {
          currentIndex = index;
          currentSectionFound = true;
        }
      });

      // Calculate target section index
      const targetIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction)
      );

      if (targetIndex === currentIndex) return;

      const targetSection = sections[targetIndex] as HTMLElement;
      const currentSection = sections[currentIndex] as HTMLElement;

      const isProcessSection =
        targetSection.id === "section-process-steps" ||
        currentSection.id === "section-process-steps";

      if (isProcessSection && targetSection.id === currentSection.id) {
        return;
      }

      e.preventDefault();
      isScrolling = true;

      targetSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchY = e.touches[0].clientY;
      const direction = touchStartY > touchY ? 1 : -1;

      if (Math.abs(touchStartY - touchY) > 50) {
        const sections = document.querySelectorAll('section[id^="section-"]');

        // Find current visible section
        let currentIndex = 0;
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= window.innerHeight / 3) {
            currentIndex = index;
          }
        });

        // Calculate target section index
        const targetIndex = Math.max(
          0,
          Math.min(sections.length - 1, currentIndex + direction)
        );

        if (targetIndex === currentIndex) return;

        isScrolling = true;

        const targetSection = sections[targetIndex] as HTMLElement;
        targetSection.scrollIntoView({ behavior: "smooth" });

        touchStartY = touchY;

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
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
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashComplete(true);

      if (!initialScrollHandled.current) {
        const heroSection = document.getElementById("section-home");
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: "smooth" });
          initialScrollHandled.current = true;
        }
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollProvider>
      <div className="relative h-screen overflow-hidden">
        {splashComplete && <Header />}
        {splashComplete && <PageIndicator />}

        <div
          className="h-screen overflow-y-auto scroll-smooth"
          ref={containerRef}
        >
          <SplashScreen />
          <HeroSection />
          <AboutSection />
          <ProcessSection />
          <ProcessSteps />
          <AllInWeeksSection />
          <ServicesSection />
        </div>
      </div>
    </ScrollProvider>
  );
}
