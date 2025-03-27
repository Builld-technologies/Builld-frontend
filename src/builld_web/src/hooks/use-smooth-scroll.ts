"use client";

import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id^="section-"]');
    let isScrolling = false;
    let currentSectionIndex = 0;
    let touchStartY = 0;

    // Function to scroll to a specific section
    const scrollToSection = (index: number) => {
      if (isScrolling) return;

      isScrolling = true;
      const targetSection = sections[index] as HTMLElement;

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });

        currentSectionIndex = index;

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    // Handle mouse wheel events
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      const targetIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentSectionIndex + direction)
      );

      if (targetIndex !== currentSectionIndex) {
        scrollToSection(targetIndex);
      }
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // Only trigger scroll if the user has moved their finger enough
      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        const targetIndex = Math.max(
          0,
          Math.min(sections.length - 1, currentSectionIndex + direction)
        );

        if (targetIndex !== currentSectionIndex) {
          e.preventDefault();
          scrollToSection(targetIndex);
        }

        // Reset touchStartY to prevent multiple triggers
        touchStartY = touchY;
      }
    };

    // Find the current section based on scroll position
    const updateCurrentSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;

        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          currentSectionIndex = i;
          break;
        }
      }
    };

    // Initialize current section
    updateCurrentSection();

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", updateCurrentSection, { passive: true });

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", updateCurrentSection);
    };
  }, []);
}
