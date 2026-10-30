import { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import {
  Search,
  Download,
  Trash2,
  CheckCircle,
  UserX,
  Users,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";

export default function Rsvps({ stats, rsvps = [] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const filtered = useMemo(() => {
    return rsvps.filter((r) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.contact && r.contact.toLowerCase().includes(q)) ||
        (r.message && r.message.toLowerCase().includes(q));

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "attending" && r.attending) ||
        (statusFilter === "declined" && !r.attending);

      const matchEvent =
        eventFilter === "all" ||
        (Array.isArray(r.events) && r.events.includes(eventFilter));

      return matchSearch && matchStatus && matchEvent;
    });
  }, [rsvps, search, statusFilter, eventFilter]);

  const deleteRsvp = (id) => {
    if (!confirm("Are you sure you want to delete this RSVP record?")) return;
    setBusyId(`rsvp-delete-${id}`);
    router.delete(`/admin/rsvps/${id}`, {
      preserveScroll: true,
      onSuccess: () => toast.success("RSVP record deleted."),
      onError: () => toast.error("Could not delete RSVP."),
      onFinish: () => setBusyId(null),
    });
  };

  return (
    <AdminLayout
      title="RSVP & Guest Directory"
      subtitle={`Manage all ${rsvps.length} guest attendance responses`}
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, contact, or note..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-[#D9C4A0] bg-[#FFF9F0] pl-9 pr-4 text-sm text-[#3E332E] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-full border border-[#D9C4A0] bg-[#FFF9F0] px-4 text-xs font-medium text-[#3E332E] focus:outline-none"
            >
              <option value="all">Status: All Responses</option>
              <option value="attending">Status: Attending Only</option>
              <option value="declined">Status: Declined Only</option>
            </select>

            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="h-10 rounded-full border border-[#D9C4A0] bg-[#FFF9F0] px-4 text-xs font-medium text-[#3E332E] focus:outline-none"
            >
              <option value="all">Function: All Functions</option>
              <option value="Mehendi">Mehendi</option>
              <option value="Haldi">Haldi</option>
              <option value="Sangeet">Sangeet</option>
              <option value="The Wedding">The Wedding</option>
            </select>

            <a
              href="/admin/rsvps/export"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#7D1F35] px-4 text-xs font-medium tracking-wide text-[#FFF9F0] shadow-xs transition hover:bg-[#4B1425]"
            >
              <Download className="size-3.5" />
              Export CSV
            </a>
          </div>
        </div>

        {/* RSVP Table */}
        <div className="overflow-hidden rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#E3D2B4] bg-[#F1E6D6]/60 text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                <tr>
                  <th className="px-6 py-4">Guest Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Attendance</th>
                  <th className="px-6 py-4 text-center">Headcount</th>
                  <th className="px-6 py-4">Functions Selected</th>
                  <th className="px-6 py-4">Personal Note</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3D2B4]/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-muted-foreground">
                      No guests match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="transition hover:bg-[#F8F1E7]/50">
                      <td className="px-6 py-4 font-serif text-base font-semibold text-[#7D1F35]">
                        {r.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-foreground/80">
                        {r.contact}
                      </td>
                      <td className="px-6 py-4">
                        {r.attending ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                            <CheckCircle className="size-3" />
                            Joyfully Accept
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
                            <UserX className="size-3" />
                            Regretfully Decline
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center font-serif text-lg font-semibold text-[#7D1F35]">
                        {r.attending ? r.guest_count : "—"}
                      </td>
                      <td className="px-6 py-4">
                        {r.attending && Array.isArray(r.events) && r.events.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {r.events.map((ev) => (
                              <span
                                key={ev}
                                className="rounded-full border border-[#C7A064]/50 bg-[#F8F1E7] px-2.5 py-0.5 text-[11px] font-medium text-[#7D1F35]"
                              >
                                {ev}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="max-w-xs truncate px-6 py-4 text-xs italic text-foreground/80">
                        {r.message || "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteRsvp(r.id)}
                          disabled={busyId === `rsvp-delete-${r.id}`}
                          className="cursor-pointer rounded-full p-2 text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                          title="Delete RSVP"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
