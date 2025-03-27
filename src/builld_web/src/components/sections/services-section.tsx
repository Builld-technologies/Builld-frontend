"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  slideInLeftVariant,
  slideInRightVariant,
} from "@/animations/section-animations";

export default function ServicesSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const services = [
    {
      name: "Product Design",
      bgColor: "bg-accent-green",
      textColor: "text-black",
    },
    { name: "Web Development", bgColor: "bg-black", textColor: "text-white" },
    {
      name: "Product Management",
      bgColor: "bg-white",
      textColor: "text-black",
    },
  ];

  return (
    <section
      id="section-services"
      ref={ref}
      className="section-fullscreen snap-section bg-accent-blue"
    >
      <div className="max-w-7xl w-full px-6 md:px-10 mx-auto">
        <motion.span
          className="text-sm mb-6 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          What we offer
        </motion.span>

        <div className="flex flex-col md:flex-row justify-between items-start">
          <motion.div
            className="max-w-xl mb-10 md:mb-0"
            variants={slideInLeftVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions Tailored to
              <br />
              Drive Your <span className="text-accent-green">Growth</span>
            </h2>

            <p className="text-lg md:text-xl mb-8">
              From design to development to maintenance, we
              <br />
              provide comprehensive digital solutions that fit
              <br />
              your unique needs.
            </p>

            <motion.button
              className="bg-accent-green text-black rounded-full px-8 py-3 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start a Project</span>
              <span className="ml-2">{/* TODO: place svg image */}</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            variants={slideInRightVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className={`${service.bgColor} ${service.textColor} rounded-full px-8 py-4 font-medium text-xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {service.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
