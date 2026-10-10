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
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") {
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
      }
      if (e.key === "ArrowLeft") {
        setStep((s) => Math.max(s - 1, 0));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const isLast = step === STEPS.length - 1;
  const next = () => (isLast ? close() : setStep((s) => s + 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const { icon: Icon, title, tamil, text, textTamil } = STEPS[step];

  return (
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

          {/* CENTERED CARD (works on mobile, tablet, laptop, desktop) */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{
              paddingTop: "max(12px, env(safe-area-inset-top))",
              paddingBottom: "max(12px, env(safe-area-inset-bottom))",
              paddingLeft: "max(12px, env(safe-area-inset-left))",
              paddingRight: "max(12px, env(safe-area-inset-right))",
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-auto max-h-full w-full max-w-[22rem] overflow-y-auto overscroll-contain rounded-3xl border border-[#c7a45e]/60 bg-gradient-to-br from-[#641d2b] via-[#4c101e] to-[#2d0913] p-4 text-[#fff8e9] shadow-2xl sm:max-w-md sm:p-6 lg:max-w-lg"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#e3c98e] sm:text-[11px]">
                  Ajay &amp; Susmi · வழிகாட்டி
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
              <div className="mb-3 flex gap-1.5" aria-hidden="true">
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
                        className="font-serif text-lg font-semibold leading-tight text-[#fff4dd] sm:text-xl"
                      >
                        {title}
                      </h2>
                      <p
                        lang="ta"
                        className="mt-0.5 text-sm font-medium text-[#e8cb86]"
                      >
                        {tamil}
                      </p>
                    </div>
                  </div>

                  <div className="my-3 h-px bg-gradient-to-r from-transparent via-[#d9bb79]/50 to-transparent" />

                  <p className="text-sm leading-6 text-[#fff6e8]/90">{text}</p>

                  <p
                    lang="ta"
                    className="mt-2 text-sm leading-7 text-[#f0dcb7]/90"
                  >
                    {textTamil}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={close}
                  className="px-2 py-2 text-xs text-[#f7e9ce]/75 hover:text-white"
                >
                  Skip
                </button>

                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      aria-label="Previous step"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9bb79]/45 text-[#f4dfae] hover:bg-white/10"
                    >
                      <ArrowLeft size={17} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#f3dfaa] bg-gradient-to-r from-[#f0d89e] to-[#c49b52] px-5 text-sm font-semibold text-[#45101c] active:scale-95"
                  >
                    {isLast ? (
                      <>
                        Start Exploring <Check size={16} />
                      </>
                    ) : (
                      <>
                        Next <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Gold pulsing ring: drawn on top so it stays visible even if the
              centered card overlaps the highlighted button on small phones */}
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
  );
}