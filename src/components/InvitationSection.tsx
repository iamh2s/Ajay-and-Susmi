import {
  CalendarDays,
  Clock,
  MapPin,
  Sun,
  Heart,
} from "lucide-react";

import data from "@/data/weddingData.json";

import {
  CornerOrnaments,
  GoldDivider,
  Gopuram,
  ScrollReveal,
  SectionHeading,
} from "./decor";

/* =========================================================
   DETAIL CELL
========================================================= */

function DetailCell({
  icon,
  labelTa,
  labelEn,
  valueTa,
  valueEn,
}: {
  icon: React.ReactNode;
  labelTa: string;
  labelEn: string;
  valueTa: string;
  valueEn: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon */}
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory-deep text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.25)]">
        {icon}
      </span>

      {/* Label */}
      <p className="mt-3 font-tamil text-xs font-bold tracking-wider text-gold-deep">
        {labelTa}{" "}
        <span className="font-latin text-[0.6rem] uppercase tracking-[0.24em] text-ink/50">
          · {labelEn}
        </span>
      </p>

      {/* Tamil value */}
      <p className="mt-1.5 font-tamil text-[0.95rem] font-bold leading-snug text-maroon sm:text-base">
        {valueTa}
      </p>

      {/* English value */}
      <p className="mt-0.5 font-latin text-xs italic text-ink/60 sm:text-sm">
        {valueEn}
      </p>
    </div>
  );
}

/* =========================================================
   INVITATION SECTION
========================================================= */

