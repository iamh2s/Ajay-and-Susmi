
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Heart,
  Music,
  Phone,
  X,
} from "lucide-react";

const STEPS = [
  {
    icon: Heart,
    target: null,
    title: "Welcome to Our Wedding",
    tamil: "எங்கள் திருமணத்திற்கு வரவேற்கிறோம்",
    text: "Welcome to Ajay & Susmi's wedding invitation. Let us show you how to explore our special day.",
    textTamil:
      "அஜய் மற்றும் சுஷ்மியின் திருமண அழைப்பிதழுக்கு அன்புடன் வரவேற்கிறோம்.",
  },
  {
    icon: Compass,
    target: 'button[aria-label="Open navigation"]',
    title: "Navigation Menu",
    tamil: "வழிசெலுத்தும் பட்டி",
    text: "Tap the menu button in the top-left corner to explore the wedding sections.",
    textTamil:
      "திருமண அழைப்பிதழின் பல்வேறு பகுதிகளைக் காண மேல் இடது மூலையில் உள்ள மெனு பொத்தானைத் தொடவும்.",
  },
  {
    icon: Phone,
    target: '[data-guide="contact"], button[aria-label="தொடர்பு"]',
    title: "Contact Button",
    tamil: "தொடர்பு பொத்தான்",
    text: "Tap the contact button to view the contact options and get in touch with us.",
    textTamil: "தொடர்பு விவரங்களைக் காண தொடர்பு பொத்தானைத் தொடவும்.",
  },
  {
    icon: Music,
    target: '[data-guide="music"], audio + div',
    title: "Music Button",
    tamil: "இசை பொத்தான்",
    text: "Tap the music button to turn the wedding background music on or off.",
    textTamil:
      "திருமணப் பின்னணி இசையை இயக்க அல்லது நிறுத்த இசை பொத்தானைத் தொடவும்.",
  },
  {
    icon: ArrowDown,
    target: null,
    title: "Explore Every Moment",
    tamil: "ஒவ்வொரு தருணத்தையும் காணுங்கள்",
    text: "Scroll gently to discover our story, family, wedding details, countdown and gallery.",
    textTamil:
      "எங்கள் கதை, குடும்பம், திருமண விவரங்கள் மற்றும் புகைப்படங்களைக் காண மெதுவாக ஸ்க்ரோல் செய்யுங்கள்.",
  },
] as const;

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default function Guide() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [hintAfterClose, setHintAfterClose] = useState(false);

  const isLast = step === STEPS.length - 1;

  // Open the guide one second after mounting.
  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  // Measure the highlighted element only when the layout may have changed.
  const measureTarget = useCallback(() => {
    const selector = STEPS[step].target;

    if (!selector) {
      setRect(null);
      return;
    }

    const element = document.querySelector(selector);

    if (!(element instanceof HTMLElement)) {
      setRect(null);
      return;
    }

    const bounds = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const visible =
      bounds.width > 0 &&
      bounds.height > 0 &&
      bounds.bottom > 0 &&
      bounds.top < viewportHeight &&
      bounds.right > 0 &&
      bounds.left < viewportWidth;

    if (!visible) {
      setRect(null);
      return;
    }

    const padding = 8;
    const left = Math.max(4, bounds.left - padding);
    const top = Math.max(4, bounds.top - padding);
    const right = Math.min(viewportWidth - 4, bounds.right + padding);
    const bottom = Math.min(viewportHeight - 4, bounds.bottom + padding);

    const nextRect: Rect = {
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(right - left),
      height: Math.round(bottom - top),
    };

    setRect((previous) => {
      if (
        previous &&
        previous.top === nextRect.top &&
        previous.left === nextRect.left &&
        previous.width === nextRect.width &&
        previous.height === nextRect.height
      ) {
        return previous;
      }

      return nextRect;
    });
  }, [step]);

  useEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }

    let frame = 0;

    const scheduleMeasure = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measureTarget();
      });
    };

    measureTarget();

    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.addEventListener("scroll", scheduleMeasure, {
      passive: true,
      capture: true,
    });
    window.addEventListener("orientationchange", scheduleMeasure);

    // ResizeObserver catches size changes without continuous polling.
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;

    if (observer) {
      observer.observe(document.documentElement);

      const selector = STEPS[step].target;
      const target = selector ? document.querySelector(selector) : null;

      if (target) observer.observe(target);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);

      observer?.disconnect();

      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure, true);
      window.removeEventListener("orientationchange", scheduleMeasure);
    };
  }, [open, step, measureTarget]);

  // Keyboard controls.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isLast) setHintAfterClose(true);
        setOpen(false);
      }

      if (event.key === "ArrowRight") {
        setStep((current) => Math.min(current + 1, STEPS.length - 1));
      }

      if (event.key === "ArrowLeft") {
        setStep((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, isLast]);

  // Dismiss the scroll hint when the visitor starts scrolling.
  useEffect(() => {
    if (!hintAfterClose) return;

    const hideHint = () => {
      if (window.scrollY > 40) setHintAfterClose(false);
    };

    const timer = window.setTimeout(() => setHintAfterClose(false), 8000);

    window.addEventListener("scroll", hideHint, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", hideHint);
    };
  }, [hintAfterClose]);

  const close = () => {
    if (isLast) setHintAfterClose(true);
    setOpen(false);
  };

  const next = () => {
    if (isLast) {
      close();
    } else {
      setStep((current) => Math.min(current + 1, STEPS.length - 1));
    }
  };

  const back = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const currentStep = STEPS[step];
  const Icon = currentStep.icon;
  const showScrollHint = (open && isLast) || hintAfterClose;

  const arrowPointsLeft = rect
    ? rect.left < window.innerWidth / 2
    : false;

  const arrowLeft = rect
    ? arrowPointsLeft
      ? Math.min(rect.left + rect.width + 5, window.innerWidth - 40)
      : Math.max(rect.left - 40, 4)
    : 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[10000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop and target cut-out */}
            {rect ? (
              <div
                aria-hidden="true"
                className="pointer-events-none fixed rounded-3xl"
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                  boxShadow: "0 0 0 9999px rgba(29,5,13,0.78)",
                }}
              />
            ) : (
              <button
                type="button"
                aria-label="Close guide backdrop"
                className="absolute inset-0 h-full w-full bg-[#1d050d]/80"
                onClick={close}
              />
            )}

            {/* Instruction card */}
            <div
              className="
                pointer-events-none absolute inset-0
                flex items-center justify-center
                px-3 sm:px-6
              "
              style={{
                paddingTop: "max(16px, env(safe-area-inset-top))",
                paddingBottom: isLast
                  ? "max(112px, env(safe-area-inset-bottom))"
                  : "max(16px, env(safe-area-inset-bottom))",
              }}
            >
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="guide-title"
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="
                  pointer-events-auto flex max-h-full min-h-[26rem]
                  w-full max-w-md flex-col overflow-y-auto
                  overscroll-contain rounded-3xl
                  border border-[#c7a45e]/60
                  bg-gradient-to-br from-[#641d2b] via-[#4c101e] to-[#2d0913]
                  px-4 py-5 text-[#fff8e9] shadow-2xl
                  sm:min-h-0 sm:p-6 lg:max-w-lg
                "
              >
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <p className="pt-2 text-[10px] uppercase leading-5 tracking-[0.16em] text-[#e3c98e] sm:text-[11px] sm:tracking-[0.2em]">
                    Ajay &amp; Susmi
                    <br className="sm:hidden" />
                    <span className="sm:before:content-['_·_']">
                      வழிகாட்டி
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close guide"
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full border border-[#d9bb79]/30
                      text-[#f7e9ce]/80 transition-colors
                      hover:bg-white/10
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Progress indicators */}
                <div className="mb-4 flex gap-1.5" aria-hidden="true">
                  {STEPS.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                        index <= step
                          ? "bg-[#e8cb86]"
                          : "bg-[#e8cb86]/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.16 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d9bb79]/45 bg-[#d9bb79]/10 text-[#f0d99e] sm:h-12 sm:w-12">
                        <Icon size={22} strokeWidth={1.6} />
                      </div>

                      <div className="min-w-0">
                        <h2
                          id="guide-title"
                          className="font-serif text-base font-semibold leading-tight text-[#fff4dd] sm:text-xl"
                        >
                          {currentStep.title}
                        </h2>

                        <p
                          lang="ta"
                          className="mt-1 text-[13px] font-medium leading-5 text-[#e8cb86] sm:text-sm"
                        >
                          {currentStep.tamil}
                        </p>
                      </div>
                    </div>

                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#d9bb79]/50 to-transparent" />

                    <p className="text-[13px] leading-6 text-[#fff6e8]/90 sm:text-sm">
                      {currentStep.text}
                    </p>

                    <p
                      lang="ta"
                      className="mt-3 text-[13px] leading-7 text-[#f0dcb7]/90 sm:text-sm"
                    >
                      {currentStep.textTamil}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Footer controls */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <button
                    type="button"
                    onClick={close}
                    className="py-2 pr-1 text-xs text-[#f7e9ce]/75 transition-colors hover:text-white"
                  >
                    Skip
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={back}
                        aria-label="Previous step"
                        className="
                          flex h-10 w-10 shrink-0 items-center justify-center
                          rounded-full border border-[#d9bb79]/45
                          text-[#f4dfae] transition-colors hover:bg-white/10
                        "
                      >
                        <ArrowLeft size={17} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={next}
                      className="
                        inline-flex min-h-10 items-center gap-1.5
                        rounded-full border border-[#f3dfaa]
                        bg-gradient-to-r from-[#f0d89e] to-[#c49b52]
                        px-4 text-xs font-semibold text-[#45101c]
                        transition-transform active:scale-95
                        sm:px-5 sm:text-sm
                      "
                    >
                      {isLast ? (
                        <>
                          Start <Check size={15} />
                        </>
                      ) : (
                        <>
                          Next <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Target highlight and directional arrow */}
            {rect && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none fixed rounded-3xl"
                  style={{
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    boxShadow: "0 0 22px rgba(233,204,133,0.4)",
                  }}
                >
                  <div className="absolute inset-0 animate-pulse rounded-3xl border-2 border-[#e9cc85]" />
                </div>

                <motion.div
                  aria-hidden="true"
                  className="
                    pointer-events-none fixed z-[10002]
                    flex h-9 w-9 items-center justify-center
                    rounded-full border border-[#e9cc85]/70
                    bg-[#2d0913]/95 text-[#f0d99e]
                    shadow-[0_0_14px_rgba(233,204,133,0.3)]
                  "
                  style={{
                    top: Math.max(
                      4,
                      Math.min(
                        rect.top + rect.height / 2 - 18,
                        window.innerHeight - 40
                      )
                    ),
                    left: arrowLeft,
                  }}
                  animate={{ x: [0, arrowPointsLeft ? -4 : 4, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {arrowPointsLeft ? (
                    <ArrowLeft size={21} strokeWidth={2.5} />
                  ) : (
                    <ArrowRight size={21} strokeWidth={2.5} />
                  )}
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll hint */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 z-[10001] flex justify-center px-3"
            style={{
              bottom: "max(20px, env(safe-area-inset-bottom))",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center gap-1.5 rounded-full border border-[#d9bb79]/60 bg-[#2d0913]/95 px-5 py-2.5 text-center shadow-xl sm:px-6 sm:py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0d99e] sm:text-xs">
                Scroll Down
              </p>

              <p
                lang="ta"
                className="text-xs font-medium text-[#fff4dd] sm:text-sm"
              >
                கீழே ஸ்க்ரோல் செய்யுங்கள்
              </p>

              <motion.span
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full border border-[#e9cc85]
                  bg-[#e9cc85]/15 text-[#f0d99e]
                "
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown size={16} strokeWidth={2} />
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
