"use client";

import { motion } from "framer-motion";
import {
  fadeUpVariant,
  staggerChildren,
} from "@/animations/section-animations";
import BackgroundAnimation from "../ui/background-animation";

export default function HeroSection() {
  return (
    <section
      id="section-home"
      className="section-fullscreen snap-section gradient-bg"
    >
      <BackgroundAnimation />

      <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10 flex items-center justify-center">
        <motion.div
          className="text-center md:text-left"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={fadeUpVariant}
          >
            Fast-Track{" "}
            <motion.span layout className="text-accent-green inline-block">
              Your Ideas
            </motion.span>
            <br />
            into{" "}
            <motion.span layout className="text-accent-green inline-block">
              Reality
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mb-10"
            variants={fadeUpVariant}
          >
            High-quality websites and digital products,
            <br />
            delivered in weeks —{" "}
            <span className="line-through">not months</span>.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            className="flex justify-center md:justify-start"
          >
            <motion.button
              className="bg-transparent border border-white rounded-full px-8 py-3 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let&apos;s builld</span>
              <span className="bg-accent-green rounded-full p-1 ml-2">
                {/* TODO: place svg image */}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
