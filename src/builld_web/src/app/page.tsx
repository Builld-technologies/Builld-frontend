"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ScrollProvider,
  useScroll,
  SectionType,
} from "@/context/scroll-context";
import Header from "@/components/layout/header";
import PageIndicator from "@/components/ui/page-indicator";
import SplashScreen from "@/components/sections/splash-screen";
import HeroAndAboutSections from "@/components/sections/hero-about-section";
import ProcessSection from "@/components/sections/process/process-section";
import ServicesSection from "@/components/sections/services-section";
import ContactUs from "@/components/sections/contact-us";

function HomeContent() {
  const [splashComplete, setSplashComplete] = useState(false);
  const { setActiveSection } = useScroll();

  // When splash screen completes, mark complete and set active section.
  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
    setActiveSection("hero");
  }, [setActiveSection]);

  return (
    <div className="relative h-screen overflow-hidden">
      {splashComplete && <Header />}
      {splashComplete && <PageIndicator />}
      <div className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
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
