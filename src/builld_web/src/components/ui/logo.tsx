import { useScroll } from "@/context/scroll-context";

export default function Logo() {
  const { scrollToSection } = useScroll();

  return (
    <button
      onClick={() => scrollToSection("home")}
      className="flex items-center text-2xl font-bold text-foreground"
    >
      bui<span className="text-accent-green">l</span>d.
    </button>
  );
}
