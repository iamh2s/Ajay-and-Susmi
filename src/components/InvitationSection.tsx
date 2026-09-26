import { CalendarDays, Clock, MapPin, Sun, Heart } from "lucide-react";
import data from "@/data/weddingData.json";
import { CornerOrnaments, GoldDivider, Gopuram, ScrollReveal, SectionHeading } from "./decor";

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
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory-deep text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.25)]">
        {icon}
      </span>
      <p className="mt-3 font-tamil text-xs font-bold tracking-wider text-gold-deep">
        {labelTa} <span className="font-latin text-[0.6rem] uppercase tracking-[0.24em] text-ink/50">· {labelEn}</span>
      </p>
      <p className="mt-1.5 font-tamil text-[0.95rem] font-bold leading-snug text-maroon sm:text-base">{valueTa}</p>
      <p className="mt-0.5 font-latin text-xs italic text-ink/60 sm:text-sm">{valueEn}</p>
    </div>
  );
}

export default function InvitationSection() {
  const { invitation, couple } = data;
  return (
    <section
      id="invitation"
      aria-label={`${invitation.titleTa} — ${invitation.titleEn}`}
      className="velvet-texture relative overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden="true" className="kolam-dots absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,190,124,0.12),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={invitation.titleTa} en={invitation.titleEn} tone="light" />
        </ScrollReveal>

        {/* the wedding card */}
        <ScrollReveal delay={0.15} className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-[2rem] bg-gradient-to-b from-gold-light via-gold to-gold-deep p-[3px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)]">
            <div className="gold-double-frame paper-texture relative rounded-[calc(2rem-3px)] border border-gold-deep/40 px-6 py-12 text-center sm:px-12 sm:py-16">
              <CornerOrnaments className="text-gold-deep/75" size="h-12 w-12 sm:h-16 sm:w-16" />

              <Gopuram className="mx-auto h-12 w-auto text-gold-deep/65" aria-hidden="true" />

              <p className="text-gold-shimmer mt-4 font-tamil text-3xl font-bold leading-none sm:text-4xl">
                {invitation.sri}
              </p>
              <p className="mt-1 font-latin text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-gold-deep">
                {invitation.sriEn}
              </p>

              <h3 className="mt-6 font-tamil text-2xl font-bold text-maroon sm:text-3xl">{invitation.titleTa}</h3>
              <p className="mt-1.5 font-latin text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold-deep sm:text-xs">
                {invitation.titleEn}
              </p>

              <div className="mt-6 flex justify-center">
                <GoldDivider motif="kalasam" className="text-gold-deep" />
              </div>

              {/* couple */}
              <div className="mt-8 space-y-2">
                <h4 className="font-tamil text-[1.65rem] font-bold leading-snug text-maroon sm:text-4xl">
                  {couple.bride.tamil}
                </h4>
                <p className="font-latin text-base italic tracking-wide text-gold-deep sm:text-lg">
                  {couple.bride.english}
                </p>
                <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
                  <span className="hairline-gold w-16" />
                  <Heart className="h-4 w-4 fill-gold-deep text-gold-deep" />
                  <span className="hairline-gold w-16" />
                </div>
                <h4 className="font-tamil text-[1.65rem] font-bold leading-snug text-maroon sm:text-4xl">
                  {couple.groom.inviteTamil}
                </h4>
                <p className="font-latin text-base italic tracking-wide text-gold-deep sm:text-lg">
                  {couple.groom.english}
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <GoldDivider motif="diamond" className="text-gold-deep/80" widthClass="w-44" />
              </div>

              {/* muhurtham details */}
              <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-4">
                <DetailCell
                  icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />}
                  labelTa={invitation.labels.date.ta}
                  labelEn={invitation.labels.date.en}
                  valueTa={invitation.dateTa}
                  valueEn={invitation.dateEn}
                />
                <DetailCell
                  icon={<Sun className="h-4 w-4" aria-hidden="true" />}
                  labelTa={invitation.labels.day.ta}
                  labelEn={invitation.labels.day.en}
                  valueTa={invitation.dayTa}
                  valueEn={invitation.dayEn}
                />
                <DetailCell
                  icon={<Clock className="h-4 w-4" aria-hidden="true" />}
                  labelTa={invitation.labels.time.ta}
                  labelEn={invitation.labels.time.en}
                  valueTa={invitation.timeTa}
                  valueEn={invitation.timeEn}
                />
              </div>

              {/* venue */}
              <div className="mt-10 rounded-2xl border border-gold/45 bg-ivory-deep/70 px-6 py-7 shadow-[inset_0_2px_14px_rgba(176,141,60,0.14)]">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/55 bg-ivory text-gold-deep">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-3 font-tamil text-lg font-bold leading-snug text-maroon sm:text-xl">
                  {invitation.venueTa}
                </p>
                <p className="mt-0.5 font-latin text-sm italic text-gold-deep sm:text-base">{invitation.venueEn}</p>
                <div className="mt-3 space-y-0.5">
                  {invitation.addressTa.map((line) => (
                    <p key={line} className="font-tamil text-sm leading-relaxed text-ink/80">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-1.5 space-y-0.5">
                  {invitation.addressEn.map((line) => (
                    <p key={line} className="font-latin text-xs italic text-ink/55 sm:text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-col items-center gap-2" aria-hidden="true">
                <GoldDivider motif="lotus" className="text-gold-deep" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
