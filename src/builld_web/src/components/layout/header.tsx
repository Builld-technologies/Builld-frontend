"use client";

import { motion } from "framer-motion";
import Logo from "@/components/ui/logo";
import Navigation from "@/components/ui/navigation";
import { useScroll } from "@/context/scroll-context";

export default function Header() {
  const { activeSection } = useScroll();

  // Don't show header on splash screen
  if (activeSection === "splash") {
    return null;
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 p-6 md:px-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </motion.header>
  );
}
