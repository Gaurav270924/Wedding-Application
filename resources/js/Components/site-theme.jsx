import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { useContent } from "@/Utils/content-context.jsx";

const HEX = /^#[0-9a-f]{6}$/i;

function setMeta(selector, content) {
  if (typeof document === "undefined") return;
  document.querySelector(selector)?.setAttribute("content", content);
}

// Applies design settings (colours, font, radius) and page metadata to the document.
export default function SiteTheme({ children }) {
  const { design, settings } = useContent();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement.style;
    const vars = {
      "--heading-font": `"${design.headingFont}"`,
      "--radius": `${Math.min(2, Math.max(0, design.radius))}rem`,
    };
    if (HEX.test(design.primary)) {
      Object.assign(vars, { "--primary": design.primary, "--chart-1": design.primary });
    }
    if (HEX.test(design.accent)) {
      Object.assign(vars, { "--accent": design.accent, "--ring": design.accent });
    }
    if (HEX.test(design.background)) {
      vars["--background"] = design.background;
    }
    Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.removeProperty(k));
  }, [design]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = settings.siteTitle;
    setMeta('meta[name="description"]', settings.description);
    setMeta('meta[property="og:title"]', settings.siteTitle);
    setMeta('meta[property="og:description"]', settings.description);
  }, [settings]);

  return (
    <MotionConfig reducedMotion={design?.animations ? "user" : "always"}>
      {children}
    </MotionConfig>
  );
}
