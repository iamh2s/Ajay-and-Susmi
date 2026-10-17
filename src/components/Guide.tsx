import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
];

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const RING_RADIUS = 21;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/* ------------------------------------------------------------------ */
/* Index-finger swipe hand (drawn in code)                             */
/* ------------------------------------------------------------------ */

function SwipeHand({
  flipped,
  reduce,
}: {
  flipped: boolean;
  reduce: boolean | null;
}) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 items-center justify-center"
      style={{
        transform: flipped ? "rotate(180deg)" : undefined,
        transition: "transform 0.4s ease",
      }}
    >
      <motion.svg
        viewBox="0 0 48 48"
        width={36}
        height={36}
        fill="none"
        stroke="#f0d99e"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduce ? undefined : { y: [6, -6, 6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Ripple at the fingertip */}
        {!reduce && (
          <motion.circle
            cx={22.5}
            cy={5}
            fill="none"
            stroke="#e9cc85"
            strokeWidth={1}
            animate={{ r: [2, 9], opacity: [0.8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Raised index finger */}
        <path
          d="M19 26V10.5a3.5 3.5 0 0 1 7 0V26"
          fill="#f0d99e"
          fillOpacity={0.15}
        />

        {/* Curled middle, ring and little fingers */}
        <path d="M26 21h3a3 3 0 0 1 3 3v3" />
        <path d="M26 21v6" opacity={0.6} />
        <path d="M30.5 24v4" opacity={0.6} />

        {/* Closed fist and tucked thumb */}
        <path d="M19 26l-5-2.2c-1.3-.5-2.5.4-2.3 1.8.2 1.2 1 2.2 2.2 2.9L19 35" />
        <path d="M19 35c0 2.5 1.8 4 4.5 4H30c3.3 0 5.5-2.2 5.5-5.5V27" />
      </motion.svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll cue: progress ring + swipe hand                              */
/* ------------------------------------------------------------------ */

function ScrollCue() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const atEnd = progress >= 0.97;

  return (
    <div className="flex items-center gap-3 rounded-full border border-[#d9bb79]/60 bg-[#2d0913]/85 py-2 pl-2 pr-5 shadow-xl backdrop-blur-md">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        {/* Pulse ring */}
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[#e9cc85]/70"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Progress ring */}
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="absolute inset-0 -rotate-90"
        >
          <circle
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="#e9cc85"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="#e9cc85"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.3s linear" }}
          />
        </svg>

        <SwipeHand flipped={atEnd} reduce={reduce} />
      </div>

      <div className="flex flex-col items-start text-left leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f0d99e] sm:text-xs">
          {atEnd ? "Back to Top" : "Scroll Down"}
        </p>
        <p
          lang="ta"
          className="mt-0.5 text-xs font-medium text-[#fff4dd] sm:text-sm"
        >
          {atEnd ? "மேலே செல்லுங்கள்" : "கீழே ஸ்க்ரோல் செய்யுங்கள்"}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Guide                                                               */
/* ------------------------------------------------------------------ */

export default function Guide() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [hintAfterClose, setHintAfterClose] = useState(false);

  const isLast = step === STEPS.length - 1;

  // Open guide one second after mounting
  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  // Find and highlight the target element.
  // Uses scroll/resize listeners with rAF throttling instead of setInterval.
  useEffect(() => {
    if (!open) return;

    const selector = STEPS[step].target;
    let frame = 0;

    const measure = () => {
      frame = 0;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const el = selector ? document.querySelector(selector) : null;

      if (!el) {
        setRect(null);
        return;
      }

      const r = el.getBoundingClientRect();

      const visible =
        r.width > 0 &&
        r.height > 0 &&
        r.bottom > 0 &&
        r.top < vh &&
        r.right > 0 &&
        r.left < vw;

      if (!visible) {
        setRect(null);
        return;
      }

      const pad = 8;
      const left = Math.max(4, r.left - pad);
      const top = Math.max(4, r.top - pad);
      const right = Math.min(vw - 4, r.right + pad);
      const bottom = Math.min(vh - 4, r.bottom + pad);

      const next: Rect = {
        top: Math.round(top),
        left: Math.round(left),
        width: Math.round(right - left),
        height: Math.round(bottom - top),
      };

      setRect((prev) =>
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next
      );
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    // Re-measure once after layout and fonts settle
    const settle = window.setTimeout(schedule, 400);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    return () => {
      window.clearTimeout(settle);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [open, step]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (step === STEPS.length - 1) {
          setHintAfterClose(true);
        }
        setOpen(false);
      }

      if (e.key === "ArrowRight") {
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
      }

      if (e.key === "ArrowLeft") {
        setStep((s) => Math.max(s - 1, 0));
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  // Keep the scroll cue after the guide closes until the user scrolls or 8s pass
  useEffect(() => {
    if (!hintAfterClose) return;

    const hide = () => {
      if (window.scrollY > 40) {
        setHintAfterClose(false);
      }
    };

    const timer = window.setTimeout(() => setHintAfterClose(false), 8000);

    window.addEventListener("scroll", hide, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", hide);
    };
  }, [hintAfterClose]);

  const close = () => {
    if (isLast) setHintAfterClose(true);
    setOpen(false);
  };

  const next = () => (isLast ? close() : setStep((s) => s + 1));

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const { icon: Icon, title, tamil, text, textTamil } = STEPS[step];

  const showScrollHint = (open && isLast) || hintAfterClose;

  // Point the arrow toward the highlighted target
  const arrowPointsLeft = rect ? rect.left < window.innerWidth / 2 : false;

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
            transition={{ duration: 0.25 }}
          >
            {/* Dark backdrop with highlighted cut-out */}
            {rect ? (
              <div
                aria-hidden="true"
                className="pointer-events-none fixed rounded-3xl transition-all duration-300"
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                  boxShadow: "0 0 0 9999px rgba(29,5,13,0.78)",
                }}
              />
            ) : (
              <div
                className="absolute inset-0 bg-[#1d050d]/78"
                onClick={close}
              />
            )}

            {/* Instruction card */}
            <div
              className="
                pointer-events-none absolute inset-0
                flex items-center justify-center
                pl-[72px] pr-[72px]
                sm:pl-[max(24px,env(safe-area-inset-left))]
                sm:pr-[max(24px,env(safe-area-inset-right))]
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="
                  pointer-events-auto flex max-h-full w-full flex-col
                  overflow-y-auto overscroll-contain
                  rounded-3xl border border-[#c7a45e]/60
                  bg-gradient-to-br from-[#641d2b] via-[#4c101e] to-[#2d0913]
                  px-3.5 py-5 text-[#fff8e9] shadow-2xl
                  min-h-[26rem]
                  sm:min-h-0 sm:max-w-md sm:p-6
                  lg:max-w-lg
                "
              >
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <p className="pt-2 text-[9px] uppercase leading-4 tracking-[0.18em] text-[#e3c98e] sm:text-[11px] sm:tracking-[0.2em]">
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
                      text-[#f7e9ce]/80 hover:bg-white/10
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Progress */}
                <div className="mb-4 flex gap-1.5" aria-hidden="true">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= step ? "bg-[#e8cb86]" : "bg-[#e8cb86]/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Animated step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
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
                          {title}
                        </h2>

                        <p
                          lang="ta"
                          className="mt-1 text-[13px] font-medium leading-5 text-[#e8cb86] sm:text-sm"
                        >
                          {tamil}
                        </p>
                      </div>
                    </div>

                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#d9bb79]/50 to-transparent" />

                    <p className="text-[13px] leading-6 text-[#fff6e8]/90 sm:text-sm">
                      {text}
                    </p>

                    <p
                      lang="ta"
                      className="mt-3 text-[13px] leading-7 text-[#f0dcb7]/90 sm:text-sm"
                    >
                      {textTamil}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <button
                    type="button"
                    onClick={close}
                    className="py-2 pr-1 text-xs text-[#f7e9ce]/75 hover:text-white"
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
                          text-[#f4dfae] hover:bg-white/10
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
                        active:scale-95 sm:px-5 sm:text-sm
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

            {/* Gold highlight and animated directional arrow */}
            {rect && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none fixed rounded-3xl transition-all duration-300"
                  style={{
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    boxShadow: "0 0 30px rgba(233,204,133,0.5)",
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
                    shadow-[0_0_18px_rgba(233,204,133,0.35)]
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
                  animate={{ x: [0, arrowPointsLeft ? -5 : 5, 0] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {arrowPointsLeft ? (
                    <ArrowLeft size={22} strokeWidth={2.5} />
                  ) : (
                    <ArrowRight size={22} strokeWidth={2.5} />
                  )}
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll cue */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 z-[10001] flex justify-center px-3"
            style={{
              bottom: "max(20px, env(safe-area-inset-bottom))",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <ScrollCue />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}