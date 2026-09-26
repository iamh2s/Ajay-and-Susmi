import { motion, useReducedMotion } from "framer-motion";
import { DoorOpen, Heart } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import data from "@/data/weddingData.json";
import {
  Gopuram,
  MangoToran,
  Petals,
  Vilakku,
} from "./decor";

const EASE_DOOR = [0.68, 0, 0.22, 1] as const;

function DoorStuds({
  side,
}: {
  side: "left" | "right";
}) {
  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
      style={{
        backgroundColor: "#400b13",
        backgroundImage:
          "radial-gradient(circle, rgba(217,190,124,0.85) 1.5px, rgba(134,102,42,0.4) 2.2px, transparent 2.8px), linear-gradient(160deg, rgba(92,21,33,0.9), rgba(46,8,16,0.95))",
        backgroundSize: "23px 23px, 100% 100%",
        backgroundPosition:
          side === "left"
            ? "right center"
            : "left center",
        boxShadow:
          "inset 0 0 34px rgba(0,0,0,0.55)",
      }}
    >
      {/* Vertical carved band */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          w-[3px]
          bg-gradient-to-b
          from-gold/70
          via-gold/25
          to-gold/70
        "
        style={
          {
            [side === "left"
              ? "right"
              : "left"]: "6px",
          } as CSSProperties
        }
      />

      {/* Handle ring */}

      <div
        aria-hidden="true"
        className="
          absolute
          top-[56%]
          h-9
          w-9
          -translate-y-1/2
          rounded-full
          border-2
          border-gold-light
          bg-maroon-deep
          shadow-[0_0_14px_rgba(217,190,124,0.45)]
        "
        style={
          {
            [side === "left"
              ? "right"
              : "left"]: "12px",
          } as CSSProperties
        }
      >
        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-2.5
            w-2.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-gold-light
          "
        />
      </div>
    </div>
  );
}

