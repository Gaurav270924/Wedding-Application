import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useContent } from "@/Utils/content-context.jsx";
import { cn } from "@/Utils/utils.js";
import { MADHAV_KRIPA_LOGO } from "@/Utils/wedding-content.js";

export default function SiteNav() {
  const { nav } = useContent();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // Track which section is in view to highlight it
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [nav]);

  const link = (id, label, mobile = false) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setOpen(false)}
      className={cn(
        "cursor-pointer whitespace-nowrap text-[13px] tracking-wide transition-colors hover:text-primary",
        mobile && "block py-3 text-base",
        active === id ? "text-primary font-medium" : "text-foreground/70"
      )}
      aria-current={active === id ? "true" : undefined}
    >
      {label}
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-[#FFF9F0]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          className="flex cursor-pointer items-center gap-2.5 font-serif text-xl sm:text-2xl font-semibold text-primary"
        >
          <img
            src={MADHAV_KRIPA_LOGO}
            alt="Madhav Kripa"
            className="h-9 sm:h-10 w-auto object-contain shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="inline">
            K<span className="text-accent">&</span>A{" "}
            <span className="font-script text-lg sm:text-xl font-normal text-[#A98245]">
              Forever
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {nav.map((n) => link(n.id, n.label))}
        </nav>
        <button
          className="cursor-pointer rounded-full p-2 text-primary xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-[#FFF9F0] px-6 xl:hidden"
            aria-label="Mobile"
          >
            <div className="py-2">{nav.map((n) => link(n.id, n.label, true))}</div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
