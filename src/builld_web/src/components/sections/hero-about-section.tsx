"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useScroll } from "../../context/scroll-context";
import BackgroundAnimation from "../ui/background-animation";

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

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

  // Get responsive logo size
  const getLogoSize = () => {
    if (windowWidth < 640) {
      return { width: 32, height: 32 };
    } else if (windowWidth < 768) {
      return { width: 36, height: 36 };
    } else if (windowWidth < 1024) {
      return { width: 40, height: 40 };
    } else {
      return { width: 42, height: 42 };
    }
  };

  // Get about logo size
  const getAboutLogoSize = () => {
    if (windowWidth < 640) {
      return {
        containerSize: "w-40 h-40",
        logoSize: { width: 80, height: 80 },
        roundedSize: "rounded-[50px]",
      };
    } else if (windowWidth < 768) {
      return {
        containerSize: "w-48 h-48",
        logoSize: { width: 100, height: 100 },
        roundedSize: "rounded-[60px]",
      };
    } else if (windowWidth < 1024) {
      return {
        containerSize: "w-56 h-56",
        logoSize: { width: 110, height: 110 },
        roundedSize: "rounded-[70px]",
      };
    } else {
      return {
        containerSize: "w-60 h-60",
        logoSize: { width: 120, height: 120 },
        roundedSize: "rounded-[80px]",
      };
    }
  };

  const logoSize = getLogoSize();
  const aboutLogoSize = getAboutLogoSize();

  return (
    <>
      {/* Hero Section - ID matches ScrollContext expected format */}
      <section
        id="section-hero"
        ref={heroRef}
        className="section-fullscreen snap-section gradient-bg flex items-center justify-center"
      >
        <BackgroundAnimation />

        <div className="max-w-7xl w-full px-4 sm:px-6 md:px-10 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Main headline */}
            <motion.div
              className="mb-6 sm:mb-8 md:mb-10"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerChildren}
            >
              {/* Build Launch */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
                variants={staggerChildren}
              >
                <motion.div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
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
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-[16px] sm:rounded-[20px] md:rounded-[26.67px]"
                      style={{
                        padding: "8px sm:10px md:13.33px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(66.67px)",
                      }}
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <Image
                          src="/images/L.png"
                          alt="Logo"
                          width={logoSize.width}
                          height={logoSize.height}
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
                  className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap items-center justify-center"
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
                    className="ml-2 sm:ml-3 md:ml-4 text-gray-300"
                    variants={fadeUpVariant}
                    custom={3}
                  >
                    <span className="line-through opacity-60">Not Months</span>
                  </motion.span>
                </motion.div>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 sm:mt-5 md:mt-6"
                variants={fadeUpVariant}
                custom={4}
              >
                High-quality websites and digital products,
                {windowWidth >= 640 && <br />}
                {windowWidth < 640 && " "}
                delivered on time, every time.
              </motion.p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              custom={5}
              className="mt-4 sm:mt-5 md:mt-6"
            >
              <motion.button
                className="relative bg-transparent border-2 border-[#b0ff00] rounded-full px-6 sm:px-7 md:px-9 py-2.5 sm:py-3 md:py-3.5 flex items-center group overflow-hidden hover:bg-[#b0ff00]/10 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-white text-base sm:text-lg font-medium">
                  Let&apos;s build
                </span>
                <div className="bg-[#b0ff00] rounded-full p-1.5 sm:p-2 ml-2 sm:ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
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

        <div className="max-w-7xl w-full px-4 sm:px-6 md:px-10 lg:px-16 mx-auto relative z-10 flex items-center h-full py-10 sm:py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
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
                className={`${aboutLogoSize.containerSize} flex items-center justify-center ${aboutLogoSize.roundedSize} transform -rotate-45`}
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
                    width={aboutLogoSize.logoSize.width}
                    height={aboutLogoSize.logoSize.height}
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
                className="text-xs sm:text-sm mb-6 sm:mb-8 md:mb-10 opacity-70"
                variants={fadeUpVariant}
              >
                <div className="flex items-center justify-center">
                  <div className="w-6 sm:w-8 h-px bg-white mr-2"></div>
                  About us
                </div>
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight tracking-wide"
                variants={fadeUpVariant}
              >
                Transform Ideas
                <br />
                into Digital Solutions
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base md:text-lg max-w-2xl text-gray-200 opacity-90 leading-relaxed"
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
