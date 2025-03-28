"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "LaunchPad",
      description: "Get online fast with a professional digital presence",
      oneTimeTotalPrice: 500,
      oneTimeServices: [
        { name: "Website Design & Development", price: 100 },
        { name: "Branding & Visual Identity", price: 50 },
        { name: "Basic E-Commerce Setup", price: 150 },
        { name: "Social Media Professional Setup", price: 100 },
        { name: "Domain & Hosting Registration", price: 100 }
      ],
      subscriptionServices: [
        { name: "SEO-Optimized Content", price: 100 },
        { name: "Basic Automation & CRM", price: 150 }
      ],
      monthlyPricing: {
        base: 150,
        monthly: 120,
        quarterly: 100,
        yearly: 80
      }
    },
    {
      name: "Ignite",
      description: "Scale, optimize, and automate your digital operations",
      oneTimeTotalPrice: 1000,
      oneTimeServices: [
        { name: "Website Performance Optimization", price: 400 },
        { name: "E-Commerce & Sales Optimization", price: 350 },
        { name: "Security & Cloud Infrastructure", price: 150 },
        { name: "Compliance & Privacy Enhancements", price: 100 }
      ],
      subscriptionServices: [
        { name: "Advanced Digital Marketing", price: 200 },
        { name: "Business Automation & CRM", price: 250 },
        { name: "Data Analytics & Insights", price: 150 }
      ],
      monthlyPricing: {
        base: 200,
        monthly: 180,
        quarterly: 150,
        yearly: 120
      }
    }
  ];

  return (
    <section 
      id="section-pricing" 
      className="bg-gradient-to-br from-purple-700 to-purple-900 flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-white mb-3">Plans & Pricing</h2>
        <p className="text-xl text-purple-100">Flexible solutions for your digital growth</p>
      </div>
      
      <div className="flex space-x-2 bg-white/10 p-2 rounded-full mb-8">
        {['monthly', 'quarterly', 'yearly'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPlan(period as 'monthly' | 'quarterly' | 'yearly')}
            className={`px-6 py-2 rounded-full capitalize transition-all ${
              selectedPlan === period 
                ? 'bg-white text-purple-700 font-bold shadow-md' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {plans.map((plan, index) => {
          const isLaunchPad = index === 0;
          // Choose inner container backgrounds based on plan
          const oneTimeBg = isLaunchPad ? "bg-gray-100" : "bg-gray-800";
          const innerTextColor = isLaunchPad ? "text-gray-900" : "text-gray-100";
          
          return (
            <motion.div
              key={plan.name}
              className={`p-10 rounded-3xl shadow-xl transition-all duration-300 ${isLaunchPad ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6">
                <h3 className="text-3xl font-bold">{plan.name}</h3>
                <p className="text-lg opacity-80 mt-2">{plan.description}</p>
              </div>

              {/* One-Time Services Package */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4">One-Time Services Package</h4>
                <div className={`${oneTimeBg} ${innerTextColor} p-6 rounded-xl`}>
                  <ul className="space-y-3 mb-4">
                    {plan.oneTimeServices.map((service) => (
                      <li key={service.name} className="flex justify-between items-center">
                        <span className="flex items-center">
                          <span className="text-green-400 text-lg mr-3">✔</span>
                          {service.name}
                        </span>
                        <span className="font-semibold text-sm">
                          ${service.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-bold">Total One-Time Package</span>
                    <span className="text-xl font-bold">${plan.oneTimeTotalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Subscription Services Summary */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4">Optional Subscription Services</h4>
                <div className={`${oneTimeBg} ${innerTextColor} p-6 rounded-xl`}>
                  <ul className="list-disc list-inside space-y-2">
                    {plan.subscriptionServices.map((service) => (
                      <li key={service.name}>{service.name}</li>
                    ))}
                  </ul>
                  <p className="mt-4 font-bold">
                    Subscription Fee: ${plan.monthlyPricing[selectedPlan]}/mo
                  </p>
                </div>
              </div>

              {/* Pricing and Total */}
              <div className="mb-8">
                <div className="text-4xl font-bold">
                  ${plan.monthlyPricing[selectedPlan]}
                  <span className="text-lg opacity-60 ml-2">/mo</span>
                </div>
                <div className="text-sm opacity-70 mt-2">
                  One-Time Package: ${plan.oneTimeTotalPrice}
                </div>
              </div>

              <motion.button
                className={`w-full py-3 rounded-xl text-lg font-semibold transition-all ${isLaunchPad ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
