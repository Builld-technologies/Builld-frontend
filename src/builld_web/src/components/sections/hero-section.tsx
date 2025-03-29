"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BackgroundAnimation from "../ui/background-animation";

export default function HeroSection() {
  return (
    <section
      id="section-home"
      className="section-fullscreen snap-section gradient-bg flex items-center justify-center"
    >
      <BackgroundAnimation />

      <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Main headline */}
          <motion.div
            className="mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* Build Launch */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <motion.div className="flex items-center justify-center gap-4 md:gap-5">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7 },
                    },
                  }}
                >
                  Build
                </motion.span>

                {/* L image with proper spacing and dimensions */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.7 },
                    },
                  }}
                  className="relative inline-flex"
                >
                  <div className="bg-[#171723] rounded-2xl w-[70px] h-[70px] md:w-[85px] md:h-[85px] flex items-center justify-center">
                    <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
                      <Image
                        src="/images/L.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, delay: 0.1 },
                    },
                  }}
                >
                  Launch
                </motion.span>
              </motion.div>

              {/* In Weeks Not Months */}
              <motion.div className="mt-4 flex flex-wrap items-center justify-center">
                <motion.span
                  className="text-[#b0ff00]"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, delay: 0.2 },
                    },
                  }}
                >
                  in Weeks
                </motion.span>
                <motion.span
                  className="ml-4 text-gray-300"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, delay: 0.3 },
                    },
                  }}
                >
                  <span className="line-through opacity-60">Not Months</span>
                </motion.span>
              </motion.div>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.4 },
                },
              }}
            >
              High-quality websites and digital products,
              <br />
              delivered on time, every time.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6"
          >
            <motion.button
              className="relative bg-transparent border-2 border-[#b0ff00] rounded-full px-9 py-3.5 flex items-center group overflow-hidden hover:bg-[#b0ff00]/10 transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-white text-lg font-medium">
                Let&apos;s build
              </span>
              <div className="bg-[#b0ff00] rounded-full p-2 ml-3 transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L16.586 11H5a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