export default function InvitationIntro({
  onOpenStart,
  onOpened,
}: {
  onOpenStart: () => void;
  onOpened: () => void;
}) {
  const [phase, setPhase] = useState<
    "idle" | "opening"
  >("idle");

  const reduce = useReducedMotion();

  const { intro, couple } = data;

  /*
   * =========================================================
   * AFTER DOOR ANIMATION FINISHES
   * =========================================================
   */

  useEffect(() => {
    if (phase !== "opening") return;

    const timer = window.setTimeout(
      onOpened,
      reduce ? 650 : 1650
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase, onOpened, reduce]);

  const opening = phase === "opening";

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-label={`${intro.titleTa} — ${intro.titleEn}`}
      className="
        velvet-texture
        fixed
        inset-0
        z-50
        overflow-hidden
      "
      exit={{
        opacity: 0,
        scale: 1.07,
        filter: "blur(10px)",
      }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          kolam-dots
          absolute
          inset-0
          opacity-40
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-1/3
          bg-[radial-gradient(90%_100%_at_50%_0%,rgba(217,190,124,0.14),transparent)]
        "
      />

      <Petals count={10} />

      {/* =====================================================
          GOPURAM
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={
          opening
            ? {
                opacity: 0,
                y: -30,
              }
            : {
                opacity: 1,
                y: 0,
              }
        }
        transition={{
          duration: 0.6,
        }}
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          flex
          justify-center
        "
      >
        <Gopuram
          className="
            h-28
            w-auto
            translate-y-[-12%]
            text-gold/50

            sm:h-36
          "
        />
      </motion.div>

      {/* =====================================================
          CENTRAL CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          items-center
          justify-center
          px-6
        "
      >
        {/* =================================================
            INTRO TEXT
        ================================================= */}

        <motion.div
          animate={
            opening
              ? {
                  opacity: 0,
                  y: -26,
                  filter: "blur(6px)",
                }
              : {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 0.55,
            ease: "easeInOut",
          }}
          className="
            mb-5
            flex
            flex-col
            items-center
            text-center

            sm:mb-7
          "
        >
          {/* Sri */}

          <p
            className="
              text-gold-shimmer
              font-tamil
              text-2xl
              font-bold
              leading-none

              sm:text-3xl
            "
          >
            {intro.sri}
          </p>

          {/* Tamil title */}

          <h1
            className="
              mt-4
              pb-1
              font-tamil
              text-[clamp(1.7rem,5.4vw,2.9rem)]
              font-bold
              leading-tight
              text-gold-brush
            "
          >
            {intro.titleTa}
          </h1>

          {/* English title */}

          <p
            className="
              mt-2
              font-latin
              text-[0.65rem]
              font-medium
              uppercase
              tracking-[0.5em]
              text-gold-light/80

              sm:text-xs
            "
          >
            {intro.titleEn}
          </p>

          {/* Couple */}

          <div
            className="
              mt-5
              flex
              flex-col
              items-center
              gap-1.5
              font-tamil
              text-ivory
            "
          >
            <span
              className="
                text-lg
                font-semibold

                sm:text-xl
              "
            >
              {couple.bride.tamil}
            </span>

            <Heart
              className="
                h-3.5
                w-3.5
                fill-gold
                text-gold
              "
              aria-hidden="true"
            />

            <span
              className="
                text-lg
                font-semibold

                sm:text-xl
              "
            >
              {couple.groom.tamil}
            </span>
          </div>
        </motion.div>

        {/* =====================================================
            TEMPLE DOOR
        ===================================================== */}

        <div
          className="relative"
          style={{
            perspective: "1300px",
          }}
        >
          {/* Golden light */}

          <motion.div
            aria-hidden="true"
            initial={false}
            animate={
              opening
                ? {
                    opacity: 1,
                    scale: 1.18,
                  }
                : {
                    opacity: 0.14,
                    scale: 0.72,
                  }
            }
            transition={
              reduce
                ? {
                    duration: 0.4,
                  }
                : {
                    duration: 1.25,
                    delay: opening ? 0.42 : 0,
                    ease: "easeOut",
                  }
            }
            className="
              absolute
              -inset-10
              rounded-[45%]
              bg-[radial-gradient(50%_55%_at_50%_50%,rgba(252,236,190,0.95),rgba(212,164,74,0.5)_45%,transparent_75%)]
              blur-md
            "
          />

          {/* Door frame */}

          <div
            className="
              relative
              h-[min(40vh,340px)]
              w-[min(70vw,290px)]
              rounded-t-[9.5rem]
              border
              border-gold/55
              bg-maroon-deep/70
              p-[7px]
              shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]
            "
          >
            <div
              className="
                relative
                h-full
                w-full
                overflow-hidden
                rounded-t-[9rem]
                border
                border-gold/35
              "
            >
              {/* LEFT DOOR */}

              <motion.div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-1/2
                "
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={
                  opening
                    ? {
                        rotateY: reduce
                          ? 0
                          : -104,
                        opacity: reduce ? 0 : 1,
                      }
                    : {
                        rotateY: 0,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: reduce
                    ? 0.5
                    : 1.15,
                  delay: opening
                    ? reduce
                      ? 0
                      : 0.38
                    : 0,
                  ease: EASE_DOOR,
                }}
              >
                <DoorStuds side="left" />
              </motion.div>

              {/* RIGHT DOOR */}

              <motion.div
                className="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-1/2
                "
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={
                  opening
                    ? {
                        rotateY: reduce
                          ? 0
                          : 104,
                        opacity: reduce ? 0 : 1,
                      }
                    : {
                        rotateY: 0,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: reduce
                    ? 0.5
                    : 1.15,
                  delay: opening
                    ? reduce
                      ? 0
                      : 0.38
                    : 0,
                  ease: EASE_DOOR,
                }}
              >
                <DoorStuds side="right" />
              </motion.div>

              {/* TORAN */}

              <MangoToran
                className="
                  absolute
                  left-1/2
                  top-1
                  z-10
                  w-[88%]
                  -translate-x-1/2
                  opacity-95
                "
              />
            </div>

            {/* KALASAM */}

            <svg
              viewBox="0 0 24 30"
              aria-hidden="true"
              className="
                absolute
                -top-[27px]
                left-1/2
                h-7
                w-6
                -translate-x-1/2
                fill-gold-light
                drop-shadow-[0_0_8px_rgba(217,190,124,0.6)]
              "
            >
              <path d="M12 0c1.6 2.4 1.6 4.2 0 6.4C10.4 4.2 10.4 2.4 12 0Z" />

              <path d="M7 8.5h10l1.4 2.4c2.2 1.6 3.6 4 3.6 6.6 0 5.2-4.4 8-10 8s-10-2.8-10-8c0-2.6 1.4-5 3.6-6.6L7 8.5Z" />
            </svg>
          </div>

          {/* =================================================
              TOUCH TO OPEN
          ================================================= */}

          <motion.button
            type="button"
            onClick={() => {
              /*
               * VERY IMPORTANT:
               *
               * Start the music immediately from the user's
               * actual tap/click.
               *
               * Do NOT wait for the door animation.
               */

              onOpenStart();

              /*
               * Now start the door animation.
               */

              setPhase("opening");
            }}
            disabled={opening}
            animate={
              opening
                ? {
                    opacity: 0,
                    scale: 0.82,
                  }
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.4,
            }}
            aria-label={`${intro.ctaTa} — ${intro.ctaEn}`}
            className="
              cta-pulse
              group
              absolute
              left-1/2
              top-[58%]
              z-20
              flex
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              gap-1.5
              rounded-full
              border
              border-gold-light/90
              bg-maroon-deep/95
              px-7
              py-4
              shadow-[0_10px_40px_-8px_rgba(0,0,0,0.85)]
              backdrop-blur-sm
              transition-colors
              hover:bg-maroon
              focus-visible:bg-maroon
            "
          >
            <DoorOpen
              className="
                h-5
                w-5
                text-gold-light
                transition-transform
                duration-500
                group-hover:scale-110
              "
              aria-hidden="true"
            />

            <span
              className="
                font-tamil
                text-sm
                font-semibold
                text-ivory
              "
            >
              {intro.ctaTa}
            </span>

            <span
              className="
                font-latin
                text-[0.6rem]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-gold-light
              "
            >
              {intro.ctaEn}
            </span>
          </motion.button>
        </div>

        {/* =====================================================
            LAMPS
        ===================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-[4vh]
            flex
            items-end
            justify-between
            px-[14vw]
          "
        >
          {/* LEFT LAMP */}

          <div className="relative">
            <span
              className="
                absolute
                -inset-6
                rounded-full
                bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,185,62,0.32),transparent)]
                blur-md
              "
            />

            <Vilakku
              className="
                relative
                h-20
                w-auto

                sm:h-24
              "
            />
          </div>

          {/* RIGHT LAMP */}

          <div className="relative">
            <span
              className="
                absolute
                -inset-6
                rounded-full
                bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,185,62,0.32),transparent)]
                blur-md
              "
            />

            <Vilakku
              className="
                relative
                h-20
                w-auto

                sm:h-24
              "
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}