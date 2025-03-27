"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AllInWeeksSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section
      id="section-all-in-weeks"
      ref={ref}
      className="section-fullscreen snap-section gradient-bg"
    >
      <div className="w-full h-full flex items-center justify-center">
        <motion.h2
          className="text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8 }}
        >
          All in <span className="text-accent-green">Weeks!</span>
        </motion.h2>
      </div>
    </section>
  );
}
