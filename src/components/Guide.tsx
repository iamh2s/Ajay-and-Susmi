import { useEffect, useState } from "react";
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
      "அஜய் மற்றும் சுஸ்மியின் திருமண அழைப்பிதழுக்கு அன்புடன் வரவேற்கிறோம்.",
  },
  {
    icon: Compass,
    target: '[data-guide="nav"], nav[aria-label="Wedding sections"]',
    title: "Navigation Bar",
    tamil: "வழிசெலுத்தும் பட்டி",
    text: "Use these golden icons to jump between the sections of our invitation.",
    textTamil:
      "இந்தத் தங்க நிற ஐகான்களைத் தொட்டு திருமண அழைப்பிதழின் பகுதிகளுக்குச் செல்லலாம்.",
  },
  {
    icon: Phone,
    target: '[data-guide="contact"], button[aria-label="தொடர்பு"]',
    title: "Contact Button",
    tamil: "தொடர்பு பொத்தான்",
    text: "Tap here to view the contact options and get in touch with us.",
    textTamil: "இங்கே தொட்டு தொடர்பு விவரங்களைக் காணலாம்.",
  },
  {
    icon: Music,
    target: '[data-guide="music"], audio + div',
    title: "Music Button",
    tamil: "இசை பொத்தான்",
    text: "Tap here to play or pause the wedding background music.",
    textTamil: "இங்கே தொட்டு பின்னணி இசையை இயக்கலாம் அல்லது நிறுத்தலாம்.",
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

type Rect = { top: number; left: number; width: number; height: number };

export default function Guide() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [hintAfterClose, setHintAfterClose] = useState(false);

  const isLast = step === STEPS.length - 1;

  // Show the guide 1 second after it mounts
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Measure the highlighted element (re-measures so it fits every screen)
  useEffect(() => {
    if (!open) return;

    const selector = STEPS[step].target;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const el = selector ? document.querySelector(selector) : null;

      if (!el) {
        setRect((prev) => (prev === null ? prev : null));
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
        setRect((prev) => (prev === null ? prev : null));
        return;
      }

      // Add padding, then keep the highlight fully inside the screen
      const pad = 8;
      const left = Math.max(4, r.left - pad);
      const top = Math.max(4, r.top - pad);
      const right = Math.min(vw - 4, r.right + pad);
      const bottom = Math.min(vh - 4, r.bottom + pad);

      const next = {
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

    measure();
    const interval = window.setInterval(measure, 250);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [open, step]);

  // Escape closes, arrow keys move between steps
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (step === STEPS.length - 1) setHintAfterClose(true);
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

  // After the guide closes: hide the scroll hint once the visitor scrolls
  // (or automatically after 8 seconds)
  useEffect(() => {
    if (!hintAfterClose) return;

    const hide = () => {
      if (window.scrollY > 40) setHintAfterClose(false);
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
            {/* Dark backdrop: full screen, or a cut-out around the target */}
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

            {/* CENTERED CARD
                Phones: 72px free space on each side, so the card sits between
                the contact tab (left) and the nav bar (right).
                Tablet / laptop / desktop: normal side spacing. */}
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
                // extra room at the bottom on the last step for the scroll hint
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
                    <span className="sm:before:content-['_·_']">வழிகாட்டி</span>
                  </p>

                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close guide"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9bb79]/30 text-[#f7e9ce]/80 hover:bg-white/10"
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

                {/* Step content */}
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

                {/* Footer (pinned to the bottom of the card) */}
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
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9bb79]/45 text-[#f4dfae] hover:bg-white/10"
                      >
                        <ArrowLeft size={17} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#f3dfaa] bg-gradient-to-r from-[#f0d89e] to-[#c49b52] px-4 text-xs font-semibold text-[#45101c] active:scale-95 sm:px-5 sm:text-sm"
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

            {/* Gold pulsing ring around the highlighted button */}
            {rect && (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL DOWN HINT: last step + after the guide closes */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 z-[10001] flex justify-center px-3"
            style={{ bottom: "max(20px, env(safe-area-inset-bottom))" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-1.5 rounded-full border border-[#d9bb79]/60 bg-[#2d0913]/85 px-5 py-2.5 text-center shadow-xl backdrop-blur-md sm:px-6 sm:py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f0d99e] sm:text-xs">
                Scroll Down
              </p>

              <p
                lang="ta"
                className="text-xs font-medium text-[#fff4dd] sm:text-sm"
              >
                கீழே ஸ்க்ரோல் செய்யுங்கள்
              </p>

              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e9cc85] bg-[#e9cc85]/15 text-[#f0d99e]"
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 1.2,
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