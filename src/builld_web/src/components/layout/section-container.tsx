"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgColor?: "gradient" | "blue" | "dark" | "transparent";
  fullWidth?: boolean;
  minHeight?: "screen" | "auto" | string;
  padding?: string;
  viewThreshold?: number;
}

export default function SectionContainer({
  id,
  children,
  className = "",
  bgColor = "gradient",
  fullWidth = false,
  minHeight = "screen",
  padding = "px-6 py-16 md:px-10",
  viewThreshold = 0.1,
}: SectionContainerProps) {
  const [ref, inView] = useInView({
    threshold: viewThreshold,
    triggerOnce: false,
  });

  const [height, setHeight] = useState<string>("h-screen");

  useEffect(() => {
    // Handle responsive height settings
    if (minHeight === "screen") {
      setHeight("min-h-screen");
    } else if (minHeight === "auto") {
      setHeight("min-h-0");
    } else {
      setHeight(`min-h-[${minHeight}]`);
    }
  }, [minHeight]);

  // Generate background classes
  const getBgClass = () => {
    switch (bgColor) {
      case "blue":
        return "bg-accent-blue";
      case "dark":
        return "bg-zinc-900";
      case "transparent":
        return "bg-transparent";
      case "gradient":
      default:
        return "gradient-bg";
    }
  };

  const baseClasses = `${height} w-full flex flex-col items-center justify-center section-fullscreen snap-section relative overflow-hidden ${padding}`;
  const bgClasses = getBgClass();

  return (
    <section
      id={`section-${id}`}
      ref={ref}
      className={`${baseClasses} ${bgClasses} ${className}`}
    >
      <div
        className={`${
          fullWidth ? "w-full h-full" : "max-w-7xl w-full"
        } relative z-10`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
