"use client";

import { useScroll, SectionType } from "@/context/scroll-context";

export default function Navigation() {
  const { activeSection, scrollToSection } = useScroll();

  const navItems: Array<{
    label: string;
    section: SectionType;
    activeSections?: SectionType[];
  }> = [
    { label: "About", section: "about" },
    {
      label: "Process",
      section: "process",
      activeSections: ["process", "process-steps"], // Consider both sections for active state
    },
    { label: "Services", section: "services" },
    { label: "Contact", section: "contact" },
  ];

  // Check if a nav item should be active based on current section
  const isActive = (item: (typeof navItems)[0]): boolean => {
    if (item.activeSections) {
      return item.activeSections.includes(activeSection);
    }
    return activeSection === item.section;
  };

  return (
    <nav className="hidden md:flex items-center space-x-10">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => scrollToSection(item.section)}
          className={`text-sm font-medium transition-colors ${
            isActive(item)
              ? "text-accent-green"
              : "text-foreground hover:text-accent-green"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
