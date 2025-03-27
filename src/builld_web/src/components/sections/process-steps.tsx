"use client";

import { motion } from "framer-motion";
import { useScroll } from "@/context/scroll-context";
import BackgroundAnimation from "@/components/ui/background-animation";

interface ProcessCardData {
  title: string;
  description: string;
  step: 1 | 2 | 3;
}

// TypeScript needs these explicit types for indexing
type StepIndex = 0 | 1 | 2 | 3 | 4;
type CardIndex = 1 | 2 | 3;
type StepMap = Record<StepIndex, Record<CardIndex, number>>;

export default function ProcessSteps() {
  const { processCardStep } = useScroll();

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
    <section
      id="section-process-steps"
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
  );
}
