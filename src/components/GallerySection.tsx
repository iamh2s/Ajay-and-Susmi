import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import data from "@/data/weddingData.json";
import { GoldDivider, ScrollReveal, SectionHeading } from "./decor";
import { cn } from "@/utils/cn";

function Lightbox({
  index,
  total,
  alt,
  src,
  onClose,
  onNav,
}: {
  index: number;
  total: number;
  alt: string;
  src: string;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const reduce = useReducedMotion();

  const nav = useCallback(
    (dir: 1 | -1) => {
      setZoomed(false);
      onNav(dir);
    },
    [onNav]
  );

  useEffect(() => {
    document.documentElement.classList.add("scroll-locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, nav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-maroon-deep/95 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
    >
      <div aria-hidden="true" className="kolam-dots absolute inset-0 opacity-30" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-maroon/70 text-gold-light backdrop-blur transition-colors hover:bg-maroon focus-visible:bg-maroon"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nav(-1);
        }}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-maroon/70 text-gold-light backdrop-blur transition-colors hover:bg-maroon sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nav(1);
        }}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-maroon/70 text-gold-light backdrop-blur transition-colors hover:bg-maroon sm:right-6"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-h-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[1.6rem] bg-gradient-to-b from-gold-light via-gold to-gold-deep p-[2.5px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
          <div className="overflow-hidden rounded-[calc(1.6rem-2.5px)] border border-gold-deep/40 bg-maroon">
            <motion.img
              src={src}
              alt={alt}
              draggable={false}
              animate={{ scale: zoomed && !reduce ? 1.7 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              drag={zoomed || reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.55}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) nav(1);
                else if (info.offset.x > 70) nav(-1);
              }}
              onClick={() => setZoomed((z) => !z)}
              className={cn(
                "max-h-[70vh] w-auto max-w-[86vw] select-none object-contain sm:max-h-[76vh] sm:max-w-[76vw]",
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              )}
            />
          </div>
        </div>
        <figcaption className="mt-5 max-w-xl px-4 text-center">
          <p className="font-latin text-sm italic text-ivory/80">{alt}</p>
          <p className="mt-2 font-latin text-xs uppercase tracking-[0.34em] text-gold-light/75">
            {index + 1} / {total}
          </p>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function GallerySection() {
  const { gallery } = data;
  const [open, setOpen] = useState<number | null>(null);

  const navigate = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + gallery.images.length) % gallery.images.length)),
    [gallery.images.length]
  );

  return (
    <section
      id="gallery"
      aria-label={`${gallery.headingTa} — ${gallery.headingEn}`}
      className="paper-texture relative overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden="true" className="kolam-dots-ivory absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={gallery.headingTa} en={gallery.headingEn} />
        </ScrollReveal>
        <ScrollReveal delay={0.12} className="mt-6 flex justify-center">
          <GoldDivider motif="diamond" className="text-gold-deep/70" widthClass="w-40" />
        </ScrollReveal>

        <div className="mt-14 columns-2 gap-4 sm:gap-5 md:columns-3">
          {gallery.images.map((img, i) => {
            const arch = i % 4 === 0;
            return (
              <ScrollReveal key={img.src} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid sm:mb-5">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo ${i + 1}: ${img.alt}`}
                  className={cn(
                    "group relative block w-full overflow-hidden border border-gold/55 bg-ivory-deep p-1.5 shadow-[0_22px_50px_-26px_rgba(46,8,16,0.55)] transition-transform duration-700 hover:-translate-y-1.5",
                    arch ? "rounded-t-[5.5rem] rounded-b-2xl" : "rounded-2xl"
                  )}
                >
                  <span className={cn("block overflow-hidden", arch ? "rounded-t-[4.8rem] rounded-b-xl" : "rounded-xl")}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-1.5 flex items-end justify-end bg-gradient-to-t from-maroon-deep/55 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-light/70 bg-maroon-deep/70 text-gold-light backdrop-blur-sm">
                      <Expand className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            index={open}
            total={gallery.images.length}
            alt={gallery.images[open].alt}
            src={gallery.images[open].src}
            onClose={() => setOpen(null)}
            onNav={navigate}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
