import { Phone } from "lucide-react";
import { GoldDivider } from "./decor";

export default function ContactCard() {
  return (
    <section 
    id="contact"
    aria-label="Contact — தொடர்புக்கு"
    className=" relative mx-auto mt-12 w-full max-w-3xl px-5 sm:mt-16 sm:px-0">
      {/* =====================================================
          CONTACT CARD
      ====================================================== */}

      <div className="rounded-[2rem] bg-gradient-to-b from-gold-light via-gold to-gold-deep p-[3px] shadow-[0_30px_80px_-35px_rgba(0,0,0,0.8)]">
        <div className="gold-double-frame paper-texture relative overflow-hidden rounded-[calc(2rem-3px)] border border-gold-deep/40 px-5 py-10 text-center sm:px-10 sm:py-12">

          {/* Background Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,190,124,0.18),transparent)]"
          />

          {/* Corner Decorations */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-3 h-12 w-12 border-l border-t border-gold-deep/40 sm:left-5 sm:top-5 sm:h-16 sm:w-16"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 h-12 w-12 border-r border-t border-gold-deep/40 sm:right-5 sm:top-5 sm:h-16 sm:w-16"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 h-12 w-12 border-b border-l border-gold-deep/40 sm:bottom-5 sm:left-5 sm:h-16 sm:w-16"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 h-12 w-12 border-b border-r border-gold-deep/40 sm:bottom-5 sm:right-5 sm:h-16 sm:w-16"
          />

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="relative">

            {/* Top Divider */}
            <div className="flex justify-center">
              <GoldDivider
                motif="diamond"
                className="text-gold-deep/70"
                widthClass="w-32 sm:w-40"
              />
            </div>

            {/* Heading */}
            <div className="mt-6">
              <p className="font-tamil text-2xl font-bold text-maroon sm:text-3xl">
                தொடர்புக்கு
              </p>

              <p className="mt-1 font-latin text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-gold-deep sm:text-xs">
                Contact
              </p>
            </div>

            {/* Small Divider */}
            <div className="mx-auto mt-5 h-px w-16 bg-gold/60" />

            {/* =================================================
                CONTACTS
            ================================================== */}

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

              {/* =================================================
                  VISHAL KUMAR
              ================================================== */}

              <div className="group rounded-2xl border border-gold/45 bg-ivory-deep/70 px-4 py-6 transition-all duration-300 hover:-translate-y-1 hover:bg-ivory hover:shadow-[0_15px_35px_-18px_rgba(176,141,60,0.65)]">

                {/* Phone Icon */}
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/55 bg-ivory text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]">
                  <Phone
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>

                {/* Name */}
                <p className="mt-4 font-latin text-base font-bold text-maroon sm:text-lg">
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
                <p className="mt-3 font-latin text-sm font-bold tracking-wide text-maroon">
                  +91 90250 10393
                </p>

                {/* CALL BUTTON */}
                <a
                  href="tel:+919025010393"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-gold-deep bg-maroon px-5 py-2.5 font-latin text-xs font-semibold uppercase tracking-[0.18em] text-gold-light shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-maroon/90 hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.7)] active:scale-95"
                  aria-label="Call Vishal Kumar"
                >
                  <Phone
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />

                  Call Now
                </a>
              </div>

              {/* =================================================
                  KARTHIKEYAN
              ================================================== */}

              <div className="group rounded-2xl border border-gold/45 bg-ivory-deep/70 px-4 py-6 transition-all duration-300 hover:-translate-y-1 hover:bg-ivory hover:shadow-[0_15px_35px_-18px_rgba(176,141,60,0.65)]">

                {/* Phone Icon */}
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/55 bg-ivory text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]">
                  <Phone
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>

                {/* Name */}
                <p className="mt-4 font-latin text-base font-bold text-maroon sm:text-lg">
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
                <p className="mt-3 font-latin text-sm font-bold tracking-wide text-maroon">
                  +91 95005 21536
                </p>

                {/* CALL BUTTON */}
                <a
                  href="tel:+919500521536"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-gold-deep bg-maroon px-5 py-2.5 font-latin text-xs font-semibold uppercase tracking-[0.18em] text-gold-light shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-maroon/90 hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.7)] active:scale-95"
                  aria-label="Call Karthikeyan"
                >
                  <Phone
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />

                  Call Now
                </a>
              </div>
            </div>

            {/* Bottom Divider */}
            <div className="mt-8 flex justify-center">
              <GoldDivider
                motif="lotus"
                className="text-gold-deep"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
