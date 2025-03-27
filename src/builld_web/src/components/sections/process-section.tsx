"use client";

import { motion } from "framer-motion";
import {
  fadeUpVariant,
  staggerChildren,
} from "@/animations/section-animations";
import { useInView } from "react-intersection-observer";
import BackgroundAnimation from "../ui/background-animation";

export default function ProcessSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section
      id="section-process"
      ref={ref}
      className="section-fullscreen snap-section gradient-bg"
    >
      <BackgroundAnimation />

      <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10 flex flex-col justify-center">
        <motion.span
          className="text-sm mb-6 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Our Process
        </motion.span>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="flex items-start md:items-center mb-12">
            <motion.div
              className="bg-gradient-middle/40 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
              variants={fadeUpVariant}
            >
              {/* TODO: place svg image */}
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={fadeUpVariant}
          >
            From Concept to Launch
            <br />— The <span className="text-accent-green">Builld</span> Way
          </motion.h2>

          <motion.p className="text-lg max-w-2xl" variants={fadeUpVariant}>
            Explore our clear, three-phase process that ensures efficient
            project delivery without compromising quality.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
