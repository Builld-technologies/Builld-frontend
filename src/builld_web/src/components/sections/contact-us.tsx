"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScroll } from "@/context/scroll-context";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    businessStage: "",
    challenge: "",
  });

  const { setActiveSection } = useScroll();
  const [ref, inView] = useInView({ threshold: 0.3 });

  // Update active section when this section comes into view
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setActiveSection("contact");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView, setActiveSection]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="section-contact"
      ref={ref}
      className="section-fullscreen snap-section flex items-center justify-center px-4 py-16"
    >
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left side: Text */}
        <div className="w-full max-w-2xl text-white">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s Build <span className="text-[#b0ff00]">Something</span>{" "}
            Together
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to bring your ideas to life? Reach out to us and let&apos;s
            get started.
          </motion.p>

          {/* Contact Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-[#b0ff00] font-medium">Email</h3>
              <p>contact@builld.io</p>
            </div>
            <div>
              <h3 className="text-[#b0ff00] font-medium">Phone Number</h3>
              <p>123-456-7890</p>
            </div>
          </div>
        </div>

        {/* Right side: Form */}
        <motion.form
          className="w-full max-w-xl bg-zinc-800/50 backdrop-blur-lg p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00]"
                placeholder="123-456-7890"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="businessStage"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Business Stage
              </label>
              <select
                id="businessStage"
                name="businessStage"
                value={formData.businessStage}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00]"
              >
                <option value="">Choose a Plan</option>
                <option value="LaunchPad">LaunchPad</option>
                <option value="Ignite">Ignite</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="challenge"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Your Biggest Challenge
            </label>
            <textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00] resize-none"
              placeholder="What's your biggest challenge right now?"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-[#b0ff00] text-black rounded-lg text-lg font-medium hover:bg-[#9ee600] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
