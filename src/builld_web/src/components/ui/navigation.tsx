"use client";

import { useScroll, SectionType } from "@/context/scroll-context";

export default function Navigation() {
  const { activeSection, scrollToSection } = useScroll();

  const navItems: Array<{ label: string; section: SectionType }> = [
    { label: "About", section: "about" },
    { label: "Process", section: "process" },
    { label: "Services", section: "services" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-10">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => scrollToSection(item.section)}
          className={`text-sm font-medium transition-colors ${
            activeSection === item.section
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
