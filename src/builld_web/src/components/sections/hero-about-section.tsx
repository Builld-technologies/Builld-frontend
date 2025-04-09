"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useScroll } from "../../context/scroll-context";
import BackgroundAnimation from "../ui/background-animation";

// Animation speed constants
const ANIMATION_DURATION = 0.4;
const STAGGER_DELAY = 0.1;

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_DURATION, delay },
  }),
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_DELAY } },
};

// Custom hook to track window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default function HeroAndAboutSections() {
  const { setActiveSection } = useScroll();
  const windowWidth = useWindowWidth();

  // Intersection observers for section tracking
  const [heroRef, heroInView] = useInView({ threshold: 0.6 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.6 });

  // Update active section based on current in-view element
  useEffect(() => {
    if (heroInView) {
      setActiveSection("hero");
    } else if (aboutInView) {
      setActiveSection("about");
    }
  }, [heroInView, aboutInView, setActiveSection]);

  // Memoized logo sizes based on window width
  const logoSize = useMemo(() => {
    if (windowWidth < 640) return { width: 32, height: 32 };
    if (windowWidth < 768) return { width: 36, height: 36 };
    if (windowWidth < 1024) return { width: 40, height: 40 };
    return { width: 42, height: 42 };
  }, [windowWidth]);

  const aboutLogoSize = useMemo(() => {
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
  }, [windowWidth]);

  return (
    <>
      {/* Hero Section */}
      <section
        id="section-hero"
        ref={heroRef}
        className="section-fullscreen snap-section gradient-bg flex items-center justify-center relative"
      >
        <BackgroundAnimation />
        <div className="max-w-7xl w-full px-4 sm:px-6 md:px-10 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="mb-6 sm:mb-8 md:mb-10"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerChildren}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
                variants={staggerChildren}
              >
                <motion.div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                  <motion.span variants={fadeUpVariant}>Build</motion.span>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: ANIMATION_DURATION },
                      },
                    }}
                    className="relative inline-flex"
                  >
                    <div
                      className="flex items-center justify-center rounded-md"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        padding: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(66.67px)",
                      }}
                    >
                      <Image
                        src="/images/L.png"
                        alt="Logo"
                        width={logoSize.width}
                        height={logoSize.height}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                  <motion.span variants={fadeUpVariant}>Launch</motion.span>
                </motion.div>
                <motion.div
                  className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap items-center justify-center"
                  variants={staggerChildren}
                >
                  <motion.span
                    className="text-[#b0ff00]"
                    variants={fadeUpVariant}
                  >
                    in Weeks
                  </motion.span>
                  <motion.span
                    className="ml-2 sm:ml-3 md:ml-4 text-gray-300"
                    variants={fadeUpVariant}
                  >
                    <span className="line-through opacity-60">Not Months</span>
                  </motion.span>
                </motion.div>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 sm:mt-5 md:mt-6"
                variants={fadeUpVariant}
              >
                High-quality websites and digital products,
                {windowWidth >= 640 && <br />}
                {windowWidth < 640 && " "}
                delivered on time, every time.
              </motion.p>
            </motion.div>
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
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

      {/* About Section */}
      <section
        id="section-about"
        ref={aboutRef}
        className="relative section-fullscreen snap-section min-h-screen w-full overflow-hidden"
      >
        <BackgroundAnimation withBlur={true} />
        <div className="max-w-7xl w-full px-4 sm:px-6 md:px-10 lg:px-16 mx-auto relative z-10 flex items-center h-full py-10 sm:py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                aboutInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: ANIMATION_DURATION }}
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
                <Image
                  src="/images/L.png"
                  alt="Company Logo"
                  width={aboutLogoSize.logoSize.width}
                  height={aboutLogoSize.logoSize.height}
                  className="object-contain"
                  quality={100}
                />
              </div>
            </motion.div>
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
