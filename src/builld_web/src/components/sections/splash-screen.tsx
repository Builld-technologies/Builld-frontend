"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const milestones = [0, 25, 50, 75, 100];

  // Progress animation
  useEffect(() => {
    if (currentMilestone >= milestones.length - 1) return;

    const current = milestones[currentMilestone];
    const next = milestones[currentMilestone + 1];
    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setProgress(current + (next - current) * progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentMilestone((prev) => prev + 1);
      }
    };

    const timer = setTimeout(
      () => requestAnimationFrame(animate),
      currentMilestone === 0 ? 500 : 300
    );

    return () => clearTimeout(timer);
  }, [currentMilestone, milestones]);

  // Handle completion
  useEffect(() => {
    if (currentMilestone === milestones.length - 1) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }, 500);
    }
  }, [currentMilestone, milestones.length, onComplete]);

  // Get responsive logo size
  const getLogoSize = () => {
    if (windowWidth < 640) {
      return { width: 160, height: 40 };
    } else if (windowWidth < 768) {
      return { width: 200, height: 50 };
    } else if (windowWidth < 1024) {
      return { width: 220, height: 55 };
    } else {
      return { width: 240, height: 60 };
    }
  };

  const logoSize = getLogoSize();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ y: 0 }}
      animate={{ y: isExiting ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/logo.png"
          alt="Build Logo"
          width={logoSize.width}
          height={logoSize.height}
          priority
          className="w-auto h-auto"
        />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 px-6 sm:px-8 md:px-12 w-full">
        <div className="h-1 sm:h-1.5 w-full rounded bg-[#1a1a1a] relative">
          <motion.div
            className="h-full rounded bg-[#b0ff00]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="absolute right-6 sm:right-8 md:right-12 top-[-24px] sm:top-[-26px] md:top-[-30px]">
          <motion.div
            key={milestones[currentMilestone]}
            className="text-white text-base sm:text-lg md:text-xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {milestones[currentMilestone]}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
