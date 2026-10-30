import { useState, useEffect } from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";

export default function DateTimePicker({
  label,
  value = "",
  onChange,
  helper = "",
}) {
  // Helper to extract YYYY-MM-DD from ISO or date string
  const parseDatePart = (iso) => {
    if (!iso) return "";
    try {
      const match = iso.match(/^(\d{4}-\d{2}-\d{2})/);
      return match ? match[1] : "";
    } catch {
      return "";
    }
  };

  // Helper to extract HH:MM from ISO string
  const parseTimePart = (iso) => {
    if (!iso) return "18:00";
    try {
      const match = iso.match(/T(\d{2}:\d{2})/);
      return match ? match[1] : "18:00";
    } catch {
      return "18:00";
    }
  };

  const [datePart, setDatePart] = useState(() => parseDatePart(value) || "2027-02-27");
  const [timePart, setTimePart] = useState(() => parseTimePart(value) || "18:00");

  useEffect(() => {
    if (value) {
      const d = parseDatePart(value);
      const t = parseTimePart(value);
      if (d) setDatePart(d);
      if (t) setTimePart(t);
    }
  }, [value]);

  const updateDateTime = (newDate, newTime) => {
    setDatePart(newDate);
    setTimePart(newTime);
    if (newDate) {
      const finalIso = `${newDate}T${newTime || "18:00"}:00+05:30`;
      onChange(finalIso);
    }
  };

  // Format friendly display
  const getFriendlyDisplay = () => {
    if (!datePart) return "No date selected";
    try {
      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, min] = (timePart || "18:00").split(":").map(Number);
      const d = new Date(year, month - 1, day, hour, min);

      const dateStr = d.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const timeStr = d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      return `${dateStr} at ${timeStr}`;
    } catch {
      return `${datePart} ${timePart}`;
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
          {label}
        </label>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Date Selector */}
        <div className="min-w-0 space-y-1">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/80">
            <Calendar className="size-3.5 text-[#A98245]" />
            <span>Select Date</span>
          </span>
          <input
            type="date"
            value={datePart}
            onChange={(e) => updateDateTime(e.target.value, timePart)}
            className="h-11 w-full min-w-0 appearance-none rounded-xl border border-[#D9C4A0] bg-white px-3 text-sm text-[#3E332E] focus:border-[#7D1F35] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/20"
          />
        </div>

        {/* Time Selector */}
        <div className="min-w-0 space-y-1">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/80">
            <Clock className="size-3.5 text-[#A98245]" />
            <span>Select Time</span>
          </span>
          <input
            type="time"
            value={timePart}
            onChange={(e) => updateDateTime(datePart, e.target.value)}
            className="h-11 w-full min-w-0 appearance-none rounded-xl border border-[#D9C4A0] bg-white px-3 text-sm text-[#3E332E] focus:border-[#7D1F35] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/20"
          />
        </div>
      </div>

      {/* Human-Readable Live Confirmation Badge */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#C7A064]/50 bg-[#FFF9F0] px-3.5 py-2 text-xs">
        <Sparkles className="size-3.5 shrink-0 text-[#C7A064]" />
        <span className="text-muted-foreground">Chosen Date:</span>
        <span className="font-serif text-sm font-semibold text-[#7D1F35] break-words">
          {getFriendlyDisplay()}
        </span>
      </div>

      {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
    </div>
  );
}
