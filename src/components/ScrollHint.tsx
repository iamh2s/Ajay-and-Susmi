
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollHint() {
  const reduceMotion = useReducedMotion();

  const [showHint, setShowHint] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const footerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const isFooterVisibleRef = useRef(false);
  const lastScrollYRef = useRef(0);

  const clearScrollTimer = useCallback(() => {
    if (scrollTimerRef.current !== null) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  }, []);

  const clearFooterTimer = useCallback(() => {
    if (footerTimerRef.current !== null) {
      clearTimeout(footerTimerRef.current);
      footerTimerRef.current = null;
    }
  }, []);

  // Schedule the scroll hint after inactivity
  const scheduleScrollHint = useCallback(() => {
    clearScrollTimer();

    scrollTimerRef.current = setTimeout(() => {
      if (
        !isFooterVisibleRef.current &&
        !document.hidden
      ) {
        setShowHint(true);
      }
    }, 7000);
  }, [clearScrollTimer]);

  // Detect scrolling and hide the hint while the visitor scrolls
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Ignore tiny scroll changes caused by browser layout shifts
      if (
        Math.abs(currentY - lastScrollYRef.current) < 2
      ) {
        return;
      }

      lastScrollYRef.current = currentY;

      if (isFooterVisibleRef.current) {
        return;
      }

      setShowHint(false);
      scheduleScrollHint();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearScrollTimer();
      } else if (!isFooterVisibleRef.current) {
        scheduleScrollHint();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      clearScrollTimer();
    };
  }, [scheduleScrollHint, clearScrollTimer]);

  // Detect when the footer enters the viewport
  useEffect(() => {
    const footer = document.getElementById("footer");

    if (!footer) {
      console.warn(
        'ScrollHint: Add id="footer" to your footer section.'
      );
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        isFooterVisibleRef.current = visible;
        setIsFooterVisible(visible);

        clearFooterTimer();
        clearScrollTimer();

        if (visible) {
          setShowHint(false);

          footerTimerRef.current = setTimeout(() => {
            if (
              isFooterVisibleRef.current &&
              !document.hidden
            ) {
              setShowHint(true);
            }
          }, 10000);
        } else {
          setShowHint(false);
          scheduleScrollHint();
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
      clearFooterTimer();
    };
  }, [
    clearFooterTimer,
    clearScrollTimer,
    scheduleScrollHint,
  ]);

  // Smoothly return to the top
  const goToTop = () => {
    clearScrollTimer();
    clearFooterTimer();

    isFooterVisibleRef.current = false;
    setIsFooterVisible(false);
    setShowHint(false);

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    lastScrollYRef.current = 0;

    scrollTimerRef.current = setTimeout(() => {
      setShowHint(true);
    }, reduceMotion ? 100 : 1200);
  };

  const visible = showHint;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!visible}
      className="
        pointer-events-none
        fixed
        bottom-[calc(1rem+env(safe-area-inset-bottom))]
        left-1/2
        z-[9999]
        flex
        -translate-x-1/2
        flex-col
        items-center
        gap-2
        sm:bottom-6
      "
    >
      {/* Direction label */}
      <span
        className="
          rounded-full
          border
          border-gold-light/25
          bg-black/45
          px-3
          py-1.5
          font-latin
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.25em]
          text-white
          shadow-lg
          backdrop-blur-md
          sm:text-[10px]
        "
      >
        {isFooterVisible ? "Go Up" : "Scroll Down"}
      </span>

      {/* Direction button */}
      <motion.button
        type="button"
        onClick={isFooterVisible ? goToTop : undefined}
        disabled={!isFooterVisible}
        tabIndex={visible && isFooterVisible ? 0 : -1}
        aria-label={
          isFooterVisible ? "Go to top" : "Scroll down"
        }
        animate={
          visible && !reduceMotion
            ? isFooterVisible
              ? { y: [0, -5, 0] }
              : { y: [0, 6, 0] }
            : { y: 0 }
        }
        transition={{
          duration: 1.2,
          repeat:
            visible && !reduceMotion ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="
          pointer-events-auto
          flex
          h-11
          w-11
          touch-manipulation
          items-center
          justify-center
          rounded-full
          border
          border-gold-light/60
          bg-gradient-to-b
          from-maroon-deep/90
          to-black/80
          text-gold-light
          shadow-[0_0_24px_rgba(212,175,55,0.18)]
          backdrop-blur-lg
          transition-colors
          hover:border-gold-light
          hover:bg-maroon-deep
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-gold-light
          disabled:cursor-default
          sm:h-12
          sm:w-12
        "
      >
        {isFooterVisible ? (
          <ArrowUp
            className="h-5 w-5 sm:h-6 sm:w-6"
            strokeWidth={1.8}
          />
        ) : (
          <ArrowDown
            className="h-5 w-5 sm:h-6 sm:w-6"
            strokeWidth={1.8}
          />
        )}
      </motion.button>

      {/* Gold directional indicator */}
      <motion.span
        animate={
          visible && !reduceMotion
            ? isFooterVisible
              ? {
                  height: [12, 6, 12],
                  opacity: [0.8, 0.35, 0.8],
                }
              : {
                  height: [6, 14, 6],
                  opacity: [0.35, 0.9, 0.35],
                }
            : { height: 8, opacity: 0.7 }
        }
        transition={{
          duration: 1.2,
          repeat:
            visible && !reduceMotion ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="
          block
          w-px
          bg-gradient-to-b
          from-gold-light
          to-transparent
        "
      />
    </motion.div>
  );
}

