"use client";

import { motion } from "framer-motion";

interface ProcessStepsSectionProps {
  currentSection: string;
  processCardStep: number;
  showFinalHeading: boolean;
}

interface ProcessCardData {
  title: string;
  description: string;
  step: 1 | 2 | 3;
}

// TypeScript needs these explicit types for indexing
type StepIndex = 0 | 1 | 2 | 3 | 4;
type CardIndex = 1 | 2 | 3;
type StepMap = Record<StepIndex, Record<CardIndex, number>>;

export default function ProcessStepsSection({
  currentSection,
  processCardStep,
  showFinalHeading,
}: ProcessStepsSectionProps) {
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

  // Get rotation angle for each card based on the current step (exactly matching Figma specs)
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
      0: { 1: 100, 2: 100, 3: 100 }, // Initial state (off-screen)
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
      3: { 1: 0.3, 2: 0.7, 3: 1 }, // Third card appears
      4: { 1: 0.2, 2: 0.5, 3: 0.8 }, // All cards shift up
    };

    // Ensure we have valid indexes by using type assertions
    const safeStep = Math.min(4, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;

    return opacityMap[safeStep][safeCardId];
  };

  const isStepsActive = currentSection === "steps";
  const isWeeksActive = currentSection === "weeks";

  return (
    <div
      className="section-content absolute inset-0 top-screen h-screen flex items-center justify-center"
      style={{
        opacity: isStepsActive || isWeeksActive ? 1 : 0.3,
        transition: "opacity 0.5s ease",
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Step indicators on the left */}
        <div
          className="absolute left-16 md:left-24 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl font-bold"
          style={{ opacity: isStepsActive ? 1 : 0.3 }}
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

        {/* Center cards - Implementing exact Figma specs */}
        <div
          className="relative h-96 w-full max-w-xl flex items-center justify-center"
          style={{ opacity: isStepsActive ? 1 : 0.3 }}
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
                  border: "1.5px solid",
                  borderImageSource:
                    "linear-gradient(180deg, rgba(245, 245, 247, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%)",
                  backdropFilter: "blur(100px)",
                  boxShadow: "0px 0px 20px 0px rgba(255, 255, 255, 0.4) inset",
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
  );
}
