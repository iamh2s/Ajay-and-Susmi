import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ArrowDown, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { gsap } from "../lib/gsap";
import data from "@/data/weddingData.json";
import { GoldDivider } from "./decor";
import { cn } from "@/utils/cn";

type GalleryImage = {
  src: string;
  alt: string;
};

/* =========================================================
   HINT TEXT (English + Tamil)
========================================================= */

const hintText = {
  start: {
    en: "Scroll down to move sideways",
    ta: "கீழே ஸ்க்ரோல் செய்யவும், பக்கவாட்டில் நகரும்",
  },
  next: {
    en: "Scroll down to go to the next section",
    ta: "அடுத்த பகுதிக்குச் செல்ல கீழே ஸ்க்ரோல் செய்யவும்",
  },
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
      {Array.from({ length: 34 }, (_, index) => (
        <span
          key={index}
          className="h-[5px] w-[11px] shrink-0 rounded-[2px] bg-[#f4e7cf]/10 sm:h-[6px] sm:w-[14px] md:h-[7px] md:w-[16px]"
        />
      ))}
    </div>
  );
}

/* =========================================================
   HINT PILL (shared by start and end hints)
========================================================= */

function HintPill({
  en,
  ta,
  className,
}: {
  en: string;
  ta: string;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "relative flex w-fit max-w-full flex-col items-center",
        "gap-0.5 rounded-xl border border-[#d8ad55]/60 bg-[#080304]/85 px-3 py-1.5",
        "shadow-[0_0_20px_-8px_rgba(216,173,85,0.45)]",
        "sm:gap-1 sm:px-5 sm:py-2 md:px-6",
        className
      )}
    >
      {/* Pulsing dot */}
      <span className="absolute -left-1 -top-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ad55]/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f0d38a] sm:h-3 sm:w-3" />
      </span>

      <p className="text-center font-latin text-[9px] font-medium uppercase leading-snug tracking-[0.18em] text-[#f0d38a] sm:text-[11px] sm:tracking-[0.22em] md:text-xs">
        {en}
      </p>

      <p
        lang="ta"
        className="text-center text-[10px] leading-snug tracking-[0.02em] text-[#f7ead7]/85 sm:text-xs md:text-sm"
        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
      >
        {ta}
      </p>

      <ArrowDown className="mt-0.5 h-3 w-3 animate-bounce text-[#d8ad55] sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
    </div>
  );
}

/* =========================================================
   START HINT (above the frames, fades after first image)
========================================================= */

