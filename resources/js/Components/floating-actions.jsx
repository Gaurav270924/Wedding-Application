import { useRef, useState } from "react";
import { Music, Pause, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/Utils/content-context.jsx";

const fab =
  "flex size-12 cursor-pointer items-center justify-center rounded-full border border-accent bg-[#FFF9F0]/95 text-primary shadow-lg backdrop-blur transition hover:scale-105";

// Floating music + share buttons. Music only starts when the guest taps play.
export default function FloatingActions({ raised = false }) {
  const { music, settings } = useContent();
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const hasMusic = music && music.enabled && music.url;

  const toggleMusic = async () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    try {
      await el.play();
      setPlaying(true);
    } catch {
      toast.error("Music couldn't play on this device.");
    }
  };

  const share = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.origin;
    if (navigator.share) {
      await navigator
        .share({ title: settings.siteTitle, text: settings.shareText, url })
        .catch(() => undefined);
      return;
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${settings.shareText} ${url}`);
      toast.success("Invitation link copied");
    }
  };

  return (
    <div
      className={`fixed right-5 z-40 flex flex-col gap-3 ${
        raised ? "bottom-20" : "bottom-5"
      }`}
    >
      {hasMusic && (
        <>
          <audio
            ref={audio}
            src={music.url}
            loop
            preload="none"
            onEnded={() => setPlaying(false)}
          />
          <button
            className={fab}
            onClick={toggleMusic}
            aria-label={playing ? "Pause music" : `Play music: ${music.title}`}
            aria-pressed={playing}
            title={music.title}
          >
            {playing ? <Pause className="size-5" /> : <Music className="size-5" />}
          </button>
        </>
      )}
      <button
        className={fab}
        onClick={share}
        aria-label="Share invitation"
        title="Share invitation"
      >
        <Share2 className="size-5" />
      </button>
    </div>
  );
}
