import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useContent } from "@/Utils/content-context.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { Input } from "@/Components/ui/input.jsx";
import { Textarea } from "@/Components/ui/textarea.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Spinner } from "@/Components/ui/spinner.jsx";
import SectionHeading from "@/Components/section-heading.jsx";
import { cn } from "@/Utils/utils.js";

const fieldCls = "bg-white/80 border-input h-11";

export default function Rsvp({ guest }) {
  const { events: EVENTS } = useContent();
  const [name, setName] = useState(guest || "");
  const [contact, setContact] = useState("");
  const [attending, setAttending] = useState(null);
  const [count, setCount] = useState(1);
  const [events, setEvents] = useState(() => EVENTS.map((e) => e.title));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const toggle = (t) =>
    setEvents((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!contact.trim()) return setError("Please enter your mobile number or email.");
    if (attending === null) return setError("Please let us know if you can join.");
    if (attending && events.length === 0)
      return setError("Please choose at least one function.");
    setError("");
    setBusy(true);

    try {
      const response = await axios.post(
        "/rsvp",
        {
          name: name.trim(),
          contact: contact.trim(),
          attending,
          guest_count: attending ? count : 0,
          events: attending ? events : [],
          message: message ? message.trim() : null,
        },
        { headers: { Accept: "application/json" } }
      );

      setDone(attending);
      toast.success(
        response.data.updated
          ? "Your RSVP has been updated"
          : "Thank you! Your RSVP is saved"
      );
    } catch (err) {
      const msg =
        err.response?.data?.message || "Could not save your RSVP. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="rsvp" className="bg-[#FFF9F0] py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="RSVP"
          heading="Will You Join Our Celebration?"
          text="“We would love to celebrate our special day with you.”"
        />
        <div className="mt-12 rounded-2xl border border-accent/60 bg-[#F8F1E7] p-6 shadow-lg sm:p-10">
          {done !== null ? (
            <div className="space-y-4 py-6 text-center">
              <CheckCircle2 className="mx-auto size-12 text-primary" />
              <p className="font-serif text-3xl text-primary">
                {done ? "Milte hain shaadi mein!" : "Aapki kami khalegi"}
              </p>
              <p className="text-muted-foreground">
                {done
                  ? "Your RSVP is saved. We can't wait to celebrate with you."
                  : "Thank you for letting us know. Your blessings mean the world to us."}
              </p>
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => setDone(null)}
              >
                Edit my response
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="r-name">Your name</Label>
                  <Input
                    id="r-name"
                    className={fieldCls}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya Sharma"
                    maxLength={60}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r-contact">Mobile number or email</Label>
                  <Input
                    id="r-contact"
                    className={fieldCls}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={80}
                  />
                </div>
              </div>
              <fieldset className="space-y-2">
                <legend className="pb-2 text-sm font-medium">Will you attend?</legend>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: true, l: "Joyfully accept" },
                    { v: false, l: "Regretfully decline" },
                  ].map((o) => (
                    <button
                      key={o.l}
                      type="button"
                      aria-pressed={attending === o.v}
                      onClick={() => setAttending(o.v)}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-3 text-sm transition",
                        attending === o.v
                          ? "border-primary bg-primary text-primary-foreground font-medium"
                          : "border-input bg-white/70 hover:border-primary"
                      )}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </fieldset>
              {attending && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="r-count">Number of guests (including you)</Label>
                    <Input
                      id="r-count"
                      type="number"
                      min={1}
                      max={20}
                      className={cn(fieldCls, "w-32")}
                      value={count}
                      onChange={(e) =>
                        setCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
                      }
                    />
                  </div>
                  <fieldset>
                    <legend className="pb-2 text-sm font-medium">
                      Which functions will you attend?
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {EVENTS.map((ev) => (
                        <button
                          key={ev.title}
                          type="button"
                          aria-pressed={events.includes(ev.title)}
                          onClick={() => toggle(ev.title)}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-2 text-sm transition",
                            events.includes(ev.title)
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-input bg-white/70"
                          )}
                        >
                          {events.includes(ev.title) ? "✓ " : ""}
                          {ev.title}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="r-msg">Message or blessings (optional)</Label>
                <Textarea
                  id="r-msg"
                  className="bg-white/80"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Dher saara pyaar aur aashirwad…"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your contact details are only shared with the couple and their families to
                coordinate the wedding.
              </p>
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={busy}
                className="w-full rounded-full tracking-wider"
              >
                {busy ? <Spinner /> : "Send RSVP"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
