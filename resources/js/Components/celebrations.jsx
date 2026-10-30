import { motion } from "motion/react";
import { CalendarPlus, Clock, Download, MapPin, Shirt } from "lucide-react";
import { useContent } from "@/Utils/content-context.jsx";
import { formatDateLabel, formatTimeLabel } from "@/Utils/date-format.js";
import { downloadIcs, googleCalendarUrl } from "@/Utils/calendar.js";
import SectionHeading from "@/Components/section-heading.jsx";

const toCal = (e, couple) => ({
  title: `${e.title} · ${couple}`,
  startIso: e.startIso,
  location: e.venue,
  details: `${e.tagline}. Dress code: ${e.dressCode}`,
});

export default function Celebrations() {
  const { celebrationsIntro, events, wedding } = useContent();
  const couple = `${wedding.groom} & ${wedding.bride}`;
  return (
    <section id="celebrations" className="bg-[#FFF9F0] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading {...celebrationsIntro} />
        <div className="grid gap-8 pt-16 sm:grid-cols-2 xl:grid-cols-4">
          {events.map((e, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col rounded-t-[999px] rounded-b-2xl border border-accent/60 bg-[#F8F1E7] p-3 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="overflow-hidden rounded-t-[999px] rounded-b-xl">
                <img
                  src={e.image}
                  alt={`${e.title} decor`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col px-3 pb-3 pt-5 text-center">
                <p className="text-xs tracking-[0.3em] text-[#A98245]">EVENT {i + 1}</p>
                <h3 className="font-serif text-3xl font-semibold uppercase text-primary">
                  {e.title}
                </h3>
                <p className="font-script text-2xl text-[#A98245]">{e.tagline}</p>
                <ul className="space-y-2 pt-4 text-left text-sm text-foreground/85">
                  <li className="flex gap-2">
                    <CalendarPlus className="size-4 shrink-0 text-accent" />
                    {formatDateLabel(e.startIso)}
                  </li>
                  <li className="flex gap-2">
                    <Clock className="size-4 shrink-0 text-accent" />
                    {formatTimeLabel(e.startIso)} onwards
                  </li>
                  <li className="flex gap-2">
                    <MapPin className="size-4 shrink-0 text-accent" />
                    {e.venue}
                  </li>
                  <li className="flex gap-2">
                    <Shirt className="size-4 shrink-0 text-accent" />
                    {e.dressCode}
                  </li>
                </ul>
                <p className="flex-1 pt-4 font-serif text-lg italic text-muted-foreground">
                  {e.quote}
                </p>
                <div className="flex gap-2 pt-5">
                  <a
                    href={googleCalendarUrl(toCal(e, couple))}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 cursor-pointer rounded-full bg-primary px-3 py-2 text-xs font-medium tracking-wider text-primary-foreground hover:bg-[#4B1425]"
                  >
                    Google Calendar
                  </a>
                  <button
                    onClick={() => downloadIcs(toCal(e, couple))}
                    aria-label={`Download ${e.title} calendar invite`}
                    className="cursor-pointer rounded-full border border-accent px-3 py-2 text-primary hover:bg-secondary"
                  >
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
