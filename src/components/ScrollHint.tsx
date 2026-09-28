"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hand } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ScrollHint() {
  const reduce = useReducedMotion();

  const [showHint, setShowHint] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const footerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleScroll = () => {
      // At footer, don't run the normal scroll timer
      if (isFooterVisible) return;

      clearTimer();

      // Hide immediately while scrolling
      setShowHint(false);

      // Show again after 7 seconds of no scrolling
      timerRef.current = setTimeout(() => {
        setShowHint(true);
      }, 7000);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, [isFooterVisible]);

  /*
   * FOOTER DETECTION
   */
  useEffect(() => {
    const footer = document.getElementById("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setIsFooterVisible(visible);

        if (footerTimerRef.current) {
          clearTimeout(footerTimerRef.current);
          footerTimerRef.current = null;
        }

        if (visible) {
          // Hide immediately when footer is reached
          setShowHint(false);

          // Wait 10 seconds before showing Go Up
          footerTimerRef.current = setTimeout(() => {
            setShowHint(true);
          }, 10000);
        } else {
          // Leaving footer
          setShowHint(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();

      if (footerTimerRef.current) {
        clearTimeout(footerTimerRef.current);
      }
    };
  }, []);

  /*
   * GO TO TOP
   */
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: showHint ? 1 : 0,
        y: showHint ? 0 : 15,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        bottom-5
        left-1/2
        z-[9999]
        flex
        -translate-x-1/2
        flex-col
        items-center
        gap-1
        sm:bottom-7
      "
    >
      {/* TEXT */}
      <span
        className="
          font-latin
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.35em]
          text-white/90
          drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]
          sm:text-[10px]
        "
      >
        {isFooterVisible ? "Go Up" : "Scroll Down"}
      </span>

      {/* BUTTON */}
      <motion.button
        type="button"
        onClick={isFooterVisible ? goToTop : undefined}
        aria-label={isFooterVisible ? "Go to top" : "Scroll down"}
        animate={
          showHint && !reduce
            ? isFooterVisible
              ? {
                  y: [0, -7, 0],
                  rotate: [0, 5, -5, 0],
                }
              : {
                  y: [0, 7, 0],
                  rotate: [0, -5, 5, 0],
                }
            : {}
        }
        transition={{
          duration: 1.3,
          repeat: showHint && !reduce ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="
          pointer-events-auto
          flex
          h-10
          w-10
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-gold-light/60
          bg-black/35
          shadow-[0_0_25px_rgba(212,175,55,0.2)]
          backdrop-blur-md
          sm:h-11
          sm:w-11
        "
      >
        <Hand
          className={`
            h-5
            w-5
            text-gold-light
            sm:h-6
            sm:w-6
            ${
              isFooterVisible
                ? "rotate-[160deg]"
                : "rotate-[-20deg]"
            }
          `}
        />
      </motion.button>

      {/* INDICATOR */}
      <motion.span
        animate={
          showHint && !reduce
            ? isFooterVisible
              ? {
                  height: [20, 10, 20],
                  opacity: [1, 0.4, 1],
                }
              : {
                  height: [10, 20, 10],
                  opacity: [0.4, 1, 0.4],
                }
            : {}
        }
        transition={{
          duration: 1.2,
          repeat: showHint && !reduce ? Infinity : 0,
          ease: "easeInOut",
        }}
        className={`
          block
          w-px
          bg-gradient-to-b
          ${
            isFooterVisible
              ? "from-transparent to-gold-light"
              : "from-gold-light to-transparent"
          }
        `}
      />
    </motion.div>
  );
}