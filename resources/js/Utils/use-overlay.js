import { useContent } from "./content-context.jsx";

// Opacity (0–1) of the light wash over background photos
export function useOverlay() {
  const content = useContent();
  const overlay = content?.design?.overlay ?? 80;
  return Math.min(100, Math.max(0, overlay)) / 100;
}
