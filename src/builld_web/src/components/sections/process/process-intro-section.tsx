"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeUpVariant,
  staggerChildren,
} from "@/animations/section-animations";

interface ProcessIntroSectionProps {
  isActive: boolean;
}

export default function ProcessIntroSection({
  isActive,
}: ProcessIntroSectionProps) {
  return (
    <div
      className="section-content absolute inset-0 h-screen flex items-center"
      style={{
        opacity: isActive ? 1 : 0.3,
        transition: "opacity 0.5s ease",
      }}
    >
      <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Logo Section - Left Side (4 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 flex justify-center md:justify-start"
          >
            <div
              className="w-52 h-52 md:w-60 md:h-60 flex items-center justify-center rounded-[80px] transform -rotate-90"
              style={{
                padding: "40px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(200px)",
              }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src="/images/L.png"
                  alt="Company Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          </motion.div>

          {/* Content Section - Right Side (8 columns) */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="md:col-span-8 flex flex-col"
          >
            {/* "Our Process" label positioned at the top of the content column */}
            <motion.div
              className="flex items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-px bg-white/70 mr-2"></div>
              <span className="text-sm text-white/70">Our Process</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight tracking-tight"
              variants={fadeUpVariant}
            >
              From Concept to Launch
              <br />— The <span className="text-[#b0ff00]">Builld</span> Way
            </motion.h2>

            <motion.p
              className="text-base md:text-lg max-w-2xl text-gray-200 opacity-90 leading-relaxed"
              variants={fadeUpVariant}
            >
              Explore our clear, three-phase process that ensures efficient
              project delivery without compromising quality.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
