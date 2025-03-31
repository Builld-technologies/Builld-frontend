"use client";

import { motion } from "framer-motion";

interface ProcessCardProps {
  title: string;
  description: string;
  step: number;
  rotation: number;
  yPosition: number;
  opacity: number;
}

export default function ProcessCard({
  title,
  description,
  step,
  rotation,
  yPosition,
  opacity,
}: ProcessCardProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: "432px",
        height: "423px",
        zIndex: 10 - step,
      }}
      initial={{
        y: 100,
        opacity: 0.2,
        rotate: -45,
        x: 0,
      }}
      animate={{
        y: yPosition,
        opacity: opacity,
        rotate: rotation,
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
          boxShadow: "0px 0px 20px 0px rgba(255, 255, 255, 0.4) inset",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-6">{title}</h3>
        <p className="text-base md:text-lg text-white/80">{description}</p>
      </div>
    </motion.div>
  );
}
