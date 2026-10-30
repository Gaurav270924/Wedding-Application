import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useContent } from "@/Utils/content-context.jsx";
import SectionHeading from "@/Components/section-heading.jsx";

export default function Gallery() {
  const { gallery: GALLERY } = useContent();
  const [idx, setIdx] = useState(null);
  const n = GALLERY.length;
  const step = useCallback((d) => setIdx((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (idx === null || typeof window === "undefined") return;
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, step]);

  return (
    <section id="gallery" className="bg-[#F8F1E7] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Gallery" heading="Moments We Treasure" />
        <div className="columns-2 gap-4 pt-14 md:columns-3">
          {GALLERY.map((p, i) => (
            <motion.button
              key={`${i}-${p.src}`}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group mb-4 block w-full cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
              aria-label={`Open photo: ${p.caption}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#1f0a10]/95 p-4"
            onClick={() => setIdx(null)}
          >
            <button
              className="absolute right-4 top-4 cursor-pointer p-2 text-white"
              aria-label="Close"
              onClick={() => setIdx(null)}
            >
              <X className="size-7" />
            </button>
            <button
              className="absolute left-2 cursor-pointer p-3 text-white sm:left-6"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <ChevronLeft className="size-9" />
            </button>
            <motion.figure
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) =>
                Math.abs(info.offset.x) > 60 && step(info.offset.x < 0 ? 1 : -1)
              }
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-4xl text-center"
            >
              <img
                src={GALLERY[idx].src}
                alt={GALLERY[idx].alt}
                className="max-h-[80vh] rounded-lg object-contain"
                draggable={false}
              />
              <figcaption className="pt-4 font-script text-3xl text-[#E8CFA0]">
                {GALLERY[idx].caption}
              </figcaption>
            </motion.figure>
            <button
              className="absolute right-2 cursor-pointer p-3 text-white sm:right-6"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <ChevronRight className="size-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
