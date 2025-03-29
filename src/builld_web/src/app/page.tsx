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
import ContactUs from "@/components/sections/contact-us";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splashComplete, setSplashComplete] = useState(false);
  const initialScrollHandled = useRef(false);

  // Handle splash completion
  const handleSplashComplete = () => {
    setSplashComplete(true);

    // No need for another timeout; we directly use the one from the splash component
    const heroSection = document.getElementById("section-home");
    if (heroSection && !initialScrollHandled.current) {
      initialScrollHandled.current = true;
      // The hero section is already visible; no need to scroll
    }
  };

  // Section scrolling handler
  useEffect(() => {
    if (!containerRef.current || !splashComplete) return;

    let isScrolling = false;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const sections = document.querySelectorAll('section[id^="section-"]');

      // Find current section
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

      e.preventDefault();
      isScrolling = true;

      const targetSection = sections[targetIndex] as HTMLElement;
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

        let currentIndex = 0;
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= window.innerHeight / 3) {
            currentIndex = index;
          }
        });

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
  }, [splashComplete]);

  return (
    <ScrollProvider>
      <div className="relative h-screen overflow-hidden">
        {splashComplete && <Header />}
        {splashComplete && <PageIndicator />}

        <div
          className="h-screen overflow-y-auto scroll-smooth"
          ref={containerRef}
        >
          {/* Splash screen overlay - slides up to reveal content */}
          <SplashScreen onComplete={handleSplashComplete} />

          {/* Content is always present, just covered by splash initially */}
          <HeroSection />
          <AboutSection />
          <ProcessSection />
          <ProcessSteps />
          <AllInWeeksSection />
          <ServicesSection />
          <ContactUs />
        </div>
      </div>
    </ScrollProvider>
  );
}
