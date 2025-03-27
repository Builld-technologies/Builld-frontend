"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gradientBg from "@public/animations/gradient-background.json";

interface BackgroundAnimationProps {
  animationData?: object;
  color?: "gradient" | "blue";
}

export default function BackgroundAnimation({
  animationData = gradientBg,
  color = "gradient",
}: BackgroundAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // if animation data is provided, use Lottie
  if (animationData) {
    return (
      <motion.div
        className="absolute inset-0 z-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
        />
      </motion.div>
    );
  }

  // if no animation data, fall back to CSS gradient
  return (
    <motion.div
      className={`absolute inset-0 z-0 w-full h-full ${
        color === "blue" ? "bg-accent-blue" : "gradient-bg"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
