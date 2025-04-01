"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

// Process card data
interface ProcessCardData {
  title: string;
  description: string;
  id: number;
}

const processCards: ProcessCardData[] = [
  {
    title: "Pre-Project",
    description: "Planning, onboarding, and defining the scope.",
    id: 1,
  },
  {
    title: "During Project",
    description:
      "Design sprints, prototype reviews, and iterative development.",
    id: 2,
  },
  {
    title: "Close & Post-Project",
    description: "Deployment, client handover, and optional support.",
    id: 3,
  },
];

// ADJUSTMENT AREA: Modify these values to adjust card positioning
// ===================================================================
const CARD_CONFIG = {
  // Active card position (centered)
  ACTIVE: {
    y: 0,
    x: 0,
    rotate: 0,
    opacity: 1,
    zIndex: 30,
    scale: 1,
  },

  // BASE displacement values - First level displacement (when card becomes inactive)
  // These values will be doubled for second level displacement
  BASE_DISPLACEMENT: {
    // Desktop base values (≥ 1024px)
    DESKTOP: {
      y: -500,
      x: 60,
      rotate: 15,
      opacity: 0.7,
      scale: 0.97,
    },

    // Tablet base values (768px - 1023px)
    TABLET: {
      y: -400,
      x: 45,
      rotate: 15,
      opacity: 0.7,
      scale: 0.95,
    },

    // Mobile base values (< 768px)
    MOBILE: {
      y: -300,
      x: 30,
      rotate: 15,
      opacity: 0.7,
      scale: 0.9,
    },
  },

  // Multiplier for second level displacement
  MULTIPLIER: 2,

  // Cards behind active card
  BEHIND: {
    offsetY: 15,
    offsetX: 10,
    rotate: -8,
    opacity: 0.3,
  },

  // Card sizing for different screens
  CARD_SIZES: {
    DESKTOP: {
      width: "432px",
      height: "423px",
      padding: "91px 48px",
    },
    TABLET: {
      width: "360px",
      height: "350px",
      padding: "60px 36px",
    },
    MOBILE: {
      width: "290px",
      height: "280px",
      padding: "40px 24px",
    },
  },
};
// ===================================================================

