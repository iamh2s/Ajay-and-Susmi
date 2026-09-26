import data from "@/data/weddingData.json";
import { CornerOrnaments, GoldDivider, ScrollReveal, SectionHeading, Vilakku } from "./decor";

function ParentsPanel({
  labelTa,
  labelEn,
  fatherTa,
  fatherEn,
  motherTa,
  motherEn,
  amp,
  align,
}: {
  labelTa: string;
  labelEn: string;
  fatherTa: string;
  fatherEn: string;
  motherTa: string;
  motherEn: string;
  amp: string;
  align: "right" | "left";
}) {
  const alignCls = align === "right" ? "text-center md:text-right" : "text-center md:text-left";
  const lineCls = align === "right" ? "md:justify-end" : "md:justify-start";
  return (
    <div className={alignCls}>
      <div className={`flex items-center justify-center gap-3 ${lineCls}`}>
        <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
        <p className="font-tamil text-sm font-bold tracking-wider text-gold-deep">{labelTa}</p>
        <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
      </div>
      <p className="mt-1 font-latin text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-ink/55">{labelEn}</p>

      <h3 className="mt-5 font-tamil text-xl font-bold leading-relaxed text-maroon sm:text-2xl">{fatherTa}</h3>
      <p className="mt-1 font-latin text-base italic text-ink/65 sm:text-lg">{fatherEn}</p>

      <p className="my-3 font-latin text-2xl italic text-gold-deep" aria-hidden="true">
        {amp}
      </p>

      <h3 className="font-tamil text-xl font-bold leading-relaxed text-maroon sm:text-2xl">{motherTa}</h3>
      <p className="mt-1 font-latin text-base italic text-ink/65 sm:text-lg">{motherEn}</p>
    </div>
  );
}

export default function FamilySection() {
  const { family } = data;
  return (
    <section
      aria-label={`${family.headingTa} — ${family.headingEn}`}
      className="paper-texture relative overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden="true" className="kolam-dots-ivory absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={family.headingTa} en={family.headingEn} />
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-16">
          <div className="gold-double-frame relative border border-gold/55 bg-ivory/85 px-6 py-12 shadow-[0_30px_70px_-36px_rgba(46,8,16,0.5)] sm:px-12 sm:py-16">
            <CornerOrnaments className="text-gold-deep/80" />
            <svg viewBox="0 0 24 30" aria-hidden="true" className="absolute -top-4 left-1/2 h-8 w-6 -translate-x-1/2 fill-gold-deep">
              <path d="M12 0c1.6 2.4 1.6 4.2 0 6.4C10.4 4.2 10.4 2.4 12 0Z" />
              <path d="M7 8.5h10l1.4 2.4c2.2 1.6 3.6 4 3.6 6.6 0 5.2-4.4 8-10 8s-10-2.8-10-8c0-2.6 1.4-5 3.6-6.6L7 8.5Z" />
            </svg>

            <div className="grid items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12">
              <ParentsPanel
                labelTa={family.brideSideLabelTa}
                labelEn={family.brideSideLabelEn}
                fatherTa={family.brideParents.fatherTa}
                fatherEn={family.brideParents.fatherEn}
                motherTa={family.brideParents.motherTa}
                motherEn={family.brideParents.motherEn}
                amp={family.ampersandEn}
                align="right"
              />

              {/* temple divider */}
              <div aria-hidden="true" className="flex flex-row items-center justify-center gap-6 md:flex-col">
                <span className="hairline-gold w-16 md:h-16 md:w-px md:bg-none" style={{ background: "linear-gradient(90deg, transparent, rgba(176,141,60,0.8), transparent)" }} />
                <div className="relative px-2 py-2">
                  <span className="absolute inset-0 rounded-full border border-gold/40" />
                  <Vilakku className="relative h-20 w-auto md:h-24" />
                </div>
                <span className="hairline-gold w-16 md:h-16 md:w-px md:bg-none" style={{ background: "linear-gradient(90deg, transparent, rgba(176,141,60,0.8), transparent)" }} />
              </div>

              <ParentsPanel
                labelTa={family.groomSideLabelTa}
                labelEn={family.groomSideLabelEn}
                fatherTa={family.groomParents.fatherTa}
                fatherEn={family.groomParents.fatherEn}
                motherTa={family.groomParents.motherTa}
                motherEn={family.groomParents.motherEn}
                amp={family.ampersandEn}
                align="left"
              />
            </div>

            <div className="mt-12 flex justify-center">
              <GoldDivider motif="lotus" className="text-gold-deep" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
