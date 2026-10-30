import { motion } from "motion/react";
import { useContent } from "@/Utils/content-context.jsx";
import { formatDateLabel } from "@/Utils/date-format.js";
import { Ornament } from "@/Components/section-heading.jsx";
import { Button } from "@/Components/ui/button.jsx";

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: "easeOut" },
});

export default function Hero({ guest }) {
  const { hero, wedding } = useContent();
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#F8F1E7] pt-16">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          {guest && (
            <motion.p {...rise(0.2)} className="font-script text-3xl text-[#A98245]">
              Welcome, {guest}
            </motion.p>
          )}
          <motion.h1
            {...rise(0.4)}
            className="pt-3 font-serif text-4xl font-semibold tracking-[0.05em] text-primary sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            {...rise(0.6)}
            className="pt-3 font-serif text-base tracking-[0.15em] text-[#A98245] sm:text-2xl sm:tracking-[0.3em]"
          >
            {hero.names}
          </motion.p>
          <motion.div {...rise(0.7)}>
            <Ornament className="pt-5 lg:justify-start" />
          </motion.div>
          <motion.p {...rise(0.8)} className="pt-5 font-serif text-xl italic text-foreground sm:text-2xl">
            {hero.tagline}
          </motion.p>
          <motion.p {...rise(0.95)} className="pt-6 text-xs font-medium tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.35em]">
            {formatDateLabel(wedding.dateIso).toUpperCase()}
          </motion.p>
          <motion.p {...rise(1.05)} className="pt-1 text-muted-foreground">
            {wedding.venueShort}
          </motion.p>
          <motion.div {...rise(1.2)} className="flex flex-wrap justify-center gap-3 pt-8 lg:justify-start">
            <Button asChild size="lg" className="rounded-full px-7 tracking-wider">
              <a href="#story">Explore Our Story</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full border border-accent px-7 tracking-wider"
            >
              <a href="#celebrations">Wedding Details</a>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2"
        >
          <div className="absolute -inset-3 rounded-t-[999px] border border-accent/60" />
          <div className="overflow-hidden rounded-t-[999px] shadow-2xl">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="aspect-[3/4] w-full object-cover object-[50%_60%]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
