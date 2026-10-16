
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  // Hide while scrolling; show a tiny hint after 7 seconds
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

  // Detect when the footer enters the viewport
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
        opacity: visible ? 0.8 : 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
      }}
      aria-hidden={!visible}
      className="
        pointer-events-none
        fixed
        bottom-[calc(12px+env(safe-area-inset-bottom))]
        left-1/2
        z-[9999]
        -translate-x-1/2
        sm:bottom-4
      "
    >
      <motion.button
        type="button"
        onClick={footerVisible ? goToTop : undefined}
        disabled={!footerVisible}
        tabIndex={visible && footerVisible ? 0 : -1}
        aria-label={footerVisible ? "Go to top" : "Scroll down"}
        animate={
          visible && !reduceMotion
            ? {
                y: footerVisible ? [0, -3, 0] : [0, 4, 0],
                opacity: [0.55, 1, 0.55],
              }
            : {
                y: 0,
                opacity: 0.8,
              }
        }
        transition={{
          duration: 1.8,
          repeat: visible && !reduceMotion ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="
          pointer-events-auto
          flex
          h-6
          w-6
          touch-manipulation
          items-center
          justify-center
          rounded-full
          text-gold-light
          drop-shadow-[0_1px_5px_rgba(212,175,55,0.5)]
          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-gold-light
        "
      >
        {footerVisible ? (
          <ChevronUp
            size={17}
            strokeWidth={1.6}
          />
        ) : (
          <ChevronDown
            size={17}
            strokeWidth={1.6}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
