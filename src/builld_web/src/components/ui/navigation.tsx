"use client";

import { useScroll } from "@/context/scroll-context";

type SectionType = "splash" | "home" | "about" | "process" | "services";

export default function Navigation() {
  const { activeSection, scrollToSection } = useScroll();

  const navItems: Array<{ label: string; section: SectionType }> = [
    { label: "About", section: "about" },
    { label: "Process", section: "process" },
    { label: "Services", section: "services" },
    { label: "Contact", section: "services" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-10">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => scrollToSection(item.section)}
          className={`text-sm font-medium transition-colors ${
            activeSection === item.section
              ? item.label === "Process"
                ? "text-accent-green"
                : "text-foreground hover:text-accent-green"
              : "text-foreground hover:text-accent-green"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
