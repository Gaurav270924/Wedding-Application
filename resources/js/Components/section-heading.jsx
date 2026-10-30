import { cn } from "@/Utils/utils.js";
import { motion } from "motion/react";

export function Ornament({ className }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-accent", className)}
      aria-hidden
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent sm:w-20" />
      <span className="text-sm">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent sm:w-20" />
    </div>
  );
}

export default function SectionHeading({ eyebrow, heading, script, text, light }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      {eyebrow && (
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A98245] sm:text-xs sm:tracking-[0.35em]">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "pt-3 font-serif text-2xl font-medium text-balance uppercase tracking-wide sm:text-4xl md:text-5xl break-words",
          light ? "text-[#FFF9F0]" : "text-primary"
        )}
      >
        {heading}
      </h2>
      {script && (
        <p className="pt-2 font-script text-2xl text-[#A98245] sm:text-4xl break-words">
          {script}
        </p>
      )}
      <Ornament className="pt-5" />
      {text && (
        <p
          className={cn(
            "pt-5 font-serif text-lg italic leading-relaxed sm:text-xl",
            light ? "text-[#FFF9F0]/90" : "text-muted-foreground"
          )}
        >
          {text}
        </p>
      )}
    </motion.div>
  );
}
