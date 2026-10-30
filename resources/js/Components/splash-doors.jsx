import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { User } from "lucide-react";
import { useContent } from "@/Utils/content-context.jsx";
import { Ornament } from "@/Components/section-heading.jsx";

export default function SplashDoors({ onEnter }) {
  const { splash: SPLASH } = useContent();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();
  const duration = reduce ? 0.4 : SPLASH.durationMs / 1000;

  const submit = (e) => {
    e.preventDefault();
    if (opening) return;
    const clean = name.trim().replace(/\s+/g, " ");
    if (clean.length < 2) return setError("Kripya apna naam likhein (at least 2 letters).");
    if (clean.length > 40) return setError("Naam thoda chhota rakhein (max 40 letters).");
    setError("");
    setOpening(true);
    // Fallback: reveal the site even if the animation callback never fires
    if (typeof window !== "undefined") {
      window.setTimeout(() => onEnter(clean), SPLASH.durationMs + 600);
    }
  };

  const door = (side) => (
    <motion.div
      className="absolute top-0 h-full w-1/2 overflow-hidden"
      style={{ [side]: 0, transformOrigin: side === "left" ? "left center" : "right center" }}
      animate={opening ? { x: side === "left" ? "-100%" : "100%", rotateY: side === "left" ? 25 : -25 } : {}}
      transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
    >
      <img
        src={SPLASH.doorImage}
        alt=""
        className="h-full w-full object-cover"
        style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}
      />
      <div className="absolute inset-0 bg-[#4B1425]/10" />
      <div
        className={`absolute top-0 h-full w-3 bg-gradient-to-b from-[#C7A064] via-[#A98245] to-[#C7A064] ${
          side === "left" ? "right-0" : "left-0"
        }`}
      />
    </motion.div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#4B1425] [perspective:1600px]"
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ delay: duration * 0.75, duration: 0.6 }}
      onAnimationComplete={() => opening && onEnter(name.trim().replace(/\s+/g, " "))}
    >
      <img src={SPLASH.backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {door("left")}
      {door("right")}

      <AnimatePresence>
        {!opening && (
          <motion.div
            key="panel"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center overflow-y-auto p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
              className="w-full max-w-md rounded-t-[200px] rounded-b-2xl border border-[#C7A064]/70 bg-[#FFF9F0]/92 px-6 pb-8 pt-14 text-center shadow-2xl backdrop-blur-sm sm:px-10"
            >
              <p className="font-serif text-3xl font-semibold tracking-[0.1em] text-[#7D1F35] sm:text-5xl sm:tracking-[0.15em] break-words">
                {SPLASH.title}
              </p>
              <Ornament className="pt-3" />
              <p className="pt-3 font-serif text-sm tracking-[0.15em] text-[#A98245] sm:text-xl sm:tracking-[0.25em] break-words">
                {SPLASH.names}
              </p>
              <p className="pt-4 font-serif text-base italic leading-relaxed text-[#3E332E]">
                {SPLASH.blessing}
              </p>
              <p className="pt-4 font-script text-2xl text-[#7D1F35]">{SPLASH.invite}</p>

              <form onSubmit={submit} className="space-y-3 pt-6" noValidate>
                <label htmlFor="guest-name" className="sr-only">
                  Your name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#A98245]" />
                  <input
                    id="guest-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={SPLASH.placeholder}
                    autoComplete="name"
                    maxLength={40}
                    aria-invalid={!!error}
                    aria-describedby={error ? "guest-name-error" : undefined}
                    className="h-12 w-full rounded-full border border-[#C7A064] bg-white/80 pl-11 pr-4 font-sans text-base text-[#3E332E] placeholder:text-[#81756A] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/40"
                  />
                </div>
                {error && (
                  <p id="guest-name-error" className="text-sm text-[#7D1F35]">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={opening}
                  className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] font-sans text-sm font-medium tracking-[0.2em] text-[#FFF9F0] shadow-lg transition hover:bg-[#4B1425] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A064] focus-visible:ring-offset-2 disabled:opacity-70"
                >
                  {SPLASH.button}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
