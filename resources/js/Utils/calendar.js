// Calendar helpers: Google Calendar link + .ics download
const toUtcStamp = (d) =>
  d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function weddingCalEvent(w) {
  return {
    title: `Wedding · ${w.groom} & ${w.bride}`,
    startIso: w.dateIso,
    durationHours: 6,
    location: w.venueShort,
    details: `${w.brand} — we can't wait to celebrate with you.`,
  };
}

function range(e) {
  const start = new Date(e.startIso);
  const end = new Date(start.getTime() + (e.durationHours ?? 4) * 3600_000);
  return { start: toUtcStamp(start), end: toUtcStamp(end) };
}

export function googleCalendarUrl(e) {
  const { start, end } = range(e);
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    location: e.location,
    details: e.details,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

const esc = (s) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

export function downloadIcs(e) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const { start, end } = range(e);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//K&A Forever//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${start}-${e.title.replace(/\W/g, "")}@kaforever`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.location)}`,
    `DESCRIPTION:${esc(e.details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${e.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
