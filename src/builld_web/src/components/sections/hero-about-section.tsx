"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useScroll } from "../../context/scroll-context";
import BackgroundAnimation from "../ui/background-animation";

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HeroAndAboutSections() {
  const { setActiveSection } = useScroll();

  // Hero section in-view tracking with options optimized for section detection
  const [heroRef, heroInView] = useInView({
    threshold: 0.6, // Higher threshold to ensure more precision
    triggerOnce: false,
  });

  // About section in-view tracking
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.6, // Higher threshold to ensure more precision
    triggerOnce: false,
  });

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) {
      setActiveSection("hero");
    } else if (aboutInView) {
      setActiveSection("about");
    }
  }, [heroInView, aboutInView, setActiveSection]);

  return (
    <>
      {/* Hero Section - ID matches ScrollContext expected format */}
      <section
        id="section-hero"
        ref={heroRef}
        className="section-fullscreen snap-section gradient-bg flex items-center justify-center"
      >
        <BackgroundAnimation />

        <div className="max-w-7xl w-full px-6 md:px-10 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Main headline */}
            <motion.div
              className="mb-10"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerChildren}
            >
              {/* Build Launch */}
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                variants={staggerChildren}
              >
                <motion.div className="flex items-center justify-center gap-4 md:gap-5">
                  <motion.span variants={fadeUpVariant}>Build</motion.span>

                  {/* L image with improved spacing */}
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
                    <div
                      className="w-20 h-20 flex items-center justify-center rounded-[26.67px]"
                      style={{
                        padding: "13.33px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(66.67px)",
                      }}
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <Image
                          src="/images/L.png"
                          alt="Logo"
                          width={42}
                          height={42}
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.span variants={fadeUpVariant} custom={1}>
                    Launch
                  </motion.span>
                </motion.div>

                {/* In Weeks Not Months */}
                <motion.div
                  className="mt-4 flex flex-wrap items-center justify-center"
                  variants={staggerChildren}
                >
                  <motion.span
                    className="text-[#b0ff00]"
                    variants={fadeUpVariant}
                    custom={2}
                  >
                    in Weeks
                  </motion.span>
                  <motion.span
                    className="ml-4 text-gray-300"
                    variants={fadeUpVariant}
                    custom={3}
                  >
                    <span className="line-through opacity-60">Not Months</span>
                  </motion.span>
                </motion.div>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-6"
                variants={fadeUpVariant}
                custom={4}
              >
                High-quality websites and digital products,
                <br />
                delivered on time, every time.
              </motion.p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              custom={5}
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
                  <FaArrowRight className="h-5 w-5 text-black" />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - ID matches ScrollContext expected format */}
      <section
        id="section-about"
        ref={aboutRef}
        className="relative section-fullscreen snap-section min-h-screen w-full overflow-hidden"
      >
        {/* Background Animation */}
        <BackgroundAnimation withBlur={true} />

        <div className="max-w-7xl w-full px-6 md:px-16 mx-auto relative z-10 flex items-center h-full py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-20">
            {/* Logo Section - Left Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                aboutInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div
                className="w-60 h-60 flex items-center justify-center rounded-[80px] transform -rotate-45"
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
              animate={aboutInView ? "visible" : "hidden"}
              className="flex flex-col items-start max-w-3xl"
            >
              <motion.div
                className="text-sm mb-10 opacity-70"
                variants={fadeUpVariant}
              >
                <div className="flex items-center justify-center">
                  <div className="w-8 h-px bg-white mr-2"></div>
                  About us
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight tracking-wide"
                variants={fadeUpVariant}
              >
                Transform Ideas
                <br />
                into Digital Solutions
              </motion.h2>

              <motion.p
                className="text-base md:text-lg max-w-2xl text-gray-200 opacity-90 leading-relaxed"
                variants={fadeUpVariant}
              >
                We&apos;re your tech partner, turning ideas into functional
                digital solutions with speed and precision. We deliver scalable
                results that fuel your growth in weeks, not months.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
