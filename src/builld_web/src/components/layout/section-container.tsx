"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgColor?: "gradient" | "blue";
  fullWidth?: boolean;
}

export default function SectionContainer({
  id,
  children,
  className = "",
  bgColor = "gradient",
  fullWidth = false,
}: SectionContainerProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const baseClasses =
    "h-screen w-full flex flex-col items-center justify-center section-fullscreen snap-section relative overflow-hidden";
  const bgClasses = bgColor === "blue" ? "bg-accent-blue" : "gradient-bg";

  return (
    <section
      id={`section-${id}`}
      ref={ref}
      className={`${baseClasses} ${bgClasses} ${className}`}
    >
      <div
        className={`${
          fullWidth ? "w-full h-full" : "max-w-7xl w-full px-6 md:px-10"
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
