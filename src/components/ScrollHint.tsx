"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ScrollHint() {
  const reduceMotion = useReducedMotion();
  const [atBottom, setAtBottom] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    setAtBottom(
      scrollTop + viewportHeight >= documentHeight - 40
    );
  }, []);

  useEffect(() => {
    checkScrollPosition();

    window.addEventListener("scroll", checkScrollPosition, {
      passive: true,
    });

    window.addEventListener("resize", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const handleClick = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (atBottom) {
      // UP: Return to the very top
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    } else {
      // DOWN: Move to the next screen
      const nextPosition = Math.min(
        window.scrollY + viewportHeight * 0.8,
        documentHeight
      );

      window.scrollTo({
        top: nextPosition,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={atBottom ? "Scroll to top" : "Scroll down"}
      title={atBottom ? "Back to top" : "Scroll down"}
      initial={false}
      animate={{
        opacity: 0.9,
        y: reduceMotion ? 0 : [0, atBottom ? -3 : 3, 0],
      }}
      transition={{
        opacity: { duration: 0.2 },
        y: {
          duration: 1.6,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        },
      }}
      className="
        fixed
        bottom-[calc(16px+env(safe-area-inset-bottom))]
        left-1/2
        z-[99999]
        flex
        h-10
        w-10
        -translate-x-1/2
        touch-manipulation
        items-center
        justify-center
        rounded-full
        border
        border-gold/40
        bg-[#18070a]/90
        text-gold-light
        shadow-[0_0_15px_rgba(212,175,55,0.18)]
        backdrop-blur-sm
        transition-colors
        hover:border-gold
        hover:bg-[#250a10]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-gold-light
        sm:bottom-5
      "
    >
      {atBottom ? (
        <ChevronUp size={21} strokeWidth={1.8} />
      ) : (
        <ChevronDown size={21} strokeWidth={1.8} />
      )}
    </motion.button>
  );
}