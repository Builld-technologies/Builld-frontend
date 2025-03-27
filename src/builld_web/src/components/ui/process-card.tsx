"use client";

import { motion } from "framer-motion";
import { getProcessCardVariants } from "@/animations/process-cards-animation";

interface ProcessCardProps {
  title: string;
  description: string;
  step: 1 | 2 | 3;
  index: number;
  currentStep: number;
}

export default function ProcessCard({
  title,
  description,
  step,
  currentStep,
}: ProcessCardProps) {
  const variants = getProcessCardVariants(currentStep, step);

  return (
    <motion.div
      className="absolute w-64 h-64 bg-black/20 backdrop-blur-md rounded-xl flex flex-col justify-center items-center text-center p-6"
      variants={variants}
      initial="initial"
      animate="animate"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: "-8rem",
        marginTop: "-8rem",
      }}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
