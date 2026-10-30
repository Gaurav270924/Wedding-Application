import { Link } from "@inertiajs/react";
import {
  Users,
  UserX,
  Heart,
  CalendarCheck,
  CheckCircle,
  EyeOff,
  Clock,
  ArrowRight,
  Download,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { cn } from "@/Utils/utils.js";

export default function Dashboard({ stats, recentRsvps = [], recentWishes = [], wedding = null }) {
  // Days until wedding (dynamic from database)
  const weddingDate = new Date(wedding?.dateIso || "2027-02-27T18:00:00+05:30").getTime();
  const daysRemaining = Math.max(0, Math.floor((weddingDate - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Real-time summary of wedding guest RSVPs and blessings"
    >
      <div className="space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Attending Guests */}
          <div className="rounded-3xl border border-[#C7A064]/50 bg-[#FFF9F0] p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A98245]">
                Attending Guests
              </span>
              <div className="rounded-2xl bg-[#7D1F35]/10 p-2.5 text-[#7D1F35]">
                <Users className="size-5" />
              </div>
            </div>
            <p className="pt-3 font-serif text-5xl font-semibold text-[#7D1F35]">
              {stats.total_guests}
            </p>
            <p className="pt-1 text-xs text-muted-foreground">
              From {stats.attending_count} accepted RSVPs
            </p>
          </div>

          {/* Declined Invitations */}
          <div className="rounded-3xl border border-[#C7A064]/50 bg-[#FFF9F0] p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A98245]">
                Declined
              </span>
              <div className="rounded-2xl bg-rose-100 p-2.5 text-rose-700">
                <UserX className="size-5" />
              </div>
            </div>
            <p className="pt-3 font-serif text-5xl font-semibold text-[#3E332E]">
              {stats.declined_count}
            </p>
            <p className="pt-1 text-xs text-muted-foreground">
              Out of {stats.total_rsvps} total responses
            </p>
          </div>

          {/* Total Wishes */}
          <div className="rounded-3xl border border-[#C7A064]/50 bg-[#FFF9F0] p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A98245]">
                Blessings
              </span>
              <div className="rounded-2xl bg-[#C7A064]/20 p-2.5 text-[#A98245]">
                <Heart className="size-5 fill-[#C7A064]" />
              </div>
            </div>
            <p className="pt-3 font-serif text-5xl font-semibold text-[#7D1F35]">
              {stats.total_wishes}
            </p>
            <p className="pt-1 text-xs text-muted-foreground">
              {stats.approved_wishes} visible on wall · {stats.pending_wishes} hidden
            </p>
          </div>

          {/* Countdown Days */}
          <div className="rounded-3xl border border-[#C7A064]/50 bg-[#FFF9F0] p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A98245]">
                Countdown
              </span>
              <div className="rounded-2xl bg-[#7D1F35]/10 p-2.5 text-[#7D1F35]">
                <Clock className="size-5" />
              </div>
            </div>
            <p className="pt-3 font-serif text-5xl font-semibold text-[#7D1F35]">
              {daysRemaining}
            </p>
            <p className="pt-1 text-xs text-muted-foreground">
              Days until 27 February 2027
            </p>
          </div>
        </div>

        {/* Function Headcount Breakdown */}
        <div className="rounded-3xl border border-[#C7A064]/40 bg-[#FFF9F0] p-6 shadow-xs">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#7D1F35]">
                Event Headcount Summary
              </h2>
              <p className="text-xs text-muted-foreground">
                Total guest attendees confirmed across ceremonies
              </p>
            </div>
            <a
              href="/admin/rsvps/export"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A064] bg-[#F8F1E7] px-4 py-1.5 text-xs font-medium text-[#7D1F35] shadow-2xs hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
            >
              <Download className="size-3.5" />
              Export Full Guest List (CSV)
            </a>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.entries(stats.events_breakdown || {}).map(([evt, count]) => (
              <div
                key={evt}
                className="rounded-2xl border border-[#E3D2B4] bg-[#F8F1E7] p-4 text-center transition hover:border-[#C7A064]"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-[#A98245]">
                  {evt}
                </p>
                <p className="pt-1 font-serif text-3xl font-bold text-[#7D1F35]">
                  {count}
                </p>
                <p className="text-[11px] text-muted-foreground">confirmed guests</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Recent RSVPs & Recent Blessings */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent RSVPs */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-[#A98245]" />
                  <h3 className="font-serif text-lg font-semibold text-[#7D1F35]">
                    Recent RSVPs
                  </h3>
                </div>
                <Link
                  href="/admin/rsvps"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#7D1F35] hover:underline"
                >
                  View All ({stats.total_rsvps})
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="mt-4 divide-y divide-[#E3D2B4]/60">
                {recentRsvps.length === 0 ? (
                  <p className="py-8 text-center text-xs text-muted-foreground">
                    No RSVPs received yet.
                  </p>
                ) : (
                  recentRsvps.map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-serif text-base font-semibold text-[#7D1F35]">
                          {r.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {r.contact} · {r.attending ? `${r.guest_count} guests` : "Declined"}
                        </p>
                      </div>
                      <div>
                        {r.attending ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                            <CheckCircle className="size-3" />
                            Attending
                          </span>
                        ) : (
                          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
                            Declined
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-[#E3D2B4]/60 pt-3">
              <Link
                href="/admin/rsvps"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C7A064] bg-[#F8F1E7] py-2 text-xs font-medium text-[#7D1F35] hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
              >
                Manage All RSVPs
              </Link>
            </div>
          </div>

          {/* Recent Blessings */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div className="flex items-center gap-2">
                  <Heart className="size-5 fill-[#C7A064] text-[#C7A064]" />
                  <h3 className="font-serif text-lg font-semibold text-[#7D1F35]">
                    Recent Blessings Wall
                  </h3>
                </div>
                <Link
                  href="/admin/wishes"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#7D1F35] hover:underline"
                >
                  View All ({stats.total_wishes})
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {recentWishes.length === 0 ? (
                  <p className="py-8 text-center text-xs text-muted-foreground">
                    No blessings on the wall yet.
                  </p>
                ) : (
                  recentWishes.map((w) => (
                    <div
                      key={w.id}
                      className="rounded-2xl border border-[#E3D2B4]/60 bg-[#F8F1E7] p-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-semibold text-[#7D1F35]">
                          {w.name}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            w.approved
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {w.approved ? "Visible" : "Hidden"}
                        </span>
                      </div>
                      <p className="pt-1.5 font-serif text-xs italic text-foreground/80 line-clamp-2">
                        “{w.message}”
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-[#E3D2B4]/60 pt-3">
              <Link
                href="/admin/wishes"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C7A064] bg-[#F8F1E7] py-2 text-xs font-medium text-[#7D1F35] hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
              >
                Moderate Blessings Wall
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
