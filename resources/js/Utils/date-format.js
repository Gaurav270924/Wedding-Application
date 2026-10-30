// All wedding times are shown in India time, regardless of where the guest is.
export const WEDDING_TZ = "Asia/Kolkata";
const IST_OFFSET = "+05:30";

export function formatDateLabel(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: WEDDING_TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatTimeLabel(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: WEDDING_TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function istParts(iso) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: WEDDING_TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const p = Object.fromEntries(
    fmt.formatToParts(new Date(iso)).map((x) => [x.type, x.value])
  );
  return { y: Number(p.year), m: Number(p.month) - 1, d: Number(p.day) };
}

export function isoToIstInput(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const shifted = new Date(d.getTime() + 330 * 60_000);
  return shifted.toISOString().slice(0, 16);
}

export function istInputToIso(local) {
  return local ? `${local}:00${IST_OFFSET}` : "";
}
