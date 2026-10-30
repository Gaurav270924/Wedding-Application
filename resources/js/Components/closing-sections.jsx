import { MADHAV_KRIPA_LOGO } from "@/Utils/wedding-content.js";
import { motion } from "motion/react";
import { CalendarPlus, Heart } from "lucide-react";
import { useContent } from "@/Utils/content-context.jsx";
import { formatDateLabel } from "@/Utils/date-format.js";
import { downloadIcs, weddingCalEvent } from "@/Utils/calendar.js";
import { Button } from "@/Components/ui/button.jsx";
import { Ornament } from "@/Components/section-heading.jsx";
import SectionHeading from "@/Components/section-heading.jsx";
import { useOverlay } from "@/Utils/use-overlay.js";

const LINES = ["Jo gharon se shuru hua,", "baaton se aage badha,", "apnapan bana,", "aur ab…"];

export function FinalInvitation() {
  const c = useContent();
  const { wedding } = c;
  const overlay = useOverlay();
  return (
    <section className="relative overflow-hidden py-28">
      <img
        src={c.finalInvitation.backgroundImage}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-[#F8F1E7]"
        style={{ opacity: Math.min(1, overlay + 0.05) }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="relative mx-auto max-w-2xl rounded-t-[300px] rounded-b-2xl border border-accent bg-[#FFF9F0]/95 px-6 pb-12 pt-20 text-center shadow-2xl sm:px-12"
      >
        <p className="text-xs tracking-[0.4em] text-[#A98245]">✦ FINAL INVITATION ✦</p>
        <p className="pt-6 font-serif text-4xl font-semibold text-primary">EK RISHTA…</p>
        <div className="pt-4 font-serif text-xl italic leading-relaxed text-foreground/85">
          {LINES.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <p className="pt-4 font-serif text-2xl font-semibold text-balance text-primary">
          ZINDAGI BHAR KA SAATH BANNE JA RAHA HAI.
        </p>
        <Ornament className="pt-6" />
        <p className="pt-6 font-script text-4xl text-[#A98245]">
          {wedding.groom} & {wedding.bride}
        </p>
        <p className="pt-2 text-muted-foreground">invite you to celebrate</p>
        <p className="pt-3 text-xs font-medium tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.3em] break-words">
          MEHENDI • HALDI • SANGEET • SHAADI
        </p>
        <p className="pt-3 text-muted-foreground">with the love and blessings of their families.</p>
        <p className="pt-6 font-serif text-2xl text-primary">{formatDateLabel(wedding.dateIso)}</p>
        <p className="text-muted-foreground">{wedding.venueShort}</p>
        <div className="flex flex-wrap justify-center gap-3 pt-8">
          <Button asChild className="rounded-full">
            <a href="#celebrations">View Event Schedule</a>
          </Button>
          <Button
            variant="secondary"
            className="rounded-full border border-accent"
            onClick={() => downloadIcs(weddingCalEvent(wedding))}
          >
            <CalendarPlus />
            Save the Date
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export function ParentsBlessings() {
  const { parents } = useContent();
  return (
    <section className="bg-[#4B1425] py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="With Love" heading="Parents' Blessings" light />
        <div className="grid gap-6 pt-14 md:grid-cols-2">
          {parents.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#C7A064]/60 bg-[#5c1a2d] p-8 text-center"
            >
              <Heart className="mx-auto size-6 fill-[#C7A064] text-[#C7A064]" />
              <p className="pt-4 text-xs tracking-[0.3em] text-[#E8CFA0]">{p.title.toUpperCase()}</p>
              <h3 className="pt-2 font-serif text-3xl text-[#FFF9F0]">{p.names}</h3>
              <p className="pt-4 font-serif text-lg italic leading-relaxed text-[#FFF9F0]/85">
                {p.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { wedding, settings } = useContent();
  return (
    <footer className="border-t border-border bg-background py-10 pb-24 text-center">
      <img
        src={MADHAV_KRIPA_LOGO}
        alt="Madhav Kripa"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="mx-auto h-20 w-auto object-contain sm:h-28"
      />
      <p className="pt-3 font-serif text-2xl text-primary">{wedding.brand}</p>
      <p className="pt-1 text-sm text-muted-foreground">
        {wedding.groom} × {wedding.bride} · {formatDateLabel(wedding.dateIso)}
      </p>
      <p className="pt-3 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {settings.footerNote}
      </p>
    </footer>
  );
}