export default function InvitationSection() {
  const { invitation, couple } = data;

  return (
    <section
      id="invitation"
      aria-label={`${invitation.titleTa} — ${invitation.titleEn}`}
      className="velvet-texture relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background dots */}
      <div
        aria-hidden="true"
        className="kolam-dots absolute inset-0 opacity-50"
      />

      {/* Top glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,190,124,0.12),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <ScrollReveal>
          <SectionHeading
            ta={invitation.titleTa}
            en={invitation.titleEn}
            tone="light"
          />
        </ScrollReveal>

        {/* =====================================================
            MAIN WEDDING CARD
        ====================================================== */}

        <ScrollReveal
          delay={0.15}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="rounded-[2rem] bg-gradient-to-b from-gold-light via-gold to-gold-deep p-[3px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)]">

            <div className="gold-double-frame paper-texture relative rounded-[calc(2rem-3px)] border border-gold-deep/40 px-6 py-12 text-center sm:px-12 sm:py-16">

              {/* =================================================
                  CORNER ORNAMENT
              ================================================== */}

              <CornerOrnaments
                className="text-gold-deep/75"
                size="h-12 w-12 sm:h-16 sm:w-16"
              />

              {/* =================================================
                  GOPURAM
              ================================================== */}

              <Gopuram
                className="mx-auto h-12 w-auto text-gold-deep/65"
                aria-hidden="true"
              />

              {/* =================================================
                  SRI
              ================================================== */}

              <p className="text-gold-shimmer mt-4 font-tamil text-3xl font-bold leading-none sm:text-4xl">
                {invitation.sri}
              </p>

              <p className="mt-1 font-latin text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-gold-deep">
                {invitation.sriEn}
              </p>

              {/* =================================================
                  TITLE
              ================================================== */}

              <h3 className="mt-6 font-tamil text-2xl font-bold text-maroon sm:text-3xl">
                {invitation.titleTa}
              </h3>

              <p className="mt-1.5 font-latin text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold-deep sm:text-xs">
                {invitation.titleEn}
              </p>

              {/* Divider */}
              <div className="mt-6 flex justify-center">
                <GoldDivider
                  motif="kalasam"
                  className="text-gold-deep"
                />
              </div>

              {/* =================================================
                  COUPLE
              ================================================== */}

              <div className="mt-8 space-y-2">

                {/* Bride */}
                <h4 className="font-tamil text-[1.65rem] font-bold leading-snug text-maroon sm:text-4xl">
                  {couple.bride.tamil}
                </h4>

                <p className="font-latin text-base italic tracking-wide text-gold-deep sm:text-lg">
                  {couple.bride.english}
                </p>

                {/* Heart divider */}
                <div
                  className="flex items-center justify-center gap-3 py-2"
                  aria-hidden="true"
                >
                  <span className="hairline-gold w-16" />

                  <Heart className="h-4 w-4 fill-gold-deep text-gold-deep" />

                  <span className="hairline-gold w-16" />
                </div>

                {/* Groom */}
                <h4 className="font-tamil text-[1.65rem] font-bold leading-snug text-maroon sm:text-4xl">
                  {couple.groom.inviteTamil}
                </h4>

                <p className="font-latin text-base italic tracking-wide text-gold-deep sm:text-lg">
                  {couple.groom.english}
                </p>
              </div>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="mt-8 flex justify-center">
                <GoldDivider
                  motif="diamond"
                  className="text-gold-deep/80"
                  widthClass="w-44"
                />
              </div>

              {/* =====================================================
                  RECEPTION — FIRST
              ====================================================== */}

              <div className="mt-8">

                {/* Reception Title */}
                <p className="font-tamil text-2xl font-bold text-maroon sm:text-3xl">
                  வரவேற்பு
                </p>

                <p className="mt-1 font-latin text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-gold-deep sm:text-xs">
                  Reception
                </p>

                {/* Small divider */}
                <div className="mt-4 flex justify-center">
                  <span className="h-px w-20 bg-gold/60" />
                </div>

                {/* =================================================
                    RECEPTION DATE / DAY / TIME
                ================================================== */}

                <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-4">

                  {/* Reception Date */}
                  <div className="flex flex-col items-center text-center">

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory-deep text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]">
                      <CalendarDays
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>

                    <p className="mt-3 font-tamil text-xs font-bold text-gold-deep">
                      தேதி{" "}
                      <span className="font-latin text-[0.6rem] uppercase tracking-[0.2em] text-ink/50">
                        · Date
                      </span>
                    </p>

                    <p className="mt-1 font-latin text-base font-bold text-maroon sm:text-lg">
                      November 14
                    </p>

                    <p className="font-tamil text-sm text-ink/65">
                      நவம்பர் 14
                    </p>
                  </div>

                  {/* Reception Day */}
                  <div className="flex flex-col items-center text-center">

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory-deep text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]">
                      <Sun
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>

                    <p className="mt-3 font-tamil text-xs font-bold text-gold-deep">
                      நாள்{" "}
                      <span className="font-latin text-[0.6rem] uppercase tracking-[0.2em] text-ink/50">
                        · Day
                      </span>
                    </p>

                    <p className="mt-1 font-latin text-base font-bold text-maroon sm:text-lg">
                      Saturday
                    </p>

                    <p className="font-tamil text-sm text-ink/65">
                      சனிக்கிழமை
                    </p>
                  </div>

                  {/* Reception Time */}
                  <div className="flex flex-col items-center text-center">

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory-deep text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.2)]">
                      <Clock
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>

                    <p className="mt-3 font-tamil text-xs font-bold text-gold-deep">
                      நேரம்{" "}
                      <span className="font-latin text-[0.6rem] uppercase tracking-[0.2em] text-ink/50">
                        · Time
                      </span>
                    </p>

                    <p className="mt-1 font-latin text-base font-bold text-maroon sm:text-lg">
                      6:00 PM
                    </p>

                    <p className="font-tamil text-sm text-ink/65">
                      மாலை 6.00 மணி
                    </p>
                  </div>
                </div>

                {/* =================================================
                    RECEPTION VENUE
                ================================================== */}

                <div className="mt-7 rounded-xl border border-gold/35 bg-ivory-deep/50 px-4 py-4">

                  <div className="flex items-center justify-center gap-2 text-gold-deep">
                    <MapPin
                      className="h-4 w-4"
                      aria-hidden="true"
                    />

                    <span className="font-latin text-xs font-semibold uppercase tracking-[0.2em]">
                      Venue
                    </span>
                  </div>

                  <p className="mt-2 font-tamil text-base font-bold text-maroon sm:text-lg">
                    அதே திருமண மண்டபத்தில்
                  </p>

                  <p className="mt-0.5 font-latin text-xs italic text-ink/60 sm:text-sm">
                    At the same venue
                  </p>
                </div>
              </div>

              {/* =====================================================
                  SEPARATOR
              ====================================================== */}

              <div className="mt-10 flex justify-center">
                <GoldDivider
                  motif="diamond"
                  className="text-gold-deep/70"
                  widthClass="w-36"
                />
              </div>

              {/* =====================================================
                  MARRIAGE — SECOND
              ====================================================== */}

              <div className="mt-8">

                {/* Marriage Title */}
                <p className="font-tamil text-2xl font-bold text-maroon sm:text-3xl">
                  திருமணம்
                </p>

                <p className="mt-1 font-latin text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-gold-deep sm:text-xs">
                  Marriage
                </p>

                {/* =================================================
                    MUHURTHAM DETAILS
                ================================================== */}

                <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-4">

                  {/* Marriage Date */}
                  <DetailCell
                    icon={
                      <CalendarDays
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    }
                    labelTa={invitation.labels.date.ta}
                    labelEn={invitation.labels.date.en}
                    valueTa={invitation.dateTa}
                    valueEn={invitation.dateEn}
                  />

                  {/* Marriage Day */}
                  <DetailCell
                    icon={
                      <Sun
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    }
                    labelTa={invitation.labels.day.ta}
                    labelEn={invitation.labels.day.en}
                    valueTa={invitation.dayTa}
                    valueEn={invitation.dayEn}
                  />

                  {/* Marriage Time */}
                  <DetailCell
                    icon={
                      <Clock
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    }
                    labelTa={invitation.labels.time.ta}
                    labelEn={invitation.labels.time.en}
                    valueTa={invitation.timeTa}
                    valueEn={invitation.timeEn}
                  />
                </div>
              </div>

              {/* =====================================================
                  MARRIAGE VENUE
              ====================================================== */}

              <div className="mt-10 rounded-2xl border border-gold/45 bg-ivory-deep/70 px-6 py-7 shadow-[inset_0_2px_14px_rgba(176,141,60,0.14)]">

                {/* Location Icon */}
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory text-gold-deep">
                  <MapPin
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>

                {/* Venue Tamil */}
                <p className="mt-3 font-tamil text-lg font-bold leading-snug text-maroon sm:text-xl">
                  {invitation.venueTa}
                </p>

                {/* Venue English */}
                <p className="mt-0.5 font-latin text-sm italic text-gold-deep sm:text-base">
                  {invitation.venueEn}
                </p>

                {/* Tamil Address */}
                <div className="mt-3 space-y-0.5">
                  {invitation.addressTa.map((line) => (
                    <p
                      key={line}
                      className="font-tamil text-sm leading-relaxed text-ink/80"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* English Address */}
                <div className="mt-1.5 space-y-0.5">
                  {invitation.addressEn.map((line) => (
                    <p
                      key={line}
                      className="font-latin text-xs italic text-ink/55 sm:text-sm"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* =====================================================
                  FINAL DECORATION
              ====================================================== */}

              <div
                className="mt-9 flex flex-col items-center gap-2"
                aria-hidden="true"
              >
                <GoldDivider
                  motif="lotus"
                  className="text-gold-deep"
                />
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}