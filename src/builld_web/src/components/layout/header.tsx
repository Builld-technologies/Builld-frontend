"use client";

import { motion } from "framer-motion";
import Logo from "@/components/ui/logo";
import Navigation from "@/components/ui/navigation";
import { useScroll } from "@/context/scroll-context";
import { useEffect, useState } from "react";

export default function Header() {
  const { activeSection } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Check for splash screen in a useEffect to avoid conditional hook calls
  useEffect(() => {
    setShouldRender(activeSection !== "splash");
  }, [activeSection]);

  // Add scroll detection for header appearance
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add both event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Clean up both event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle menu toggling
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when user clicks outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        menuOpen &&
        !target.closest('[data-menu="container"]') &&
        !target.closest('[data-menu="button"]')
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 p-4 sm:p-5 md:p-6 lg:px-10 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />

        {/* Desktop Navigation */}
        <Navigation />

        {/* Mobile Menu Button */}
        <div className="md:hidden" data-menu="button">
          <button
            onClick={toggleMenu}
            className="text-white p-2 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              initial={false}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
              className="relative w-6 h-6"
            >
              <motion.span
                className="absolute block h-0.5 bg-white w-6 transform-gpu"
                style={{ top: "40%" }}
                variants={{
                  open: { rotate: 45, translateY: 1 },
                  closed: { rotate: 0, translateY: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute block h-0.5 bg-white w-6 transform-gpu"
                style={{ top: "60%" }}
                variants={{
                  open: { rotate: -45, translateY: -1 },
                  closed: { rotate: 0, translateY: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <motion.nav
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
          display: menuOpen ? "block" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl overflow-hidden"
        data-menu="container"
      >
        <div className="p-4 sm:p-6">
          <Navigation isMobile={true} closeMenu={() => setMenuOpen(false)} />
        </div>
      </motion.nav>
    </motion.header>
  );
}
