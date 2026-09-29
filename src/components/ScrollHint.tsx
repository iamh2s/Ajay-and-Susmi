"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hand } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollHint() {
  const reduce = useReducedMotion();

  const [showHint, setShowHint] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const footerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * =========================================================
   * CLEAR TIMERS
   * =========================================================
   */

  const clearScrollTimer = useCallback(() => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  }, []);

  const clearFooterTimer = useCallback(() => {
    if (footerTimerRef.current) {
      clearTimeout(footerTimerRef.current);
      footerTimerRef.current = null;
    }
  }, []);

  /*
   * =========================================================
   * SCROLL DETECTION
   * =========================================================
   */

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      /*
       * If footer is currently visible,
       * footer logic controls the hint.
       */
      if (isFooterVisible) {
        return;
      }

      /*
       * Hide immediately while scrolling.
       */
      setShowHint(false);

      /*
       * Clear previous timer.
       */
      clearScrollTimer();

      /*
       * Small debounce for mobile browsers.
       */
      if (scrollEndTimer) {
        clearTimeout(scrollEndTimer);
      }

      scrollEndTimer = setTimeout(() => {
        /*
         * Check again before showing.
         */
        if (!isFooterVisible) {
          setShowHint(true);
        }
      }, 7000);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      clearScrollTimer();

      if (scrollEndTimer) {
        clearTimeout(scrollEndTimer);
      }
    };
  }, [isFooterVisible, clearScrollTimer]);

  /*
   * =========================================================
   * FOOTER DETECTION
   * =========================================================
   */

  useEffect(() => {
    const footer = document.getElementById("footer");

    if (!footer) {
      console.warn("ScrollHint: #footer not found");
      return;
    }

    /*
     * Mobile browsers can change viewport height
     * while the address bar appears/disappears.
     *
     * Therefore we use a small rootMargin instead of
     * relying only on a strict threshold.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setIsFooterVisible(visible);

        clearFooterTimer();

        if (visible) {
          /*
           * Footer reached:
           * immediately hide Scroll Down.
           */
          setShowHint(false);

          /*
           * Wait 10 seconds.
           */
          footerTimerRef.current = setTimeout(() => {
            /*
             * Only show Go Up if footer is still visible.
             */
            setShowHint(true);
          }, 10000);
        } else {
          /*
           * User left footer.
           */
          setShowHint(false);
        }
      },
      {
        /*
         * More reliable on mobile.
         */
        threshold: 0,

        /*
         * Consider footer reached slightly before
         * it completely enters the viewport.
         */
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(footer);

    /*
     * Initial check.
     *
     * Some mobile browsers don't immediately trigger
     * IntersectionObserver after hydration.
     */
    const initialCheck = () => {
      const rect = footer.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight;

      const visible =
        rect.top < viewportHeight &&
        rect.bottom > 0;

      if (visible) {
        setIsFooterVisible(true);
      }
    };

    requestAnimationFrame(initialCheck);

    return () => {
      observer.disconnect();
      clearFooterTimer();
    };
  }, [clearFooterTimer]);

  /*
   * =========================================================
   * GO TO TOP
   * =========================================================
   */

  const goToTop = () => {
    clearScrollTimer();
    clearFooterTimer();

    setIsFooterVisible(false);
    setShowHint(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    /*
     * Show Scroll Down again after returning to top.
     */
    setTimeout(() => {
      setShowHint(true);
    }, 1200);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

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
        pointer-events-none
        fixed
        bottom-[calc(1.25rem+env(safe-area-inset-bottom))]
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
      {/* =====================================================
          TEXT
      ===================================================== */}

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

      {/* =====================================================
          BUTTON
      ===================================================== */}

      <motion.button
        type="button"
        onClick={isFooterVisible ? goToTop : undefined}
        aria-label={
          isFooterVisible
            ? "Go to top"
            : "Scroll down"
        }
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
          repeat:
            showHint && !reduce
              ? Infinity
              : 0,
          ease: "easeInOut",
        }}
        className="
          pointer-events-auto
          flex
          h-10
          w-10
          cursor-pointer
          touch-manipulation
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
            transition-transform
            duration-300
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

      {/* =====================================================
          INDICATOR
      ===================================================== */}

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
          repeat:
            showHint && !reduce
              ? Infinity
              : 0,
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