"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScroll } from "@/context/scroll-context";
import { useEffect, useState } from "react";
import BackgroundAnimation from "@/components/ui/background-animation";
import Image from "next/image";
import {
  fadeUpVariant,
  staggerChildren,
} from "@/animations/section-animations";

interface ProcessCardData {
  title: string;
  description: string;
  step: 1 | 2 | 3;
}

// TypeScript needs these explicit types for indexing
type StepIndex = 0 | 1 | 2 | 3 | 4;
type CardIndex = 1 | 2 | 3;
type StepMap = Record<StepIndex, Record<CardIndex, number>>;

export default function ProcessPage() {
  const [headerRef, headerInView] = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  const [stepsRef, stepsInView] = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  const [weeksRef, weeksInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { setActiveSection } = useScroll();
  // Use local state for processCardStep instead of context
  const [processCardStep, setProcessCardStep] = useState(0);

  useEffect(() => {
    if (headerInView) {
      const timer = setTimeout(() => {
        setActiveSection("process");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [headerInView, setActiveSection]);

  // Update process card step based on scroll position in steps section
  useEffect(() => {
    if (stepsInView) {
      const stepsTimer = setTimeout(() => {
        // Start animating cards once in view
        setProcessCardStep(1);

        // After initial animation, sequence through all steps
        const step2Timer = setTimeout(() => setProcessCardStep(2), 800);
        const step3Timer = setTimeout(() => setProcessCardStep(3), 1600);
        const step4Timer = setTimeout(() => setProcessCardStep(4), 2400);

        return () => {
          clearTimeout(step2Timer);
          clearTimeout(step3Timer);
          clearTimeout(step4Timer);
        };
      }, 300);

      return () => clearTimeout(stepsTimer);
    } else {
      // Reset when scrolled away
      setProcessCardStep(0);
    }
  }, [stepsInView]);

  // Process cards data with proper typing
  const processCards: ProcessCardData[] = [
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

  // Get rotation angle for each card based on the current step
  const getRotation = (cardId: number, currentStep: number) => {
    const rotationMap: StepMap = {
      0: { 1: -15, 2: -30, 3: -45 }, // Initial state
      1: { 1: 0, 2: -15, 3: -30 }, // First card appears
      2: { 1: -15, 2: 0, 3: -15 }, // Second card appears
      3: { 1: -30, 2: -15, 3: 0 }, // Third card appears
      4: { 1: -45, 2: -30, 3: -15 }, // All cards shift up
    };

    // Ensure we have valid indexes by using type assertions
    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return rotationMap[safeStep][safeCardId];
  };

  // Get y-position for each card based on the current step
  const getYPosition = (cardId: number, currentStep: number) => {
    const yPositionMap: StepMap = {
      0: { 1: 100, 2: 100, 3: 100 }, // Initial state
      1: { 1: 0, 2: 30, 3: 60 }, // First card appears
      2: { 1: -30, 2: 0, 3: 30 }, // Second card appears
      3: { 1: -60, 2: -30, 3: 0 }, // Third card appears
      4: { 1: -90, 2: -60, 3: -30 }, // All cards shift up
    };

    // Ensure we have valid indexes by using type assertions
    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return yPositionMap[safeStep][safeCardId];
  };

  // Get opacity for each card based on the current step
  const getOpacity = (cardId: number, currentStep: number) => {
    const opacityMap: StepMap = {
      0: { 1: 0.8, 2: 0.5, 3: 0.2 }, // Initial state
      1: { 1: 1, 2: 0.7, 3: 0.3 }, // First card appears
      2: { 1: 0.7, 2: 1, 3: 0.7 }, // Second card appears
      3: { 1: 0.5, 2: 0.7, 3: 1 }, // Third card appears
      4: { 1: 0.3, 2: 0.5, 3: 0.8 }, // All cards shift up
    };

    // Ensure we have valid indexes by using type assertions
    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return opacityMap[safeStep][safeCardId];
  };

  return (
    <div className="process-page-container">
      {/* First Section: Process Introduction */}
      <section
        id="section-process"
        ref={headerRef}
        className="section-fullscreen snap-section min-h-screen flex items-center"
      >
        <BackgroundAnimation withBlur={true} />

        <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Logo Section - Left Side (4 columns) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                headerInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
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

            {/* Content Section - Right Side (8 columns) */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              className="md:col-span-8 flex flex-col"
            >
              {/* "Our Process" label positioned at the top of the content column */}
              <motion.div
                className="flex items-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
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

      {/* Second Section: Process Cards */}
      <section
        id="section-process-steps"
        ref={stepsRef}
        className="section-fullscreen snap-section gradient-bg relative"
      >
        <BackgroundAnimation />

        <div className="w-full h-full flex items-center justify-center">
          <div className="text-2xl absolute left-6 top-1/2 transform -translate-y-1/2">
            {processCardStep >= 1 && <div className="mb-20">01.</div>}
            {processCardStep >= 2 && <div className="mb-20">02.</div>}
            {processCardStep >= 3 && <div>03.</div>}
          </div>

          <div className="relative h-96 w-64">
            {processCards.map((card) => (
              <motion.div
                key={card.step}
                className="absolute w-64 h-64 backdrop-blur-md rounded-xl flex flex-col justify-center items-center text-center p-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10px)",
                  zIndex: card.step,
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
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-sm">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Section: All in Weeks */}
      <section
        id="section-all-in-weeks"
        ref={weeksRef}
        className="section-fullscreen snap-section gradient-bg"
      >
        <div className="w-full h-full flex items-center justify-center">
          <motion.h2
            className="text-5xl md:text-7xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              weeksInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8 }}
          >
            All in <span className="text-accent-green">Weeks!</span>
          </motion.h2>
        </div>
      </section>
    </div>
  );
}
