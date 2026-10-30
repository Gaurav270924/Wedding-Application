import { MapPin, Navigation } from "lucide-react";
import { useContent } from "@/Utils/content-context.jsx";
import { formatDateLabel, formatTimeLabel } from "@/Utils/date-format.js";
import { Button } from "@/Components/ui/button.jsx";
import SectionHeading from "@/Components/section-heading.jsx";

export default function Venue() {
  const { venue: VENUE_INFO, wedding } = useContent();
  return (
    <section id="venue" className="bg-[#FFF9F0] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Venue" heading="Where Forever Begins" />
        <div className="grid gap-8 pt-14 md:grid-cols-5">
          <div className="relative overflow-hidden rounded-2xl md:col-span-3">
            <img
              src={VENUE_INFO.image}
              alt="Wedding venue setting"
              loading="lazy"
              className="h-full min-h-72 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4B1425]/85 via-[#4B1425]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[#FFF9F0] sm:p-8">
              <p className="text-xs tracking-[0.3em] text-[#E8CFA0]">WEDDING VENUE</p>
              <h3 className="font-serif text-4xl font-semibold">{VENUE_INFO.name}</h3>
              <p className="pt-1">{VENUE_INFO.address}</p>
              <p className="pt-3 text-sm">
                Wedding date: {formatDateLabel(wedding.dateIso)} · Ceremony:{" "}
                {formatTimeLabel(wedding.dateIso)} onwards
              </p>
              <Button asChild className="mt-5 rounded-full bg-[#FFF9F0] text-primary hover:bg-white">
                <a href={VENUE_INFO.mapUrl} target="_blank" rel="noreferrer">
                  <Navigation />
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-accent/60 bg-[#F8F1E7] p-8 text-center md:col-span-2">
            <MapPin className="mx-auto size-8 text-primary" />
            <p className="pt-4 text-xs tracking-[0.3em] text-[#A98245]">
              BARAAT STARTING POINT
            </p>
            <h3 className="pt-2 font-serif text-3xl font-semibold text-primary">
              {VENUE_INFO.baraatPlace}
            </h3>
            <p className="pt-1 text-muted-foreground">{VENUE_INFO.baraatNote}</p>
            <Button
              asChild
              variant="secondary"
              className="mx-auto mt-6 rounded-full border border-accent"
            >
              <a href={VENUE_INFO.baraatMapUrl} target="_blank" rel="noreferrer">
                View Baraat Starting Point
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
