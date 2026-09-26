import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import data from "@/data/weddingData.json";
import {
  CornerOrnaments,
  GoldDivider,
  Petals,
} from "./decor";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(6px)",
  },

  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HeroSection({
  active,
}: {
  active: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  const reduce = useReducedMotion();

  const { hero, couple } = data;

  /* =====================================================
      SCROLL PROGRESS
  ===================================================== */

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* =====================================================
      BACKGROUND PARALLAX
  ===================================================== */

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "16%"]
  );

  /* =====================================================
      CONTENT OPACITY
  ===================================================== */

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72],
    [1, 0]
  );

  /* =====================================================
      CONTENT PARALLAX
  ===================================================== */

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "-24%"]
  );

  return (
    <section
      ref={ref}
      id="home"
      aria-label={hero.titleTa}
      className="
        relative
        flex
        h-[100svh]
        min-h-[580px]
        items-center
        justify-center
        overflow-hidden
        bg-maroon-deep
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <motion.img
          src={hero.image}
          alt={hero.imageAlt}
          fetchPriority="high"
          decoding="async"
          initial={{
            scale: reduce ? 1 : 1.14,
          }}
          animate={{
            scale: active
              ? 1
              : reduce
                ? 1
                : 1.14,
          }}
          transition={{
            duration: 3.2,
            ease: [0.25, 0.6, 0.2, 1],
          }}
          className="
            h-full
            w-full
            object-cover
          "
          style={{
            objectPosition: "center 0%",
            filter: "blur(1px)",
            transform: "scale(1.02)",
            marginTop: "1px",
          }}
        />
      </motion.div>

      {/* =====================================================
          TONAL VEILS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(30,6,11,0.62),transparent_26%,transparent_46%,rgba(30,6,11,0.5)_72%,rgba(24,4,8,0.92))]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-[radial-gradient(120%_90%_at_50%_20%,transparent_55%,rgba(24,4,8,0.55))]
        "
      />

      {/* =====================================================
          TEMPLE FRAME
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          inset-[10px]

          border
          border-gold-light/40

          min-[390px]:inset-[12px]

          sm:inset-[16px]

          lg:inset-[20px]
        "
      >
        <span
          className="
            absolute
            inset-[4px]
            border
            border-gold/25

            sm:inset-[5px]
          "
        />

        <CornerOrnaments
          className="text-gold-light/60"
          size="
            h-8
            w-8

            min-[390px]:h-9
            min-[390px]:w-9

            sm:h-12
            sm:w-12

            lg:h-14
            lg:w-14
          "
        />
      </div>

      {/* =====================================================
          FLOATING PETALS
      ===================================================== */}

      <Petals count={100} />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <motion.div
        variants={container}
        initial="hidden"
        animate={active ? "show" : "hidden"}
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
        className="
          relative
          z-10

          flex
          w-full
          flex-col
          items-center

          text-center

          px-5

          /* =================================================
             SMALL MOBILE
             320–389px
          ================================================= */

          max-[389px]:max-w-[350px]
          max-[389px]:pt-8
          max-[389px]:pb-5

          /* =================================================
             NORMAL MOBILE
             390–429px
          ================================================= */

          min-[390px]:max-w-[380px]
          min-[390px]:px-6
          min-[390px]:pt-10
          min-[390px]:pb-7

          /* =================================================
             LARGE MOBILE
             430–767px
          ================================================= */

          min-[430px]:max-w-[420px]
          min-[430px]:px-7
          min-[430px]:pt-12
          min-[430px]:pb-9

          /* =================================================
             TABLET
             768px+
          ================================================= */

          sm:max-w-[650px]
          sm:px-8
          sm:pt-14
          sm:pb-12

          /* =================================================
             TABLET LANDSCAPE / SMALL LAPTOP
             1024px+
          ================================================= */

          lg:max-w-[760px]
          lg:px-10
          lg:pt-10
          lg:pb-8

          /* =================================================
             DESKTOP
             1280px+
          ================================================= */

          xl:max-w-[900px]
          xl:px-12
          xl:pt-14
          xl:pb-10

          /* =================================================
             LARGE DESKTOP
             1536px+
          ================================================= */

          2xl:max-w-[1050px]
          2xl:pb-12
        "
      >
        {/* =================================================
            TAMIL TITLE
        ================================================= */}

        <motion.h1
          variants={item}
          className="
            w-full

            font-tamil
            font-bold
            leading-[1.18]
            text-ivory/90

            /* 320–389 */
            max-[389px]:text-[26px]

            /* 390–429 */
            min-[390px]:text-[29px]

            /* 430+ */
            min-[430px]:text-[31px]

            /* Tablet */
            sm:text-[38px]

            /* Laptop */
            lg:text-[40px]

            /* Desktop */
            xl:text-[46px]

            /* Large desktop */
            2xl:text-[52px]
          "
        >
          {hero.titleTa}
        </motion.h1>

        {/* =================================================
            ENGLISH TITLE
        ================================================= */}

        <motion.p
          variants={item}
          className="
            font-latin
            font-semibold
            uppercase
            text-ivory/90

            max-[389px]:mt-1
            max-[389px]:text-[8px]
            max-[389px]:tracking-[0.28em]

            min-[390px]:mt-1
            min-[390px]:text-[9px]
            min-[390px]:tracking-[0.32em]

            min-[430px]:text-[10px]
            min-[430px]:tracking-[0.36em]

            sm:mt-1.5
            sm:text-[11px]
            sm:tracking-[0.4em]

            lg:text-[11px]

            xl:text-[12px]
            xl:tracking-[0.45em]
          "
        >
          {hero.titleEn}
        </motion.p>

        {/* =================================================
            TAGLINE
        ================================================= */}

        <motion.div
          variants={item}
          className="
            max-[389px]:mt-3
            min-[390px]:mt-4
            min-[430px]:mt-4
            sm:mt-5
            lg:mt-5
          "
        >
          <p
            className="
              font-tamil
              font-medium
              leading-relaxed
              text-ivory

              max-[389px]:text-[14px]

              min-[390px]:text-[15px]

              min-[430px]:text-[16px]

              sm:text-[18px]

              lg:text-[19px]

              xl:text-[20px]

              2xl:text-[21px]
            "
          >
            {hero.taglineTa}
          </p>

          <p
            className="
              mt-0.5
              font-latin
              italic
              tracking-wide
              text-ivory/70

              max-[389px]:text-[10px]

              min-[390px]:text-[11px]

              min-[430px]:text-[12px]

              sm:text-[13px]

              lg:text-[14px]

              xl:text-[15px]
            "
          >
            {hero.taglineEn}
          </p>
        </motion.div>

        {/* =================================================
            QUOTE
        ================================================= */}

        <motion.div
          variants={item}
          className="
            w-full

            max-[389px]:mt-3
            max-[389px]:max-w-[320px]

            min-[390px]:mt-4
            min-[390px]:max-w-[350px]

            min-[430px]:max-w-[390px]

            sm:mt-5
            sm:max-w-[550px]

            lg:max-w-[620px]

            xl:max-w-[700px]
          "
        >
          <p
            className="
              font-tamil
              leading-[1.55]
              text-ivory/90

              max-[389px]:text-[12px]

              min-[390px]:text-[13px]

              min-[430px]:text-[14px]

              sm:text-[15px]

              lg:text-[16px]

              xl:text-[17px]

              2xl:text-[18px]
            "
          >
            {hero.quoteTa}
          </p>

          <p
            className="
              mt-1
              font-latin
              italic
              leading-relaxed
              text-ivory/60

              max-[389px]:text-[9px]

              min-[390px]:text-[10px]

              min-[430px]:text-[10px]

              sm:text-[11px]

              lg:text-[12px]

              xl:text-[13px]
            "
          >
            {hero.quoteEn}
          </p>
        </motion.div>

        {/* =================================================
            GOLD DIVIDER
        ================================================= */}

        <motion.div
          variants={item}
          className="
            max-[389px]:mt-3

            min-[390px]:mt-4

            sm:mt-5

            lg:mt-5
          "
          aria-hidden="true"
        >
          <GoldDivider
            motif="lotus"
            className="text-gold-light/80"
            widthClass="
              w-[130px]

              min-[390px]:w-[150px]

              min-[430px]:w-[165px]

              sm:w-[190px]

              lg:w-[220px]

              xl:w-[250px]

              2xl:w-[280px]
            "
          />
        </motion.div>

        {/* =================================================
            COUPLE NAMES

            MOBILE:
                Bride
                  ♥
                Groom

            TABLET/DESKTOP:
                Bride    ♥    Groom
        ================================================= */}

        <motion.div
          variants={item}
          className="
            mt-3

            flex
            w-full
            items-center
            justify-center

            font-tamil

            /* =============================================
               MOBILE
               ============================================= */

            flex-col
            gap-1

            min-[390px]:mt-3.5

            min-[430px]:mt-4

            /* =============================================
               TABLET AND ABOVE
               ============================================= */

            sm:mt-5
            sm:flex-row
            sm:gap-x-4
            sm:gap-y-0

            lg:gap-x-5

            xl:gap-x-6
          "
        >
          {/* =================================================
              BRIDE
          ================================================= */}

          <span
            className="
              whitespace-nowrap
              text-center
              font-bold
              leading-tight
              text-ivory

              /* Small mobile */
              text-[18px]

              /* Normal mobile */
              min-[390px]:text-[20px]

              /* Large mobile */
              min-[430px]:text-[22px]

              /* Tablet */
              sm:text-[27px]

              /* Laptop */
              lg:text-[30px]

              /* Desktop */
              xl:text-[34px]

              /* Large desktop */
              2xl:text-[38px]
            "
          >
            {couple.bride.tamil}
          </span>

          {/* =================================================
              HEART

              On mobile:
                    ↓
                  ♥
                    ↓

              On desktop:
                  NAME ♥ NAME
          ================================================= */}

          <Heart
            aria-hidden="true"
            className="
              shrink-0
              fill-gold
              text-gold

              /* ===========================================
                 MOBILE
                 =========================================== */

              h-5
              w-5
              my-0.5

              /* ===========================================
                 390px+
                 =========================================== */

              min-[390px]:h-5
              min-[390px]:w-5

              /* ===========================================
                 430px+
                 =========================================== */

              min-[430px]:h-5
              min-[430px]:w-5

              /* ===========================================
                 TABLET
                 =========================================== */

              sm:my-0
              sm:h-5
              sm:w-5

              /* ===========================================
                 LAPTOP
                 =========================================== */

              lg:h-5
              lg:w-5

              /* ===========================================
                 DESKTOP
                 =========================================== */

              xl:h-6
              xl:w-6
            "
          />

          {/* =================================================
              GROOM
          ================================================= */}

          <span
            className="
              whitespace-nowrap
              text-center
              font-bold
              leading-tight
              text-ivory

              /* Small mobile */
              text-[18px]

              /* Normal mobile */
              min-[390px]:text-[20px]

              /* Large mobile */
              min-[430px]:text-[22px]

              /* Tablet */
              sm:text-[27px]

              /* Laptop */
              lg:text-[30px]

              /* Desktop */
              xl:text-[34px]

              /* Large desktop */
              2xl:text-[38px]
            "
          >
            {couple.groom.tamil}
          </span>
        </motion.div>

        {/* =================================================
            DATE
        ================================================= */}

        <motion.div
          variants={item}
          className="
            max-[389px]:mt-3

            min-[390px]:mt-3.5

            min-[430px]:mt-4

            sm:mt-5

            lg:mt-5
          "
        >
          {/* Tamil date */}

          <p
            className="
              font-tamil
              font-bold
              leading-tight
              tracking-wide
              text-gold-brush

              max-[389px]:text-[15px]

              min-[390px]:text-[16px]

              min-[430px]:text-[17px]

              sm:text-[20px]

              lg:text-[21px]

              xl:text-[23px]

              2xl:text-[25px]
            "
          >
            {hero.dateTa}
          </p>

          {/* English date */}

          <p
            className="
              mt-0.5
              font-latin
              font-medium
              uppercase
              text-gold-light/85

              max-[389px]:text-[8px]
              max-[389px]:tracking-[0.2em]

              min-[390px]:text-[9px]
              min-[390px]:tracking-[0.22em]

              min-[430px]:text-[9px]

              sm:text-[10px]
              sm:tracking-[0.26em]

              lg:text-[11px]

              xl:text-[12px]
              xl:tracking-[0.3em]
            "
          >
            {hero.dateEn}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}