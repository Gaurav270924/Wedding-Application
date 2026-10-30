import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/Components/ui/button.jsx";
import { Input } from "@/Components/ui/input.jsx";
import { Textarea } from "@/Components/ui/textarea.jsx";
import { Spinner } from "@/Components/ui/spinner.jsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/Components/ui/empty.jsx";
import SectionHeading from "@/Components/section-heading.jsx";

export default function Wishes({ guest, initialWishes = [] }) {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState(guest || "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (message.trim().length < 3) return setError("Please write a short message.");
    setError("");
    setBusy(true);

    try {
      const response = await axios.post(
        "/wishes",
        { name: name.trim(), message: message.trim() },
        { headers: { Accept: "application/json" } }
      );

      const newWish = response.data.wish || {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
      };

      setWishes((prev) => [newWish, ...prev]);
      setMessage("");
      toast.success("Thank you! Your blessings have been received ♥");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Could not send your wish. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="wishes" className="bg-[#F8F1E7] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Best Wishes"
          heading="Blessings Wall"
          script="Apni duaayein yahan likhiye"
        />
        <div className="grid gap-10 pt-14 lg:grid-cols-5">
          <form
            onSubmit={onSubmit}
            noValidate
            className="h-fit space-y-4 rounded-2xl border border-accent/60 bg-[#FFF9F0] p-6 shadow-lg lg:col-span-2"
          >
            <label className="sr-only" htmlFor="w-name">
              Your name
            </label>
            <Input
              id="w-name"
              className="h-11 bg-white/80"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
            />
            <label className="sr-only" htmlFor="w-msg">
              Your message
            </label>
            <Textarea
              id="w-msg"
              className="bg-white/80"
              rows={5}
              placeholder="Kritagaya aur Anuradha ke liye dher saari shubhkamnayein…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            />
            <p className="text-right text-xs text-muted-foreground">
              {message.length}/500
            </p>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={busy} className="w-full rounded-full tracking-wider">
              {busy ? (
                <Spinner />
              ) : (
                <>
                  <Heart className="size-4" />
                  Send Blessings
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Messages appear directly on the wedding blessing wall.
            </p>
          </form>
          <div className="lg:col-span-3">
            {wishes.length === 0 ? (
              <Empty className="rounded-2xl border border-dashed border-accent/60">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleHeart />
                  </EmptyMedia>
                  <EmptyTitle>Be the first to bless the couple</EmptyTitle>
                  <EmptyDescription>Your words will be cherished forever.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="columns-1 gap-4 sm:columns-2">
                {wishes.map((w, i) => (
                  <motion.figure
                    key={w.id || i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.08 }}
                    className="mb-4 break-inside-avoid rounded-2xl border border-border bg-[#FFF9F0] p-5"
                  >
                    <blockquote className="font-serif text-lg italic leading-relaxed break-words text-foreground/85">
                      “{w.message}”
                    </blockquote>
                    <figcaption className="pt-3 font-script text-2xl text-primary">
                      — {w.name}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
