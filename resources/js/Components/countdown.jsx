import { useEffect, useState } from "react";
import { useContent } from "@/Utils/content-context.jsx";
import { formatDateLabel } from "@/Utils/date-format.js";
import { useOverlay } from "@/Utils/use-overlay.js";
import SectionHeading from "@/Components/section-heading.jsx";

function remaining(target, now) {
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    parts: [
      { label: "Days", value: Math.floor(diff / 86_400_000) },
      { label: "Hours", value: Math.floor(diff / 3_600_000) % 24 },
      { label: "Minutes", value: Math.floor(diff / 60_000) % 60 },
      { label: "Seconds", value: Math.floor(diff / 1000) % 60 },
    ],
  };
}

export default function Countdown() {
  const { wedding, countdown } = useContent();
  const overlay = useOverlay();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const { done, parts } = remaining(new Date(wedding.dateIso).getTime(), now);

  return (
    <section id="countdown" className="relative overflow-hidden py-28">
      <img
        src={countdown.backgroundImage}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#FFF9F0]" style={{ opacity: overlay }} />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={countdown.eyebrow}
          heading={countdown.heading}
          script={countdown.script}
        />
        {done ? (
          <p className="pt-12 text-center font-script text-5xl text-primary">
            Our forever has begun ♥
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 pt-12 sm:grid-cols-4" role="timer" aria-live="off">
            {parts.map((p) => (
              <div
                key={p.label}
                className="rounded-t-[80px] rounded-b-xl border border-accent bg-[#FFF9F0]/90 px-2 py-8 text-center shadow-lg"
              >
                <p
                  className="font-serif text-5xl font-semibold tabular-nums text-primary sm:text-6xl"
                  aria-label={`${p.value} ${p.label}`}
                >
                  {String(p.value).padStart(2, "0")}
                </p>
                <p className="pt-2 text-xs font-medium uppercase tracking-[0.3em] text-[#A98245]">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        )}
        <p className="pt-12 text-center text-xs font-medium tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.3em] break-words px-2">
          {wedding.groom.toUpperCase()} × {wedding.bride.toUpperCase()} ·{" "}
          {formatDateLabel(wedding.dateIso).toUpperCase()}
        </p>
      </div>
    </section>
  );
}
