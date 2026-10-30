import { motion } from "motion/react";
import { useContent } from "@/Utils/content-context.jsx";
import { cn } from "@/Utils/utils.js";
import { Ornament } from "@/Components/section-heading.jsx";

export default function OurStory() {
  const { story } = useContent();
  return (
    <section id="story" className="bg-[#FFF9F0] py-24">
      <div className="mx-auto max-w-6xl space-y-24 px-4 sm:px-6">
        {story.map((b, i) => (
          <div key={i} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <motion.figure
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className={cn("relative", i % 2 && "md:order-2")}
            >
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-accent/60" />
              <img
                src={b.image}
                alt={b.alt}
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
              />
              <figcaption className="pt-6 text-center font-script text-2xl text-[#A98245]">
                {b.caption}
              </figcaption>
            </motion.figure>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-center md:text-left"
            >
              {b.eyebrow && <p className="font-script text-3xl text-[#A98245]">{b.eyebrow}</p>}
              <h2 className="pt-2 font-serif text-4xl font-medium uppercase leading-tight text-balance text-primary sm:text-5xl">
                {b.heading}
              </h2>
              <Ornament className="pt-5 md:justify-start" />
              <div className="space-y-4 pt-6 font-serif text-xl italic leading-relaxed text-foreground/85">
                {b.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
