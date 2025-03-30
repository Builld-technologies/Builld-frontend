"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BackgroundAnimation from "../ui/background-animation";
import { useScroll } from "@/context/scroll-context";

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
type StepIndex = 0 | 1 | 2 | 3 | 4 | 5;
type CardIndex = 1 | 2 | 3;
type AnimationMap = Record<StepIndex, Record<CardIndex, number>>;

export default function ProcessSection() {
  const [processCardStep, setProcessCardStep] = useState(0);
  const [showFinalHeading, setShowFinalHeading] = useState(false);
  const { setActiveSection } = useScroll();

  // Main section ref for navigation - increased threshold for better detection
  const [mainSectionRef, mainSectionInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Steps section with progressive animations
  const [stepsRef, stepsInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Set active section based on which part is more in view
  useEffect(() => {
    // Short debounce to prevent rapid switching
    const timer = setTimeout(() => {
      if (mainSectionInView && !stepsInView) {
        setActiveSection("process");
      } else if (stepsInView) {
        setActiveSection("process-steps");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mainSectionInView, stepsInView, setActiveSection]);

  // Handle card animations based on scroll and visibility
  useEffect(() => {
    if (stepsInView) {
      if (processCardStep === 0) {
        // Initial sequence for steps with appropriate timing
        const step1 = setTimeout(() => setProcessCardStep(1), 300);
        const step2 = setTimeout(() => setProcessCardStep(2), 1300);
        const step3 = setTimeout(() => setProcessCardStep(3), 2300);
        // Final reveal
        const step4 = setTimeout(() => {
          setProcessCardStep(4);
          setTimeout(() => {
            setProcessCardStep(5);
            setShowFinalHeading(true);
          }, 800);
        }, 3300);

        return () => {
          clearTimeout(step1);
          clearTimeout(step2);
          clearTimeout(step3);
          clearTimeout(step4);
        };
      }
    } else {
      // Reset animations when out of view for better UX on re-scroll
      if (processCardStep >= 4) {
        setProcessCardStep(3);
        setShowFinalHeading(false);
      }
    }
  }, [stepsInView, processCardStep]);

  // Helper functions for card animations with proper typing
  const getRotation = (cardId: number, currentStep: number): number => {
    const rotationMap: AnimationMap = {
      0: { 1: -15, 2: -30, 3: -45 }, // Initial state
      1: { 1: 0, 2: -15, 3: -30 }, // First card appears
      2: { 1: -15, 2: 0, 3: -15 }, // Second card appears
      3: { 1: -30, 2: -15, 3: 0 }, // Third card appears
      4: { 1: -45, 2: -30, 3: -15 }, // Cards shift up for final heading
      5: { 1: -55, 2: -40, 3: -25 }, // Cards shift up more for final heading
    };

    const safeStep = Math.min(5, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return rotationMap[safeStep][safeCardId];
  };

  const getYPosition = (cardId: number, currentStep: number): number => {
    const yPositionMap: AnimationMap = {
      0: { 1: 100, 2: 100, 3: 100 }, // Initial state (off-screen)
      1: { 1: 0, 2: 30, 3: 60 }, // First card appears
      2: { 1: -30, 2: 0, 3: 30 }, // Second card appears
      3: { 1: -60, 2: -30, 3: 0 }, // Third card appears
      4: { 1: -100, 2: -70, 3: -40 }, // Cards shift up for final heading
      5: { 1: -140, 2: -110, 3: -80 }, // Cards shift up more to make room
    };

    const safeStep = Math.min(5, Math.max(0, currentStep)) as StepIndex;
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
      5: { 1: 0.1, 2: 0.3, 3: 0.6 }, // Cards fade more for final heading
    };

    const safeStep = Math.min(5, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return opacityMap[safeStep][safeCardId];
  };

  return (
    <>
      {/* Intro Section */}
      <section
        ref={mainSectionRef}
        id="section-process"
        className="relative section-fullscreen snap-section min-h-screen w-full flex items-center"
      >
        {/* Background Animation */}
        <BackgroundAnimation withBlur={true} />
        <div className="max-w-7xl z-10 w-full px-6 md:px-10 mx-auto py-16">
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
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
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
      </section>

      {/* Combined Steps and Final Section */}
      <section
        ref={stepsRef}
        id="section-process-steps"
        className="relative z-10 section-fullscreen snap-section min-h-screen w-full flex items-center justify-center"
      >
        {/* Background Animation */}
        <BackgroundAnimation withBlur={true} />
        <div className="w-full h-full flex flex-col items-center justify-center relative py-24">
          {/* Step indicators on the left */}
          <div className="absolute left-8 md:left-24 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl font-bold z-10">
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
          <div className="relative h-96 w-full max-w-xl flex items-center justify-center">
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

          {/* Final "All in Weeks" heading - now integrated in the same section */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{
              opacity: showFinalHeading ? 1 : 0,
              y: showFinalHeading ? 0 : 40,
              scale: showFinalHeading ? 1 : 0.95,
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-48 z-20"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              All in <span className="text-[#b0ff00]">Weeks!</span>
            </h2>
          </motion.div>
        </div>
      </section>
    </>
  );
}