function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "relative z-20 flex w-full justify-center px-4",
        "pt-11 pb-2 sm:pt-12 sm:pb-4 md:pt-14 md:pb-6",
        "transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <HintPill en={hintText.start.en} ta={hintText.start.ta} />
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
}: {
  image: GalleryImage;
  index: number;
  total: number;
}) {
  const tall = index % 3 === 1;

  return (
    <figure
      data-gallery-image={index}
      className={cn(
        "relative shrink-0",
        "w-[78vw] sm:w-[62vw] md:w-[47vw]",
        "max-w-[680px] lg:w-[42vw] xl:w-[38vw]"
      )}
    >
      <div className="relative border border-[#d8ad55]/40 bg-[#16070b] p-2 pb-3 shadow-[0_25px_55px_-30px_rgba(0,0,0,0.8)] sm:p-2.5 sm:pb-3.5 md:p-3">
        <div className="relative overflow-hidden">
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
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              draggable={false}
              className="block h-full w-full select-none object-cover"
              sizes="(max-width: 639px) 78vw, (max-width: 767px) 62vw, (max-width: 1023px) 47vw, 680px"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120307]/60 via-transparent to-[#120307]/10"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_45px_rgba(0,0,0,0.3)]"
            />
          </div>

          <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-sm bg-[#17060b]/65 px-2 py-1 font-latin text-[8px] tracking-[0.28em] text-[#f0d38a]/85 sm:right-3 sm:top-3 sm:text-[9px]">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

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
   MAIN GALLERY
========================================================= */

export default function GallerySection() {
  const { gallery } = data;
  const images = gallery.images as GalleryImage[];

  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const [extra, setExtra] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  /* =======================================================
     MEASURE FILMSTRIP WIDTH
  ======================================================= */

  useLayoutEffect(() => {
    const element = track.current;

    if (!element) return;

    let animationFrame = 0;

    const measure = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const currentTrack = track.current;

        if (!currentTrack) return;

        const distance = Math.max(
          0,
          currentTrack.scrollWidth - window.innerWidth
        );

        setExtra((previous) =>
          Math.abs(previous - distance) < 1
            ? previous
            : distance
        );
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    window.addEventListener("resize", measure, {
      passive: true,
    });

    const imageElements = element.querySelectorAll("img");

    imageElements.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", measure);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();

      window.removeEventListener("resize", measure);

      imageElements.forEach((image) => {
        image.removeEventListener("load", measure);
      });
    };
  }, [images.length]);

  /* =======================================================
     MATCH GSAP SCROLL DISTANCE
  ======================================================= */

  const getScrollDistance = useCallback(() => {
    const width = window.innerWidth;

    const extraViewport =
      width >= 1024
        ? window.innerHeight * 0.35
        : width >= 640
          ? window.innerHeight * 0.25
          : window.innerHeight * 0.18;

    return extra + extraViewport;
  }, [extra]);

  /* =======================================================
     PREVIOUS / NEXT IMAGE NAVIGATION
  ======================================================= */

  const goToImage = useCallback(
    (nextIndex: number) => {
      const section = root.current;
      const element = track.current;

      if (!section || !element || images.length === 0) return;

      const frames = Array.from(
        element.querySelectorAll<HTMLElement>(
          "[data-gallery-image]"
        )
      );

      if (!frames.length) return;

      const index = Math.max(
        0,
        Math.min(images.length - 1, nextIndex)
      );

      const frame = frames[index];

      if (!frame) return;

      const frameCenter =
        frame.offsetLeft + frame.offsetWidth / 2;

      const desiredProgress =
        extra > 0
          ? (frameCenter - window.innerWidth / 2) / extra
          : 0;

      const progress = Math.max(
        0,
        Math.min(1, desiredProgress)
      );

      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY;

      const targetScroll =
        sectionTop + progress * getScrollDistance();

      setCurrentImage(index);

      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
      });
    },
    [extra, getScrollDistance, images.length]
  );

  /* =======================================================
     SYNCHRONIZE ACTIVE IMAGE DURING SCROLLING
  ======================================================= */

  useEffect(() => {
    let frameId = 0;

    const updateCurrentImage = () => {
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        frameId = 0;

        const element = track.current;
        const section = root.current;

        if (
          !element ||
          !section ||
          images.length === 0 ||
          extra <= 0
        ) {
          return;
        }

        const frames = Array.from(
          element.querySelectorAll<HTMLElement>(
            "[data-gallery-image]"
          )
        );

        if (!frames.length) return;

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.scrollY - sectionTop) /
              getScrollDistance()
          )
        );

        const translateX = extra * progress;
        const viewportCenter = window.innerWidth / 2;

        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        frames.forEach((frame, index) => {
          const center =
            frame.offsetLeft +
            frame.offsetWidth / 2 -
            translateX;

          const difference = Math.abs(
            center - viewportCenter
          );

          if (difference < nearestDistance) {
            nearestDistance = difference;
            nearestIndex = index;
          }
        });

        setCurrentImage((previous) =>
          previous === nearestIndex
            ? previous
            : nearestIndex
        );
      });
    };

    updateCurrentImage();

    window.addEventListener("scroll", updateCurrentImage, {
      passive: true,
    });

    window.addEventListener("resize", updateCurrentImage, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener(
        "scroll",
        updateCurrentImage
      );

      window.removeEventListener(
        "resize",
        updateCurrentImage
      );
    };
  }, [extra, getScrollDistance, images.length]);

  /* =======================================================
     GSAP HORIZONTAL SCROLL
  ======================================================= */

  useLayoutEffect(() => {
    const section = root.current;
    const element = track.current;

    if (!section || !element || extra <= 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const setupScroll = (
        minWidth: number,
        maxWidth: number | null,
        viewportFactor: number,
        scrub: number
      ) => {
        const query =
          maxWidth === null
            ? `(min-width: ${minWidth}px)`
            : `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;

        mm.add(query, () => {
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
                `+=${extra + window.innerHeight * viewportFactor}`,
              scrub,
              pin: false,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
        });
      };

      setupScroll(1024, null, 0.35, 0.7);
      setupScroll(640, 1023, 0.25, 0.55);
      setupScroll(0, 639, 0.18, 0.35);

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [extra]);

  /* =======================================================
     REFRESH AFTER MEASUREMENT CHANGES
  ======================================================= */

  useLayoutEffect(() => {
    if (extra <= 0) return;

    const frame = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });

    return () => cancelAnimationFrame(frame);
  }, [extra]);

  /* =======================================================
     SECTION HEIGHT
  ======================================================= */

  const sectionHeight =
    extra > 0
      ? `calc(100svh + ${extra + 180}px)`
      : "100svh";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="gallery"
      ref={root}
      aria-label={`${gallery.headingTa} — ${gallery.headingEn}`}
      className="relative overflow-clip bg-[#13070a]"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Top film band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-9 border-b border-[#f7ead7]/10 bg-[#080304] sm:h-10"
        >
          <div className="mt-2">
            <FilmHoles />
          </div>
        </div>

        {/* Bottom film band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-9 border-t border-[#f7ead7]/10 bg-[#080304] sm:h-10"
        >
          <div className="mt-2">
            <FilmHoles />
          </div>
        </div>

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(216,173,85,.8), transparent 42%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, #d8ad55 50%, transparent 100%)",
          }}
        />

        {/* Start hint above the frames */}
        {images.length > 0 && (
          <ScrollHint visible={currentImage === 0} />
        )}

        {/* Filmstrip */}
        <div
          ref={track}
          className="relative z-10 flex w-max items-center gap-6 pl-[7vw] pr-[14vw] will-change-transform transform-gpu sm:gap-9 sm:pl-[7vw] sm:pr-[15vw] md:gap-12 lg:gap-16"
        >
          {/* Intro panel */}
          <div className="w-[78vw] shrink-0 sm:w-[58vw] md:w-[38vw] lg:w-[31vw]">
            <p className="font-latin text-[8px] uppercase tracking-[0.5em] text-[#d8ad55]/80 sm:text-[9px]">
              Our Memories
            </p>

            <h2 className="mt-4 font-latin text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.9] text-[#f7ead7] sm:mt-5">
              Frames
              <br />
              of our
              <br />
              <span className="text-[#d8ad55]">story</span>
            </h2>

            <div className="mt-6">
              <GoldDivider
                motif="diamond"
                widthClass="w-24"
                className="text-[#d8ad55]/65"
              />
            </div>

            <p className="mt-6 max-w-sm font-latin text-sm italic leading-relaxed text-[#f7ead7]/50 sm:text-base">
              Every photograph holds a moment.
              Every moment becomes a memory.
            </p>
          </div>

          {/* Gallery images */}
          {images.map((image, index) => (
            <FilmFrame
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              total={images.length}
            />
          ))}

          {/* End panel */}
          <div className="flex w-[72vw] shrink-0 flex-col items-center justify-center gap-5 sm:w-[52vw] sm:gap-6 md:w-[32vw]">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d8ad55] to-transparent" />

            <p className="max-w-sm text-center font-latin text-[clamp(1.4rem,3vw,2.2rem)] font-light italic leading-snug text-[#f7ead7]/70">
              And the most beautiful{" "}
              <Heart
                aria-hidden="true"
                className="mx-2 inline-block h-5 w-5 translate-y-[2px] text-[#d8ad55]"
                strokeWidth={1.3}
              />{" "}
              memories are still being made.
            </p>

            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d8ad55] to-transparent" />

            {/* Next-section hint */}
            <HintPill
              en={hintText.next.en}
              ta={hintText.next.ta}
              className="max-w-[90%]"
            />
          </div>
        </div>

        {/* Previous / next buttons */}
        {images.length > 0 && (
          <div className="pointer-events-none absolute inset-x-3 bottom-28 z-40 flex items-center justify-between sm:inset-x-6 sm:bottom-32 md:inset-x-8">
            <button
              type="button"
              onClick={() => goToImage(currentImage - 1)}
              disabled={currentImage === 0}
              aria-label="Previous image"
              title="Previous image"
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ad55]/60 bg-[#080304]/80 text-[#f0d38a] shadow-lg transition hover:border-[#f0d38a] hover:bg-[#d8ad55]/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:h-11 sm:w-11"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <span className="sr-only" aria-live="polite">
              Image {currentImage + 1} of {images.length}
            </span>

            <button
              type="button"
              onClick={() => goToImage(currentImage + 1)}
              disabled={currentImage >= images.length - 1}
              aria-label="Next image"
              title="Next image"
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ad55]/60 bg-[#080304]/80 text-[#f0d38a] shadow-lg transition hover:border-[#f0d38a] hover:bg-[#d8ad55]/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:h-11 sm:w-11"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}