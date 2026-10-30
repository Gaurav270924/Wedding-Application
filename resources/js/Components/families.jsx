import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useContent } from "@/Utils/content-context.jsx";
import SectionHeading from "@/Components/section-heading.jsx";

const initials = (name) =>
  name
    .replace(/^(Mr|Mrs|Ms)\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

function MemberCard({ m }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex gap-4 rounded-2xl border border-border bg-[#FFF9F0] p-5 shadow-sm"
    >
      {m.portrait ? (
        <img
          src={m.portrait}
          alt={m.name}
          loading="lazy"
          className="size-16 shrink-0 rounded-full border border-accent object-cover"
        />
      ) : (
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-accent bg-secondary font-serif text-xl text-primary">
          {initials(m.name)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h4 className="font-serif text-xl font-semibold text-primary sm:text-2xl">{m.name}</h4>
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#A98245] sm:text-xs sm:tracking-[0.2em]">{m.relation}</p>
        <div className="space-y-2 pt-3 font-serif text-base italic leading-relaxed text-foreground/85 sm:text-lg">
          {m.messages.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <AnimatePresence>
            {open && m.more && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {m.more}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {m.more && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="cursor-pointer pt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {open ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default function Families() {
  const { familyIntro, families, cousins } = useContent();
  return (
    <section id="families" className="bg-[#F8F1E7] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Families"
          heading={familyIntro.heading}
          text={familyIntro.text}
        />
        <div className="grid gap-12 pt-16 lg:grid-cols-2">
          {families.map((f, fi) => (
            <div key={fi}>
              <h3 className="pb-6 text-center font-serif text-3xl uppercase tracking-wider text-[#A98245]">
                {f.title}
              </h3>
              <div className="space-y-5">
                {f.members
                  .filter((m) => !m.hidden)
                  .map((m, mi) => (
                    <MemberCard key={mi} m={m} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid items-center gap-10 pt-24 md:grid-cols-2">
          <img
            src={cousins.image}
            alt={cousins.imageAlt}
            loading="lazy"
            className="aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
          />
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl uppercase text-balance text-primary sm:text-4xl">
              {cousins.heading}
            </h3>
            <div className="space-y-3 pt-4 sm:pt-5 font-serif text-base sm:text-xl italic text-foreground/85">
              {cousins.lines.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
