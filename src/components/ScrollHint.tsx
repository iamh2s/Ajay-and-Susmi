"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hand } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ScrollHint() {
  const reduce = useReducedMotion();

  const [showHint, setShowHint] = useState(true);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const startTimer = () => {
      clearTimer();

      // Hide immediately when user is scrolling
      setShowHint(false);

      // Show again after 7 seconds of no scrolling
      timerRef.current = setTimeout(() => {
        setShowHint(true);
      }, 7000);
    };

    const handleScroll = () => {
      startTimer();
    };

    // Hero opens → show hint immediately
    setShowHint(true);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, []);

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
      {/* Text */}

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
        Scroll Down
      </span>

      {/* Hand */}

      <motion.div
        animate={
          showHint && !reduce
            ? {
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
          flex
          h-10
          w-10
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
          className="
            h-5
            w-5
            rotate-[-20deg]
            text-gold-light
            sm:h-6
            sm:w-6
          "
        />
      </motion.div>

      {/* Down indicator */}

      <motion.span
        animate={
          showHint && !reduce
            ? {
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