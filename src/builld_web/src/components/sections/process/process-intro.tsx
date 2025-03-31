"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ProcessIntro() {
  return (
    <div className="max-w-7xl z-10 w-full px-6 md:px-10 mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        {/* Logo Section - Left Side */}
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

        {/* Content Section - Right Side */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="md:col-span-8 flex flex-col"
        >
          <motion.div
            className="flex items-center mb-16"
            variants={fadeUpVariant}
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
  );
}
