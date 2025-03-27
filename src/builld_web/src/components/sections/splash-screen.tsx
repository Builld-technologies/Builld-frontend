"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 100 / steps;

      if (currentProgress >= 100) {
        clearInterval(timer);
        currentProgress = 100;
        hasCompleted.current = true;
      }

      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="section-splash"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative"
    >
      <motion.div
        className="relative z-10 flex items-center justify-center h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-white text-6xl md:text-8xl font-bold">
          bui<span className="text-accent-green">l</span>d.
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 flex items-center px-6">
        <div className="h-px w-full bg-gray-800 relative">
          {/* progress dot */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-green"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="text-white text-sm ml-2 min-w-[40px]">
          {Math.round(progress)}%
        </div>
      </div>
    </section>
  );
}
