import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { GoldDivider } from "./decor";

export default function ContactButton() {
  const [open, setOpen] = useState(false);

  /* =========================================================
     LOCK PAGE SCROLL WHEN POPUP IS OPEN
  ========================================================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =========================================================
     ESC KEY TO CLOSE
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          LEFT SIDE CONTACT BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="தொடர்பு"
        className="
          fixed
          left-0
          top-1/2
          z-[150]
          -translate-y-1/2

          flex
          h-20
          w-10
          items-center
          justify-center

          rounded-r-full

          border
          border-l-0
          border-gold-deep/70

          bg-maroon

          text-gold-light

          shadow-[4px_8px_25px_rgba(0,0,0,0.35)]

          transition-all
          duration-300

          hover:w-12
          hover:bg-maroon/95

          active:scale-95

          sm:h-24
          sm:w-11
        "
      >
        <span
          className="
            font-tamil
            text-sm
            font-bold
            tracking-wider

            [writing-mode:vertical-rl]

            transition-transform
            duration-300
          "
        >
          தொடர்பு
        </span>
      </button>

      {/* =====================================================
          CONTACT POPUP
      ====================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[300]

            flex
            items-center
            justify-center

            bg-black/70

            px-4
            py-6

            backdrop-blur-sm

            animate-[contactOverlay_0.25s_ease-out]
          "
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="தொடர்பு"
        >
          {/* =================================================
              CONTACT CARD
          ================================================== */}

          <div
            className="
              relative

              max-h-[90vh]
              w-full
              max-w-2xl

              overflow-y-auto

              rounded-[1.8rem]

              bg-gradient-to-b
              from-gold-light
              via-gold
              to-gold-deep

              p-[3px]

              shadow-[0_35px_90px_rgba(0,0,0,0.8)]

              animate-[contactCardIn_0.3s_ease-out]
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* =================================================
                INNER CARD
            ================================================== */}

            <div
              className="
                gold-double-frame
                paper-texture

                relative

                overflow-hidden

                rounded-[calc(1.8rem-3px)]

                border
                border-gold-deep/40

                px-5
                py-7

                text-center

                sm:px-8
                sm:py-9
              "
            >
              {/* =================================================
                  BACKGROUND GLOW
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  h-40

                  bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,190,124,0.18),transparent)]
                "
              />

              {/* =================================================
                  CORNER DECORATIONS
              ================================================== */}

              {/* Top Left */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-3

                  h-10
                  w-10

                  border-l
                  border-t
                  border-gold-deep/40

                  sm:left-5
                  sm:top-5
                  sm:h-14
                  sm:w-14
                "
              />

              {/* Top Right */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-3

                  h-10
                  w-10

                  border-r
                  border-t
                  border-gold-deep/40

                  sm:right-5
                  sm:top-5
                  sm:h-14
                  sm:w-14
                "
              />

              {/* Bottom Left */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-3
                  left-3

                  h-10
                  w-10

                  border-b
                  border-l
                  border-gold-deep/40

                  sm:bottom-5
                  sm:left-5
                  sm:h-14
                  sm:w-14
                "
              />

              {/* Bottom Right */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-3
                  right-3

                  h-10
                  w-10

                  border-b
                  border-r
                  border-gold-deep/40

                  sm:bottom-5
                  sm:right-5
                  sm:h-14
                  sm:w-14
                "
              />

              {/* =================================================
                  CLOSE BUTTON
              ================================================== */}

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="மூடு"
                className="
                  absolute
                  right-3
                  top-3
                  z-30

                  flex
                  h-8
                  w-8

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-gold-deep/50

                  bg-ivory

                  text-maroon

                  shadow-md

                  transition-all
                  duration-300

                  hover:rotate-90
                  hover:bg-white

                  active:scale-90

                  sm:right-5
                  sm:top-5
                "
              >
                <X className="h-4 w-4" />
              </button>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div className="relative">

                {/* =================================================
                    TOP DIVIDER
                ================================================== */}

                <div className="flex justify-center">
                  <GoldDivider
                    motif="diamond"
                    className="text-gold-deep/70"
                    widthClass="w-24 sm:w-32"
                  />
                </div>

                {/* =================================================
                    HEADING
                ================================================== */}

                <div className="mt-4">
                  <p className="font-tamil text-2xl font-bold text-maroon sm:text-3xl">
                    தொடர்புக்கு
                  </p>

                  <p className="mt-1 font-latin text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-gold-deep">
                    Contact
                  </p>
                </div>

                {/* Small Divider */}

                <div className="mx-auto mt-4 h-px w-14 bg-gold/60" />

                {/* =================================================
                    CONTACT PEOPLE
                ================================================== */}

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* =================================================
                      VISHAL KUMAR
                  ================================================== */}

                  <div
                    className="
                      group

                      rounded-2xl

                      border
                      border-gold/45

                      bg-ivory-deep/70

                      px-4
                      py-5

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:bg-ivory

                      hover:shadow-[0_15px_35px_-18px_rgba(176,141,60,0.65)]
                    "
                  >
                    {/* Phone Icon */}

                    <span
                      className="
                        mx-auto

                        flex
                        h-10
                        w-10

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-gold/55

                        bg-ivory

                        text-gold-deep

                        shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]
                      "
                    >
                      <Phone className="h-4 w-4" />
                    </span>

                    {/* Name */}

                    <p className="mt-3 font-latin text-base font-bold text-maroon sm:text-lg">
                      Vishal Kumar
                    </p>

                    {/* Tamil Relation */}

                    <p className="mt-1 font-tamil text-xs font-semibold text-gold-deep">
                      மணமகன் சகோதரர்
                    </p>

                    {/* English Relation */}

                    <p className="mt-1 font-latin text-xs text-ink/55">
                      Brother of Groom
                    </p>

                    {/* Phone Number */}

                    <p className="mt-2 font-latin text-sm font-bold tracking-wide text-maroon">
                      +91 90250 10393
                    </p>

                    {/* Call Button */}

                    <a
                      href="tel:+919025010393"
                      className="
                        mt-4

                        inline-flex
                        items-center
                        justify-center
                        gap-2

                        rounded-full

                        border
                        border-gold-deep

                        bg-maroon

                        px-5
                        py-2

                        font-latin
                        text-[0.65rem]
                        font-semibold
                        uppercase
                        tracking-[0.15em]

                        text-gold-light

                        shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)]

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-maroon/90

                        active:scale-95
                      "
                    >
                      <Phone className="h-3.5 w-3.5" />

                      Call Now
                    </a>
                  </div>

                  {/* =================================================
                      KARTHIKEYAN
                  ================================================== */}

                  <div
                    className="
                      group

                      rounded-2xl

                      border
                      border-gold/45

                      bg-ivory-deep/70

                      px-4
                      py-5

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:bg-ivory

                      hover:shadow-[0_15px_35px_-18px_rgba(176,141,60,0.65)]
                    "
                  >
                    {/* Phone Icon */}

                    <span
                      className="
                        mx-auto

                        flex
                        h-10
                        w-10

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-gold/55

                        bg-ivory

                        text-gold-deep

                        shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]
                      "
                    >
                      <Phone className="h-4 w-4" />
                    </span>

                    {/* Name */}

                    <p className="mt-3 font-latin text-base font-bold text-maroon sm:text-lg">
                      Karthikeyan
                    </p>

                    {/* Tamil Relation */}

                    <p className="mt-1 font-tamil text-xs font-semibold text-gold-deep">
                      மணமகள் சகோதரர்
                    </p>

                    {/* English Relation */}

                    <p className="mt-1 font-latin text-xs text-ink/55">
                      Brother of Bride
                    </p>

                    {/* Phone Number */}

                    <p className="mt-2 font-latin text-sm font-bold tracking-wide text-maroon">
                      +91 95005 21536
                    </p>

                    {/* Call Button */}

                    <a
                      href="tel:+919500521536"
                      className="
                        mt-4

                        inline-flex
                        items-center
                        justify-center
                        gap-2

                        rounded-full

                        border
                        border-gold-deep

                        bg-maroon

                        px-5
                        py-2

                        font-latin
                        text-[0.65rem]
                        font-semibold
                        uppercase
                        tracking-[0.15em]

                        text-gold-light

                        shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)]

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-maroon/90

                        active:scale-95
                      "
                    >
                      <Phone className="h-3.5 w-3.5" />

                      Call Now
                    </a>
                  </div>
                </div>

                {/* =================================================
                    BOTTOM DIVIDER
                ================================================== */}

                <div className="mt-6 flex justify-center">
                  <GoldDivider
                    motif="lotus"
                    className="text-gold-deep"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              ANIMATIONS
          ================================================== */}

          <style>{`
            @keyframes contactOverlay {
              from {
                opacity: 0;
              }

              to {
                opacity: 1;
              }
            }

            @keyframes contactCardIn {
              from {
                opacity: 0;
                transform: translateY(24px) scale(0.95);
              }

              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}