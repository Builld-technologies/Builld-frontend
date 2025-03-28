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
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Build & Launch
            </motion.span>{" "}
            <br />
            <motion.span
              layout
              className="text-accent-green inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              in Weeks
            </motion.span>{" "}
            <motion.span
              layout
              className="inline-block text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Not Months
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mb-10"
            variants={fadeUpVariant}
          >
            High-quality websites and digital products,
            <br />
            delivered on time, every time.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col items-center md:items-start"
          >
            <motion.button
              className="relative group bg-transparent border border-accent-green rounded-full px-8 py-3 flex items-center space-x-2 cursor-pointer transition duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-white">Let&apos;s Build</span>

              <span className="relative z-10 bg-accent-green rounded-full p-2 ml-2 transition-transform group-hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L16.586 11H5a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </motion.button>

            {/* Small tagline under CTA */}
            {/* <motion.p
              className="mt-4 text-sm text-gray-300 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Get started with a free consultation.
            </motion.p> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
