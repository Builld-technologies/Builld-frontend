"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/button";
import { fadeUpVariant, staggerChildren } from "@/animations/section-animations";
import BackgroundAnimation from "../ui/background-animation";

interface FormData {
  email: string;
  phoneNumber: string;
  businessStage: string;
  challenge: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phoneNumber: "",
    businessStage: "",
    challenge: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center px-4 py-16">
      <BackgroundAnimation color="blue" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left side: Text */}
        <div className="w-full max-w-2xl text-white">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={fadeUpVariant}
          >
            Let's Build <span className="text-accent-green">Something</span> Together
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 mb-8"
            variants={fadeUpVariant}
          >
            Ready to bring your ideas to life? Reach out to us and let's get started.
          </motion.p>
          
          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            variants={staggerChildren}
          >
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-accent-green font-medium">Email</h3>
              <p>myemail@gmail.com</p>
            </motion.div>
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-accent-green font-medium">Phone Number</h3>
              <p>123-456-7890</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side: Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-zinc-800/50 backdrop-blur-lg p-8 rounded-2xl"
          variants={fadeUpVariant}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green transition-all"
                placeholder="123-456-7890"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="businessStage" className="block text-sm font-medium text-gray-200 mb-2">
                Business Stage
              </label>
              <select
                id="businessStage"
                name="businessStage"
                value={formData.businessStage}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green transition-all"
              >
                <option value="">Choose a Plan</option>
                <option value="1">LaunchPad</option>
                <option value="2">Ignite</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="challenge" className="block text-sm font-medium text-gray-200 mb-2">
              Your Biggest Challenge
            </label>
            <textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green transition-all resize-none"
              placeholder="What's your biggest challenge right now?"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
            //   type="submit"
              variant="primary"
              className="w-full justify-center py-4 text-lg font-medium"
            >
              Send Message
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}