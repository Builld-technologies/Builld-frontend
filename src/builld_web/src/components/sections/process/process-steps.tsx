"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProcessCard from "../../ui/process-card";

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

interface ProcessStepsProps {
  inView: boolean;
}

export default function ProcessSteps({ inView }: ProcessStepsProps) {
  const [processCardStep, setProcessCardStep] = useState(0);
  const [showFinalHeading, setShowFinalHeading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle card animations based on scroll and visibility
  useEffect(() => {
    if (inView) {
      // Start animation sequence only if we're at the beginning
      if (processCardStep === 0) {
        // Animation sequence timing
        const step1 = setTimeout(() => setProcessCardStep(1), 300);
        const step2 = setTimeout(() => setProcessCardStep(2), 1300);
        const step3 = setTimeout(() => setProcessCardStep(3), 2300);
        // Move cards up to make room for final heading
        const step4 = setTimeout(() => {
          setProcessCardStep(4);
          // Final text reveal with proper delay
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
      if (processCardStep > 0) {
        setProcessCardStep(0);
        setShowFinalHeading(false);
      }
    }
  }, [inView, processCardStep]);

  // Animation maps exactly matching the images
  const rotationMap: AnimationMap = {
    0: { 1: -15, 2: -30, 3: -45 }, // Initial state (stacked cards)
    1: { 1: 0, 2: -15, 3: -30 }, // First card appears (focus)
    2: { 1: -15, 2: 0, 3: -15 }, // Second card appears (focus)
    3: { 1: -30, 2: -15, 3: 0 }, // Third card appears (focus)
    4: { 1: -45, 2: -30, 3: -15 }, // Cards shift up
    5: { 1: -55, 2: -40, 3: -25 }, // Final positions with more shift up
  };

  const yPositionMap: AnimationMap = {
    0: { 1: 100, 2: 100, 3: 100 }, // Initial state (all cards off-screen)
    1: { 1: 0, 2: 30, 3: 60 }, // First card appears
    2: { 1: -30, 2: 0, 3: 30 }, // Second card appears
    3: { 1: -60, 2: -30, 3: 0 }, // Third card appears
    4: { 1: -100, 2: -70, 3: -40 }, // Cards shift up for final heading
    5: { 1: -140, 2: -110, 3: -80 }, // Cards shift up more for final text
  };

  const opacityMap: AnimationMap = {
    0: { 1: 0.8, 2: 0.5, 3: 0.2 }, // Initial state
    1: { 1: 1, 2: 0.7, 3: 0.3 }, // First card appears
    2: { 1: 0.7, 2: 1, 3: 0.7 }, // Second card appears
    3: { 1: 0.3, 2: 0.7, 3: 1 }, // Third card appears
    4: { 1: 0.2, 2: 0.5, 3: 0.8 }, // All cards shift up
    5: { 1: 0.1, 2: 0.3, 3: 0.6 }, // Cards fade for final heading
  };

  // Helper functions
  const getRotation = (cardId: number, currentStep: number): number => {
    const safeStep = Math.min(5, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;
    return rotationMap[safeStep][safeCardId];
  };

  const getYPosition = (cardId: number, currentStep: number): number => {
    const safeStep = Math.min(5, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;
    return yPositionMap[safeStep][safeCardId];
  };

  const getOpacity = (cardId: number, currentStep: number): number => {
    const safeStep = Math.min(5, Math.max(0, currentStep)) as StepIndex;
    const safeCardId = Math.min(3, Math.max(1, cardId)) as CardIndex;
    return opacityMap[safeStep][safeCardId];
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center relative py-24 overflow-y-auto"
      style={{
        height: "300vh",
      }}
    >
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
          <ProcessCard
            key={card.step}
            title={card.title}
            description={card.description}
            step={card.step}
            rotation={getRotation(card.step, processCardStep)}
            yPosition={getYPosition(card.step, processCardStep)}
            opacity={getOpacity(card.step, processCardStep)}
          />
        ))}
      </div>

      {/* Final "All in Weeks" heading */}
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
  );
}