export default function ProcessSteps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const prevInViewRef = useRef(isInView);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Get appropriate base displacement config based on screen size
  const getBaseDisplacement = () => {
    const { DESKTOP, TABLET, MOBILE } = CARD_CONFIG.BASE_DISPLACEMENT;

    if (windowWidth < 768) {
      return MOBILE;
    } else if (windowWidth < 1024) {
      return TABLET;
    } else {
      return DESKTOP;
    }
  };

  // Get first level displacement
  const getFirstLevelDisplacement = () => {
    const baseDisplacement = getBaseDisplacement();
    return {
      ...baseDisplacement,
      zIndex: 40,
    };
  };

  // Get second level displacement (multiply base by MULTIPLIER)
  const getSecondLevelDisplacement = () => {
    const baseDisplacement = getBaseDisplacement();
    const { MULTIPLIER } = CARD_CONFIG;

    return {
      y: baseDisplacement.y * MULTIPLIER,
      x: baseDisplacement.x * MULTIPLIER,
      rotate: baseDisplacement.rotate * MULTIPLIER,
      opacity: Math.max(0.1, baseDisplacement.opacity - 0.2),
      zIndex: 50,
      scale: Math.max(0.8, baseDisplacement.scale - 0.05),
    };
  };

  // Get responsive card sizing
  const getCardSizing = () => {
    const { DESKTOP, TABLET, MOBILE } = CARD_CONFIG.CARD_SIZES;

    if (windowWidth < 768) {
      return MOBILE;
    } else if (windowWidth < 1024) {
      return TABLET;
    } else {
      return DESKTOP;
    }
  };

  // Reset state when scrolling in and out of view
  useEffect(() => {
    // When element comes into view
    if (isInView && !prevInViewRef.current) {
      setActiveIndex(0);
      setShowFinalMessage(false);

      // Start animation sequence after a brief delay
      const timer = setTimeout(() => setActiveIndex(1), 400);
      return () => clearTimeout(timer);
    }

    // When element goes out of view
    if (!isInView && prevInViewRef.current) {
      setActiveIndex(0);
      setShowFinalMessage(false);
    }

    // Update previous inView state
    prevInViewRef.current = isInView;
  }, [isInView]);

  // Show final message when reaching the final state
  useEffect(() => {
    if (activeIndex === 3) {
      const timer = setTimeout(() => setShowFinalMessage(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShowFinalMessage(false);
    }
  }, [activeIndex]);

  // Get card styles based on active index and card position
  const getCardStyles = (cardIndex: number) => {
    const { ACTIVE, BEHIND } = CARD_CONFIG;
    const firstLevel = getFirstLevelDisplacement();
    const secondLevel = getSecondLevelDisplacement();

    // Initial state - cards stacked
    if (activeIndex === 0) {
      return {
        y: 0,
        x: 0,
        opacity: 1 - cardIndex * 0.2,
        rotate: cardIndex * -8,
        zIndex: 30 - cardIndex * 10,
        scale: 1,
      };
    }

    // First step - first card is active
    if (activeIndex === 1) {
      if (cardIndex === 0) {
        return { ...ACTIVE };
      }
      if (cardIndex === 1) {
        return {
          y: BEHIND.offsetY,
          x: BEHIND.offsetX,
          rotate: BEHIND.rotate,
          opacity: 1 - BEHIND.opacity,
          zIndex: ACTIVE.zIndex - 10,
          scale: 1,
        };
      }
      if (cardIndex === 2) {
        return {
          y: BEHIND.offsetY * 2,
          x: BEHIND.offsetX * 2,
          rotate: BEHIND.rotate * 2,
          opacity: 1 - BEHIND.opacity * 2,
          zIndex: ACTIVE.zIndex - 20,
          scale: 1,
        };
      }
    }

    // Second step - second card is active, first card is displaced
    if (activeIndex === 2) {
      if (cardIndex === 0) {
        // First card takes first level position
        return firstLevel;
      }
      if (cardIndex === 1) {
        // Second card becomes active
        return { ...ACTIVE };
      }
      if (cardIndex === 2) {
        // Third card is behind
        return {
          y: BEHIND.offsetY,
          x: BEHIND.offsetX,
          rotate: BEHIND.rotate,
          opacity: 1 - BEHIND.opacity,
          zIndex: ACTIVE.zIndex - 10,
          scale: 1,
        };
      }
    }

    // Third step - third card is active, first card moves to second level, second card to first level
    if (activeIndex === 3) {
      if (cardIndex === 0) {
        // First card takes second level position (2x displacement)
        return secondLevel;
      }
      if (cardIndex === 1) {
        // Second card takes first level position
        return firstLevel;
      }
      if (cardIndex === 2) {
        // Third card becomes active
        return { ...ACTIVE };
      }
    }

    // Default styles
    return { x: 0, y: 0, rotate: 0, opacity: 0, zIndex: 0, scale: 1 };
  };

  // Get current card sizing
  const cardSizing = getCardSizing();

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Step Numbers - Only show the active one */}
      <div className="absolute left-4 sm:left-10 md:left-20 top-32 sm:top-48 md:top-64 z-50">
        <AnimatePresence mode="wait">
          {activeIndex > 0 && activeIndex <= 3 && (
            <motion.div
              key={`step-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              {`0${activeIndex}.`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cards container */}
      <div className="w-full h-screen flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: cardSizing.width,
            height: cardSizing.height,
          }}
        >
          {processCards.map((card, index) => {
            const styles = getCardStyles(index);

            return (
              <motion.div
                key={card.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: cardSizing.width,
                  height: cardSizing.height,
                  zIndex: styles.zIndex,
                  transformOrigin: "center center",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: index === 0 ? 1 : 0.8 - index * 0.25,
                  rotate: index * -8,
                  scale: 1,
                }}
                animate={styles}
                transition={{
                  type: "spring",
                  stiffness: 75,
                  damping: 22,
                }}
              >
                <div
                  className="w-full h-full flex flex-col justify-center items-center text-center rounded-[40px]"
                  style={{
                    padding: cardSizing.padding,
                    backgroundColor: "rgba(245, 245, 247, 0.1)",
                    border: "1.5px solid rgba(245, 245, 247, 0.4)",
                    backdropFilter: "blur(100px)",
                    boxShadow:
                      "0px 0px 20px 0px rgba(255, 255, 255, 0.4) inset",
                  }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/80">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows at bottom center */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-16 flex space-x-6 md:space-x-8 z-40">
        <button
          onClick={() => activeIndex > 1 && setActiveIndex(activeIndex - 1)}
          disabled={activeIndex <= 1}
          className={`rounded-full border border-white/30 p-3 md:p-4 transition-all duration-300 ${
            activeIndex <= 1
              ? "text-white/30 cursor-not-allowed"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Previous step"
        >
          <IoChevronBackOutline size={windowWidth < 640 ? 16 : 20} />
        </button>

        <button
          onClick={() => activeIndex < 3 && setActiveIndex(activeIndex + 1)}
          disabled={activeIndex === 3}
          className={`rounded-full border ${
            activeIndex === 3 ? "border-white/30" : "border-white"
          } p-3 md:p-4 transition-all duration-300 ${
            activeIndex === 3
              ? "text-white/30 cursor-not-allowed"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Next step"
        >
          <IoChevronForwardOutline size={windowWidth < 640 ? 16 : 20} />
        </button>
      </div>

      {/* Final "All in Weeks" heading */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-24 sm:bottom-28 md:bottom-36 lg:bottom-44 z-50"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold">
              All in <span className="text-[#b0ff00]">Weeks!</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
