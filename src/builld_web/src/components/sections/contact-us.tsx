"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScroll } from "@/context/scroll-context";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    businessStage: "",
    challenge: "",
  });
  const { setActiveSection } = useScroll();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setActiveSection("contact"), 100);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        email: "",
        phoneNumber: "",
        businessStage: "",
        challenge: "",
      });
    }, 500);
  };

  return (
    <section
      id="section-contact"
      ref={ref}
      className="section-fullscreen snap-section flex items-center justify-center py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8"
    >
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="w-full max-w-2xl text-white">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            custom={0}
          >
            Let&apos;s Build <span className="text-[#b0ff00]">Something</span>{" "}
            Together
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            custom={0.1}
          >
            Ready to bring your ideas to life? Reach out to us and let&apos;s
            get started.
          </motion.p>
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            custom={0.2}
          >
            <div>
              <h3 className="text-[#b0ff00] font-medium">Email</h3>
              <p>contact@builld.io</p>
            </div>
            <div>
              <h3 className="text-[#b0ff00] font-medium">Phone Number</h3>
              <p>123-456-7890</p>
            </div>
          </motion.div>
        </div>
        <motion.form
          className="w-full max-w-xl bg-zinc-800/50 backdrop-blur-lg p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          custom={0.3}
          onSubmit={handleSubmit}
        >
          {formSubmitted ? (
            <motion.div
              className="flex flex-col items-center justify-center h-full py-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-[#b0ff00] rounded-full flex items-center justify-center mb-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
              <p className="text-gray-300">
                We&apos;ll get back to you as soon as possible.
              </p>
              <button
                type="button"
                className="mt-6 py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                onClick={() => setFormSubmitted(false)}
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00]"
                    placeholder="123-456-7890"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="businessStage"
                    className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2"
                  >
                    Business Stage
                  </label>
                  <select
                    id="businessStage"
                    name="businessStage"
                    value={formData.businessStage}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00]"
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
                  className="block text-sm font-medium text-gray-200 mb-1 sm:mb-2"
                >
                  Your Biggest Challenge
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b0ff00] resize-none"
                  placeholder="What's your biggest challenge right now?"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 sm:py-4 bg-[#b0ff00] text-black rounded-lg text-base sm:text-lg font-medium hover:bg-[#9ee600] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
