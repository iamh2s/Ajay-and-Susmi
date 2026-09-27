import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MoveRight,
  X,
} from "lucide-react";

import { gsap, ScrollTrigger } from "../lib/gsap";
import data from "@/data/weddingData.json";

import {
  GoldDivider,
} from "./decor";

import { cn } from "@/utils/cn";

type GalleryImage = {
  src: string;
  alt: string;
};

/* =========================================================
   FILM HOLES
========================================================= */

function FilmHoles() {
  return (
    <div
      aria-hidden="true"
      className="flex w-full justify-between overflow-hidden px-3"
    >
      {Array.from({ length: 34 }).map((_, i) => (
        <span
          key={i}
          className="
            h-[5px]
            w-[11px]
            shrink-0
            rounded-[2px]
            bg-[#f4e7cf]/10
            sm:h-[6px]
            sm:w-[14px]
            md:h-[7px]
            md:w-[16px]
          "
        />
      ))}
    </div>
  );
}

/* =========================================================
   FILM FRAME
========================================================= */

function FilmFrame({
  image,
  index,
  total,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const tall = index % 3 === 1;

  return (
    <figure
      className={cn(
        "group relative shrink-0",
        "w-[78vw]",
        "sm:w-[62vw]",
        "md:w-[47vw]",
        "lg:w-[42vw]",
        "xl:w-[38vw]",
        "max-w-[680px]"
      )}
    >
      <div
        className="
          relative
          border
          border-[#d8ad55]/40
          bg-[#16070b]
          p-2
          pb-3
          shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]
          sm:p-2.5
          sm:pb-3.5
          md:p-3
        "
      >
        {/* ===============================================
            IMAGE
        ================================================ */}

        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open photo ${index + 1}: ${image.alt}`}
          className="
            relative
            block
            w-full
            overflow-hidden
            text-left
            focus:outline-none
          "
        >
          <div
            className={cn(
              "relative overflow-hidden",
              tall
                ? "h-[48svh] sm:h-[57svh] md:h-[60svh]"
                : "h-[39svh] sm:h-[48svh] md:h-[52svh]"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index < 2 ? "high" : "auto"}
              className="
                h-full
                w-full
                object-cover
                transform-gpu
                select-none
                will-change-auto
                transition-transform
                duration-[1400ms]
                ease-out
                md:group-hover:scale-[1.035]
              "
            />

            {/* cinematic gradient */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[#120307]/70
                via-transparent
                to-[#120307]/10
              "
            />

            {/* subtle vignette */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                shadow-[inset_0_0_70px_rgba(0,0,0,0.4)]
              "
            />

            {/* gold tint */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[#d8ad55]/0
                transition-colors
                duration-500
                md:group-hover:bg-[#d8ad55]/[0.025]
              "
            />
          </div>

          {/* =============================================
              NUMBER
          ============================================== */}

          <span
            className="
              absolute
              right-2.5
              top-2.5
              rounded-sm
              bg-[#17060b]/65
              px-2
              py-1
              font-latin
              text-[8px]
              tracking-[0.28em]
              text-[#f0d38a]/85
              backdrop-blur-sm
              sm:right-3
              sm:top-3
              sm:text-[9px]
            "
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          {/* =============================================
              DESKTOP OPEN INDICATOR
          ============================================== */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              hidden
              h-11
              w-11
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#f0d38a]/70
              bg-[#17060b]/50
              text-[#f0d38a]
              opacity-0
              backdrop-blur-sm
              transition-all
              duration-400
              md:flex
              md:scale-75
              md:group-hover:scale-100
              md:group-hover:opacity-100
            "
          >
            <span className="text-lg font-light">
              +
            </span>
          </span>
        </button>

        {/* ===============================================
            CAPTION
        ================================================ */}

        <figcaption className="flex items-center justify-between gap-4 px-1.5 pt-3 sm:px-2 sm:pt-3.5">
          <p className="min-w-0 truncate font-latin text-xs italic text-[#f7ead7]/85 sm:text-sm">
            {image.alt}
          </p>

          <span className="shrink-0 font-latin text-[7px] uppercase tracking-[0.28em] text-[#d8ad55]/70 sm:text-[8px]">
            Memory {String(index + 1).padStart(2, "0")}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   LIGHTBOX
========================================================= */

function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
}) {
  const current = images[index];

  useLayoutEffect(() => {
    document.documentElement.classList.add(
      "scroll-locked"
    );

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onNavigate(-1);
      }

      if (event.key === "ArrowRight") {
        onNavigate(1);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      document.documentElement.classList.remove(
        "scroll-locked"
      );

      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [onClose, onNavigate]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#100307]/95
        p-4
        backdrop-blur-lg
        sm:p-8
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* blurred background */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-cover
          bg-center
          opacity-[0.13]
          blur-2xl
        "
        style={{
          backgroundImage: `url(${current.src})`,
        }}
      />

      {/* cinema bars */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[6vh] bg-black/60" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6vh] bg-black/60" />

      {/* close */}

      <button
        type="button"
        aria-label="Close photo viewer"
        onClick={onClose}
        className="
          absolute
          right-4
          top-4
          z-30
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#d8ad55]/50
          bg-[#17060b]/80
          text-[#f0d38a]
          backdrop-blur-md
          transition
          hover:bg-[#17060b]
          sm:right-6
          sm:top-6
        "
      >
        <X className="h-5 w-5" />
      </button>

      {/* previous */}

      <button
        type="button"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(-1);
        }}
        className="
          absolute
          left-2
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#d8ad55]/50
          bg-[#17060b]/75
          text-[#f0d38a]
          backdrop-blur-md
          sm:left-6
          sm:h-11
          sm:w-11
        "
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* next */}

      <button
        type="button"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(1);
        }}
        className="
          absolute
          right-2
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#d8ad55]/50
          bg-[#17060b]/75
          text-[#f0d38a]
          backdrop-blur-md
          sm:right-6
          sm:h-11
          sm:w-11
        "
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* image */}

      <AnimatePresence mode="wait">
        <motion.figure
          key={current.src}
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            relative
            z-20
            max-w-[88vw]
          "
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <div
            className="
              border
              border-[#d8ad55]/60
              bg-[#16070b]
              p-2
              shadow-[0_30px_80px_rgba(0,0,0,0.75)]
              sm:p-3
            "
          >
            <img
              src={current.src}
              alt={current.alt}
              draggable={false}
              className="
                block
                max-h-[72svh]
                max-w-[82vw]
                object-contain
              "
            />
          </div>

          <figcaption className="mt-3 text-center sm:mt-4">
            <p className="font-latin text-xs italic text-[#f7ead7]/90 sm:text-sm">
              {current.alt}
            </p>

            <p className="mt-1.5 font-latin text-[8px] uppercase tracking-[0.35em] text-[#d8ad55]/70">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================================================
   MAIN GALLERY
========================================================= */

export default function GallerySection() {
  const { gallery } = data;

  const images = gallery.images as GalleryImage[];

  const root = useRef<HTMLElement>(null);

  const track = useRef<HTMLDivElement>(null);

  const [extra, setExtra] = useState(0);

  const [lightbox, setLightbox] =
    useState<number | null>(null);

  /* =======================================================
     MEASURE WITH RESIZE OBSERVER
  ======================================================= */

  useLayoutEffect(() => {
    const element = track.current;

    if (!element) return;

    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        if (!track.current) return;

        const distance = Math.max(
          0,
          track.current.scrollWidth -
            window.innerWidth
        );

        setExtra((previous) =>
          previous === distance
            ? previous
            : distance
        );
      });
    };

    measure();

    const resizeObserver =
      new ResizeObserver(measure);

    resizeObserver.observe(element);

    window.addEventListener(
      "resize",
      measure,
      { passive: true }
    );

    return () => {
      cancelAnimationFrame(frame);

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        measure
      );
    };
  }, [images.length]);

  /* =======================================================
     GSAP SCROLL
  ======================================================= */

  useLayoutEffect(() => {
    const section = root.current;

    const element = track.current;

    if (!section || !element || extra <= 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ===============================================
         DESKTOP
      ================================================ */

      mm.add(
        "(min-width: 1024px)",
        () => {
          gsap.set(element, {
            x: 0,
            force3D: true,
          });

          gsap.to(element, {
            x: -extra,
            ease: "none",
            force3D: true,

            scrollTrigger: {
              trigger: section,

              start: "top top",

              end: () =>
                `+=${extra + window.innerHeight * 0.35}`,

              scrub: 0.7,

              invalidateOnRefresh: true,

              anticipatePin: 1,

              fastScrollEnd: true,
            },
          });
        }
      );

      /* ===============================================
         TABLET
      ================================================ */

      mm.add(
        "(min-width: 640px) and (max-width: 1023px)",
        () => {
          gsap.set(element, {
            x: 0,
            force3D: true,
          });

          gsap.to(element, {
            x: -extra,
            ease: "none",
            force3D: true,

            scrollTrigger: {
              trigger: section,

              start: "top top",

              end: () =>
                `+=${extra + window.innerHeight * 0.25}`,

              scrub: 0.55,

              invalidateOnRefresh: true,

              anticipatePin: 1,
            },
          });
        }
      );

      /* ===============================================
         MOBILE
      ================================================ */

      mm.add(
        "(max-width: 639px)",
        () => {
          gsap.set(element, {
            x: 0,
            force3D: true,
          });

          gsap.to(element, {
            x: -extra,
            ease: "none",
            force3D: true,

            scrollTrigger: {
              trigger: section,

              start: "top top",

              end: () =>
                `+=${extra + window.innerHeight * 0.18}`,

              scrub: 0.35,

              invalidateOnRefresh: true,

              anticipatePin: 1,

              fastScrollEnd: true,
            },
          });
        }
      );

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [extra]);

  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const navigateLightbox = useCallback(
    (direction: 1 | -1) => {
      setLightbox((current) => {
        if (current === null) {
          return null;
        }

        return (
          (current +
            direction +
            images.length) %
          images.length
        );
      });
    },
    [images.length]
  );

  /* =======================================================
     SECTION HEIGHT
  ======================================================= */

  const sectionHeight =
    extra > 0
      ? `calc(100svh + ${extra + 180}px)`
      : "100svh";

  return (
    <section
      id="gallery"
      ref={root}
      aria-label={`${gallery.headingTa} — ${gallery.headingEn}`}
      className="
        relative
        bg-[#13070a]
        overflow-clip
      "
      style={{
        height: sectionHeight,
      }}
    >
      {/* ===================================================
          STICKY CINEMA
      =================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          flex-col
          justify-center
          overflow-hidden
        "
      >
        {/* ================================================
            TOP FILM BAND
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-30
            h-9
            border-b
            border-[#f7ead7]/10
            bg-[#080304]
            sm:h-10
          "
        >
          <div className="mt-2">
            <FilmHoles />
          </div>
        </div>

        {/* ================================================
            BOTTOM FILM BAND
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-30
            h-9
            border-t
            border-[#f7ead7]/10
            bg-[#080304]
            sm:h-10
          "
        >
          <div className="mt-2">
            <FilmHoles />
          </div>
        </div>

        {/* ================================================
            BACKGROUND
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.07]
          "
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(216,173,85,.8), transparent 42%)",
          }}
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, #d8ad55 50%, transparent 100%)",
          }}
        />

        {/* ================================================
            FILM TRACK
        ================================================= */}

        <div
          ref={track}
          className="
            relative
            z-10
            flex
            w-max
            items-center
            gap-6
            pl-[7vw]
            pr-[14vw]
            will-change-transform
            transform-gpu
            sm:gap-9
            sm:pl-[7vw]
            sm:pr-[15vw]
            md:gap-12
            lg:gap-16
          "
        >
          {/* ==============================================
              INTRO
          =============================================== */}

          <div
            className="
              w-[78vw]
              shrink-0
              sm:w-[58vw]
              md:w-[38vw]
              lg:w-[31vw]
            "
          >
            <p
              className="
                font-latin
                text-[8px]
                uppercase
                tracking-[0.5em]
                text-[#d8ad55]/80
                sm:text-[9px]
              "
            >
              Our Memories
            </p>

            <h2
              className="
                mt-4
                font-latin
                text-[clamp(2.5rem,7vw,6rem)]
                font-light
                leading-[0.9]
                text-[#f7ead7]
                sm:mt-5
              "
            >
              Frames
              <br />
              of our
              <br />
              <span className="text-[#d8ad55]">
                story
              </span>
            </h2>

            <div className="mt-6">
              <GoldDivider
                motif="diamond"
                widthClass="w-24"
                className="text-[#d8ad55]/65"
              />
            </div>

            <p
              className="
                mt-6
                max-w-sm
                font-latin
                text-sm
                italic
                leading-relaxed
                text-[#f7ead7]/50
                sm:text-base
              "
            >
              Every photograph holds a moment.
              Every moment becomes a memory.
            </p>

            <div
              className="
                mt-7
                flex
                items-center
                gap-3
                font-latin
                text-[8px]
                uppercase
                tracking-[0.4em]
                text-[#d8ad55]/75
              "
            >
              Keep scrolling

              <MoveRight
                className="h-4 w-4"
                strokeWidth={1.4}
              />
            </div>
          </div>

          {/* ==============================================
              PHOTOS
          =============================================== */}

          {images.map((image, index) => (
            <FilmFrame
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              total={images.length}
              onOpen={() => setLightbox(index)}
            />
          ))}

          {/* ==============================================
              END
          =============================================== */}

          <div
            className="
              flex
              w-[72vw]
              shrink-0
              flex-col
              items-center
              justify-center
              sm:w-[52vw]
              md:w-[32vw]
            "
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d8ad55] to-transparent" />

            <p
              className="
                mt-6
                max-w-sm
                text-center
                font-latin
                text-[clamp(1.4rem,3vw,2.2rem)]
                font-light
                italic
                leading-snug
                text-[#f7ead7]/70
              "
            >
              And the most beautiful

              <Heart
                className="
                  mx-2
                  inline
                  h-5
                  w-5
                  text-[#d8ad55]
                "
                strokeWidth={1.3}
              />

              memories are still being made.
            </p>

            <div className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d8ad55] to-transparent" />
          </div>
        </div>

        {/* ================================================
            SCROLL LABEL
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-14
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-[#d8ad55]/25" />

          <span
            className="
              font-latin
              text-[7px]
              uppercase
              tracking-[0.45em]
              text-[#f7ead7]/35
            "
          >
            Scroll
          </span>

          <span className="h-px w-8 bg-[#d8ad55]/25" />
        </div>
      </div>

      {/* ===================================================
          LIGHTBOX
      =================================================== */}

      <AnimatePresence>
        {lightbox !== null && (
          <GalleryLightbox
            images={images}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}