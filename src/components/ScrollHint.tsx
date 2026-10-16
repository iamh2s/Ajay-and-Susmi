
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ScrollHint() {
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  const footerRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Hide while scrolling and show again after 7 seconds
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) return;

      setVisible(false);
      clearTimer();

      timerRef.current = setTimeout(() => {
        if (!footerRef.current && !document.hidden) {
          setVisible(true);
        }
      }, 7000);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, [clearTimer]);

  // Detect the footer
  useEffect(() => {
    const footer = document.getElementById("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        footerRef.current = isVisible;
        setFooterVisible(isVisible);
        clearTimer();

        if (isVisible) {
          setVisible(false);

          timerRef.current = setTimeout(() => {
            if (footerRef.current && !document.hidden) {
              setVisible(true);
            }
          }, 10000);
        } else {
          setVisible(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      clearTimer();
    };
  }, [clearTimer]);

  // Return to the top
  const goToTop = () => {
    clearTimer();
    footerRef.current = false;
    setFooterVisible(false);
    setVisible(false);

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, reduceMotion ? 100 : 1200);
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 0.9 : 0,
        y: visible ? 0 : 6,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
      }}
      aria-hidden={!visible}
      className="
        pointer-events-none
        fixed
        bottom-[calc(14px+env(safe-area-inset-bottom))]
        left-1/2
        z-[9999]
        flex
        -translate-x-1/2
        flex-col
        items-center
        gap-0.5
        text-gold-light
        sm:bottom-5
      "
    >
      {/* Minimal label */}
      <span
        className="
          text-[8px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-white/90
          drop-shadow-md
        "
      >
        {footerVisible ? "Go Up" : "Scroll"}
      </span>

      {/* Small directional arrow */}
      <motion.button
        type="button"
        onClick={footerVisible ? goToTop : undefined}
        disabled={!footerVisible}
        tabIndex={visible && footerVisible ? 0 : -1}
        aria-label={footerVisible ? "Go to top" : "Scroll down"}
        animate={
          visible && !reduceMotion
            ? {
                y: [0, footerVisible ? -3 : 3, 0],
              }
            : { y: 0 }
        }
        transition={{
          duration: 1.2,
          repeat: visible && !reduceMotion ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="
          pointer-events-auto
          flex
          h-7
          w-7
          touch-manipulation
          items-center
          justify-center
          rounded-full
          text-gold-light
          transition-colors
          hover:text-white
          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-gold-light
          disabled:cursor-default
        "
      >
        {footerVisible ? (
          <ArrowUp size={16} strokeWidth={1.6} />
        ) : (
          <ArrowDown size={16} strokeWidth={1.6} />
        )}
      </motion.button>
    </motion.div>
  );
}
