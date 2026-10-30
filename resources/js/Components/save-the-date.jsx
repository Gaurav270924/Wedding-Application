import { Copy, Download, MapPin, CalendarPlus, Heart } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/Utils/content-context.jsx";
import { downloadIcs, googleCalendarUrl, weddingCalEvent } from "@/Utils/calendar.js";
import { formatDateLabel, istParts } from "@/Utils/date-format.js";
import { Button } from "@/Components/ui/button.jsx";
import SectionHeading from "@/Components/section-heading.jsx";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SaveTheDate() {
  const { wedding } = useContent();
  const WEDDING_CAL = weddingCalEvent(wedding);
  const dateLabel = formatDateLabel(wedding.dateIso);
  const { y, m, d } = istParts(wedding.dateIso);
  const firstDay = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const monthName = new Date(Date.UTC(y, m, 1)).toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  const copy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${dateLabel} · ${wedding.venueShort}`);
        toast.success("Wedding date copied");
      }
    } catch {
      toast.error("Could not copy. Please copy it manually.");
    }
  };

  return (
    <section id="save-the-date" className="bg-[#F8F1E7] py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Save the Date"
            heading={dateLabel}
            script={`${wedding.groom} × ${wedding.bride}`}
            text="We can't wait to celebrate this special day with you."
          />
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            <Button asChild className="rounded-full">
              <a href={googleCalendarUrl(WEDDING_CAL)} target="_blank" rel="noreferrer">
                <CalendarPlus />
                Google Calendar
              </a>
            </Button>
            <Button
              variant="secondary"
              className="rounded-full border border-accent"
              onClick={() => downloadIcs(WEDDING_CAL)}
            >
              <Download />
              Download .ics
            </Button>
            <Button
              variant="secondary"
              className="rounded-full border border-accent"
              onClick={copy}
            >
              <Copy />
              Copy date
            </Button>
            <Button asChild variant="ghost" className="rounded-full text-primary">
              <a href="#venue">
                <MapPin />
                Venue details
              </a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-accent/60 bg-[#FFF9F0] p-6 shadow-lg sm:p-8">
          <p className="text-center font-serif text-3xl uppercase tracking-[0.2em] text-primary">
            {monthName} {y}
          </p>
          <div className="grid grid-cols-7 gap-1 pt-6 text-center">
            {WEEKDAYS.map((w) => (
              <span
                key={w}
                className="pb-2 text-xs font-medium uppercase tracking-wider text-[#A98245]"
              >
                {w}
              </span>
            ))}
            {cells.map((n, i) =>
              n === d ? (
                <span
                  key={i}
                  className="relative flex aspect-square items-center justify-center"
                  aria-label={`${n} ${monthName}, wedding day`}
                >
                  <Heart
                    className="absolute size-full fill-primary text-accent"
                    strokeWidth={1}
                  />
                  <span className="relative pb-1 font-serif text-lg font-semibold text-primary-foreground">
                    {n}
                  </span>
                </span>
              ) : (
                <span
                  key={i}
                  className="flex aspect-square items-center justify-center font-serif text-lg text-foreground/80"
                >
                  {n ?? ""}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
