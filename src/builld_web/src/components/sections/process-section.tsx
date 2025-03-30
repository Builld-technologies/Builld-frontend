"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Process card data with explicit typing
interface ProcessCard {
  title: string;
  description: string;
  step: 1 | 2 | 3;
}

const processCards: ProcessCard[] = [
  {
    title: "Pre-Project",
    description: "Planning, onboarding, and defining the scope.",
    step: 1,
  },
  {
    title: "During Project",
    description:
      "Design sprints, prototype reviews, and iterative development.",
    step: 2,
  },
  {
    title: "Close & Post-Project",
    description: "Deployment, client handover, and optional support.",
    step: 3,
  },
];

// Type definitions for animation maps
type StepIndex = 0 | 1 | 2 | 3 | 4;
type CardIndex = 1 | 2 | 3;
type AnimationMap = Record<StepIndex, Record<CardIndex, number>>;

export default function ProcessSection() {
  const [processRef, processInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Using useCallback to memoize the setActiveSection function
  const setActiveSection = useCallback((sectionName: string) => {
    // This is a placeholder - replace with your actual implementation
    console.log(`Setting active section to: ${sectionName}`);
  }, []);

  const [currentSection, setCurrentSection] = useState("intro");
  const [processCardStep, setProcessCardStep] = useState(0);
  const [showFinalHeading, setShowFinalHeading] = useState(false);

  // Handle scroll to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate section visibility based on scroll position
      if (scrollY < windowHeight * 0.5) {
        setCurrentSection("intro");
      } else if (scrollY < windowHeight * 1.5) {
        setCurrentSection("steps");
        // Start card animation sequence when steps section becomes visible
        if (processCardStep === 0) {
          setProcessCardStep(1);
          setTimeout(() => setProcessCardStep(2), 1000);
          setTimeout(() => setProcessCardStep(3), 2000);
          setTimeout(() => setProcessCardStep(4), 3000);
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

  // Helper functions for card animations with proper typing
  const getRotation = (cardId: number, currentStep: number): number => {
    const rotationMap: AnimationMap = {
      0: { 1: -15, 2: -30, 3: -45 }, // Initial state
      1: { 1: 0, 2: -15, 3: -30 }, // First card appears
      2: { 1: -15, 2: 0, 3: -15 }, // Second card appears
      3: { 1: -30, 2: -15, 3: 0 }, // Third card appears
      4: { 1: -45, 2: -30, 3: -15 }, // All cards shift up
    };

    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return rotationMap[safeStep][safeCardId];
  };

  const getYPosition = (cardId: number, currentStep: number): number => {
    const yPositionMap: AnimationMap = {
      0: { 1: 100, 2: 100, 3: 100 }, // Initial state (off-screen)
      1: { 1: 0, 2: 30, 3: 60 }, // First card appears
      2: { 1: -30, 2: 0, 3: 30 }, // Second card appears
      3: { 1: -60, 2: -30, 3: 0 }, // Third card appears
      4: { 1: -90, 2: -60, 3: -30 }, // All cards shift up
    };

    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return yPositionMap[safeStep][safeCardId];
  };

  const getOpacity = (cardId: number, currentStep: number): number => {
    const opacityMap: AnimationMap = {
      0: { 1: 0.8, 2: 0.5, 3: 0.2 }, // Initial state
      1: { 1: 1, 2: 0.7, 3: 0.3 }, // First card appears
      2: { 1: 0.7, 2: 1, 3: 0.7 }, // Second card appears
      3: { 1: 0.3, 2: 0.7, 3: 1 }, // Third card appears
      4: { 1: 0.2, 2: 0.5, 3: 0.8 }, // All cards shift up
    };

    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return opacityMap[safeStep][safeCardId];
  };

  // Section visibility configuration
  const isIntroActive = currentSection === "intro";
  const isStepsActive = currentSection === "steps";
  const isWeeksActive = currentSection === "weeks";

  return (
    <section
      id="section-process"
      ref={processRef}
      className="section-fullscreen snap-section relative min-h-screen"
    >
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-xl"></div>

      {/* Intro Section */}
      <div
        className="absolute inset-0 h-screen flex items-center transition-opacity duration-500"
        style={{ opacity: isIntroActive ? 1 : 0.5 }}
      >
        <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Logo Section - Left Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-4 flex justify-center md:justify-start"
            >
              <div
                className="w-52 h-52 md:w-60 md:h-60 flex items-center justify-center rounded-[80px] transform -rotate-90"
                style={{
                  padding: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(200px)",
                }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src="/images/L.png"
                    alt="Company Logo"
                    width={120}
                    height={120}
                    className="object-contain"
                    quality={100}
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Section - Right Side */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="md:col-span-8 flex flex-col"
            >
              <motion.div
                className="flex items-center mb-16"
                variants={fadeUpVariant}
              >
                <div className="w-8 h-px bg-white/70 mr-2"></div>
                <span className="text-sm text-white/70">Our Process</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight tracking-tight"
                variants={fadeUpVariant}
              >
                From Concept to Launch
                <br />— The <span className="text-[#b0ff00]">Builld</span> Way
              </motion.h2>

              <motion.p
                className="text-base md:text-lg max-w-2xl text-gray-200 opacity-90 leading-relaxed"
                variants={fadeUpVariant}
              >
                Explore our clear, three-phase process that ensures efficient
                project delivery without compromising quality.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Steps & Final Section */}
      <div
        className="absolute inset-0 top-screen h-screen flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: isStepsActive || isWeeksActive ? 1 : 0.5 }}
      >
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Step indicators on the left */}
          <div
            className="absolute left-16 md:left-24 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl font-bold transition-opacity duration-500"
            style={{ opacity: isStepsActive ? 1 : 0.5 }}
          >
            {processCardStep >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-24 md:mb-32"
              >
                01.
              </motion.div>
            )}
            {processCardStep >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-24 md:mb-32"
              >
                02.
              </motion.div>
            )}
            {processCardStep >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                03.
              </motion.div>
            )}
          </div>

          {/* Center cards */}
          <div
            className="relative h-96 w-full max-w-xl flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: isStepsActive ? 1 : 0.5 }}
          >
            {processCards.map((card) => (
              <motion.div
                key={card.step}
                className="absolute"
                style={{
                  width: "432px",
                  height: "423px",
                  zIndex: 10 - card.step,
                }}
                initial={{
                  y: 100,
                  opacity: 0.2,
                  rotate: -45,
                  x: 0,
                }}
                animate={{
                  y: getYPosition(card.step, processCardStep),
                  opacity: getOpacity(card.step, processCardStep),
                  rotate: getRotation(card.step, processCardStep),
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="w-full h-full flex flex-col justify-center items-center text-center rounded-[40px]"
                  style={{
                    padding: "91px 48px",
                    backgroundColor: "rgba(245, 245, 247, 0.1)",
                    border: "1.5px solid rgba(245, 245, 247, 0.4)",
                    backdropFilter: "blur(100px)",
                    boxShadow:
                      "0px 0px 20px 0px rgba(255, 255, 255, 0.4) inset",
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/80">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* "All in Weeks" heading overlay */}
          <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: showFinalHeading ? 1 : 0,
              scale: showFinalHeading ? 1 : 0.9,
            }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 20 }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              All in <span className="text-[#b0ff00]">Weeks!</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
