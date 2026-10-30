import { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import {
  CheckCircle,
  EyeOff,
  Trash2,
  Heart,
  Search,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { cn } from "@/Utils/utils.js";

export default function Wishes({ stats, wishes = [] }) {
  const [filter, setFilter] = useState("all"); // 'all' | 'approved' | 'pending'
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState(null);

  const filtered = useMemo(() => {
    return wishes.filter((w) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        (w.name && w.name.toLowerCase().includes(q)) ||
        (w.message && w.message.toLowerCase().includes(q));

      const matchFilter =
        filter === "all" ||
        (filter === "approved" && w.approved) ||
        (filter === "pending" && !w.approved);

      return matchSearch && matchFilter;
    });
  }, [wishes, search, filter]);

  const toggleWish = (id) => {
    setBusyId(`wish-toggle-${id}`);
    router.post(
      `/admin/wishes/${id}/toggle`,
      {},
      {
        preserveScroll: true,
        onSuccess: () => toast.success("Wish status updated!"),
        onError: () => toast.error("Could not update wish status."),
        onFinish: () => setBusyId(null),
      }
    );
  };

  const deleteWish = (id) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    setBusyId(`wish-delete-${id}`);
    router.delete(`/admin/wishes/${id}`, {
      preserveScroll: true,
      onSuccess: () => toast.success("Wish deleted."),
      onError: () => toast.error("Could not delete wish."),
      onFinish: () => setBusyId(null),
    });
  };

  return (
    <AdminLayout
      title="Blessings Wall Moderation"
      subtitle={`Manage all ${wishes.length} guest wishes and blessings`}
    >
      <div className="space-y-6">
        {/* Filter & Search Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blessings by guest or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-[#D9C4A0] bg-[#FFF9F0] pl-9 pr-4 text-sm text-[#3E332E] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/30"
            />
          </div>

          <div className="flex gap-2">
            {[
              { id: "all", label: `All (${wishes.length})` },
              { id: "approved", label: `Visible (${stats.approved_wishes})` },
              { id: "pending", label: `Hidden (${stats.pending_wishes})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition",
                  filter === tab.id
                    ? "bg-[#7D1F35] text-[#FFF9F0] shadow-xs"
                    : "border border-[#D9C4A0] bg-[#FFF9F0] text-foreground/70 hover:bg-[#F8F1E7]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wishes Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-16 text-center text-muted-foreground">
              No blessings found under the selected filter.
            </div>
          ) : (
            filtered.map((w) => (
              <div
                key={w.id}
                className="flex flex-col justify-between rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs transition hover:border-[#C7A064]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-semibold text-[#7D1F35]">
                      {w.name}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                        w.approved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      )}
                    >
                      {w.approved ? "Visible on Wall" : "Hidden"}
                    </span>
                  </div>

                  <blockquote className="pt-3 font-serif text-base italic leading-relaxed text-foreground/85">
                    “{w.message}”
                  </blockquote>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#E3D2B4]/60 pt-4 text-xs">
                  <span className="text-[11px] text-muted-foreground">
                    {w.created_at ? new Date(w.created_at).toLocaleDateString() : ""}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWish(w.id)}
                      disabled={busyId === `wish-toggle-${w.id}`}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#D9C4A0] bg-[#F8F1E7] px-3 py-1.5 text-xs font-medium text-[#7D1F35] transition hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
                    >
                      {w.approved ? (
                        <>
                          <EyeOff className="size-3.5 text-amber-600" />
                          Hide
                        </>
                      ) : (
                        <>
                          <CheckCircle className="size-3.5 text-emerald-600" />
                          Approve
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => deleteWish(w.id)}
                      disabled={busyId === `wish-delete-${w.id}`}
                      className="cursor-pointer rounded-full p-2 text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                      title="Delete wish"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
