
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { gsap } from "../lib/gsap";
import data from "@/data/weddingData.json";
import { GoldDivider } from "./decor";
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
      {Array.from({ length: 34 }).map((_, index) => (
        <span
          key={index}
          className="h-[5px] w-[11px] shrink-0 rounded-[2px] bg-[#f4e7cf]/10 sm:h-[6px] sm:w-[14px] md:h-[7px] md:w-[16px]"
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
        "lg:w-[42vw] xl:w-[38vw] max-w-[680px]"
      )}
    >
      <div className="relative border border-[#d8ad55]/40 bg-[#16070b] p-2 pb-3 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:p-2.5 sm:pb-3.5 md:p-3">
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
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index < 2 ? "high" : "auto"}
              draggable={false}
              className="block h-full w-full select-none object-cover transform-gpu"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120307]/70 via-transparent to-[#120307]/10"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.4)]"
            />
          </div>

          <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-sm bg-[#17060b]/65 px-2 py-1 font-latin text-[8px] tracking-[0.28em] text-[#f0d38a]/85 backdrop-blur-sm sm:right-3 sm:top-3 sm:text-[9px]">
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
        behavior: "smooth",
      });
    },
    [extra, getScrollDistance, images.length]
  );

  /* =======================================================
     SYNCHRONIZE ACTIVE IMAGE DURING MANUAL SCROLLING
  ======================================================= */

  useEffect(() => {
    let frameId = 0;

    const updateCurrentImage = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
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

    window.addEventListener("resize", updateCurrentImage);

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

      // Desktop
      mm.add("(min-width: 1024px)", () => {
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
            pin: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });
      });

      // Tablet
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
              pin: false,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              fastScrollEnd: true,
            },
          });
        }
      );

      // Mobile
      mm.add("(max-width: 639px)", () => {
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
            pin: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [extra]);

  /* =======================================================
     REFRESH SCROLLTRIGGER AFTER MEASUREMENT CHANGES
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
        {/* TOP FILM BAND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-9 border-b border-[#f7ead7]/10 bg-[#080304] sm:h-10"
        >
          <div className="mt-2">
            <FilmHoles />
          </div>
        </div>

        {/* BOTTOM FILM BAND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-9 border-t border-[#f7ead7]/10 bg-[#080304] sm:h-10"
        >
          <div className="mt-2">
            <FilmHoles />
          </div>
        </div>

        {/* BACKGROUND GLOW */}

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

        {/* FILMSTRIP */}

        <div
          ref={track}
          className="relative z-10 flex w-max items-center gap-6 pl-[7vw] pr-[14vw] will-change-transform transform-gpu sm:gap-9 sm:pl-[7vw] sm:pr-[15vw] md:gap-12 lg:gap-16"
        >
          {/* INTRO PANEL */}

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

          {/* GALLERY IMAGES */}

          {images.map((image, index) => (
            <FilmFrame
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              total={images.length}
            />
          ))}

          {/* END PANEL */}

          <div className="flex w-[72vw] shrink-0 flex-col items-center justify-center sm:w-[52vw] md:w-[32vw]">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#d8ad55] to-transparent" />

            <p className="mt-6 max-w-sm text-center font-latin text-[clamp(1.4rem,3vw,2.2rem)] font-light italic leading-snug text-[#f7ead7]/70">
              And the most beautiful{" "}
              <Heart
                aria-hidden="true"
                className="mx-2 inline-block h-5 w-5 translate-y-[2px] text-[#d8ad55]"
                strokeWidth={1.3}
              />{" "}
              memories are still being made.
            </p>

            <div className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d8ad55] to-transparent" />
          </div>
        </div>

        {/* PREVIOUS / NEXT ARROWS */}

        {images.length > 0 && (
          <div className="pointer-events-none absolute inset-x-3 bottom-28 z-40 flex items-center justify-between sm:inset-x-6 sm:bottom-32 md:inset-x-8">
            <button
              type="button"
              onClick={() => goToImage(currentImage - 1)}
              disabled={currentImage === 0}
              aria-label="Previous image"
              title="Previous image"
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ad55]/60 bg-[#080304]/80 text-[#f0d38a] shadow-lg backdrop-blur-md transition hover:border-[#f0d38a] hover:bg-[#d8ad55]/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:h-11 sm:w-11"
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
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#d8ad55]/60 bg-[#080304]/80 text-[#f0d38a] shadow-lg backdrop-blur-md transition hover:border-[#f0d38a] hover:bg-[#d8ad55]/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:h-11 sm:w-11"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
