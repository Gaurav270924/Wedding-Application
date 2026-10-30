import {
  Calendar,
  Clock,
  MapPin,
  Shirt,
  Users,
  Navigation,
  Edit,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { DEFAULT_CONTENT } from "@/Utils/wedding-content.js";
import { formatDateLabel, formatTimeLabel } from "@/Utils/date-format.js";

export default function Events({ stats, events = [], venue = {} }) {
  const displayEvents = events && events.length > 0 ? events : DEFAULT_CONTENT.events;
  const displayVenue = venue && Object.keys(venue).length > 0 ? venue : DEFAULT_CONTENT.venue;

  return (
    <AdminLayout
      title="Events & Ceremonies Schedule"
      subtitle="View all wedding celebration events, attendee counts, and logistics"
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          <Link
            href="/admin/content?tab=celebrations"
            className="inline-flex items-center gap-2 rounded-full bg-[#7D1F35] px-5 py-2 text-xs font-semibold text-[#FFF9F0] shadow-sm transition hover:bg-[#4B1425]"
          >
            <Edit className="size-3.5" />
            <span>Edit Ceremonies & Venues</span>
          </Link>
        </div>
        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {displayEvents.map((e, idx) => {
            const count = stats.events_breakdown[e.title] ?? 0;
            return (
              <div
                key={e.title || idx}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#C7A064]/50 bg-[#FFF9F0] shadow-xs"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8CFA0]">
                        Function {idx + 1}
                      </span>
                      <h3 className="font-serif text-2xl font-bold uppercase">{e.title}</h3>
                      <p className="font-script text-lg text-[#E8CFA0]">{e.tagline}</p>
                    </div>
                  </div>

                  <div className="space-y-3 p-5 text-xs text-foreground/85">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 shrink-0 text-[#A98245]" />
                      <span>{formatDateLabel(e.startIso)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 shrink-0 text-[#A98245]" />
                      <span>{formatTimeLabel(e.startIso)} onwards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 shrink-0 text-[#A98245]" />
                      <span>{e.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shirt className="size-4 shrink-0 text-[#A98245]" />
                      <span>{e.dressCode}</span>
                    </div>

                    <p className="border-t border-[#E3D2B4]/60 pt-3 font-serif text-xs italic text-muted-foreground">
                      {e.quote}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E3D2B4]/60 bg-[#F8F1E7]/70 p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[#7D1F35]">
                    <Users className="size-4 text-[#A98245]" />
                    <span className="font-serif text-xl font-bold">{count}</span>
                    <span className="text-xs font-sans text-muted-foreground">
                      confirmed guests
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Venue & Baraat Logistics */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Venue */}
          <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A98245]">
              Main Venue Logistics
            </span>
            <h3 className="pt-1 font-serif text-2xl font-bold text-[#7D1F35]">
              {displayVenue.name}
            </h3>
            <p className="pt-2 text-sm text-foreground/80">{displayVenue.address}</p>
            <div className="pt-5">
              <a
                href={displayVenue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#7D1F35] px-4 py-2 text-xs font-medium text-[#FFF9F0] transition hover:bg-[#4B1425]"
              >
                <Navigation className="size-3.5" />
                Open Directions in Google Maps
              </a>
            </div>
          </div>

          {/* Baraat Starting Point */}
          <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A98245]">
              Baraat Assembly & Departure
            </span>
            <h3 className="pt-1 font-serif text-2xl font-bold text-[#7D1F35]">
              {displayVenue.baraatPlace}
            </h3>
            <p className="pt-2 text-sm text-foreground/80">{displayVenue.baraatNote}</p>
            <div className="pt-5">
              <a
                href={displayVenue.baraatMapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#C7A064] bg-[#F8F1E7] px-4 py-2 text-xs font-medium text-[#7D1F35] transition hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
              >
                <MapPin className="size-3.5" />
                View Baraat Location
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
