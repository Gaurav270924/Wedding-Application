import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import {
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Heart,
  DoorOpen,
  Sparkles,
  BookOpen,
  Users,
  CalendarCheck,
  MapPin,
  Image as ImageIcon,
  Palette,
  Music,
  Check,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import ImageUploadInput from "@/Components/ImageUploadInput.jsx";
import DateTimePicker from "@/Components/DateTimePicker.jsx";
import { cn } from "@/Utils/utils.js";

const TABS = [
  { id: "wedding", label: "Wedding & Couple", icon: Heart },
  { id: "splash", label: "Splash Doors", icon: DoorOpen },
  { id: "hero", label: "Hero Banner", icon: Sparkles },
  { id: "story", label: "Our Story", icon: BookOpen },
  { id: "families", label: "Families & Relatives", icon: Users },
  { id: "celebrations", label: "Ceremonies & Events", icon: CalendarCheck },
  { id: "venue", label: "Venue & Countdown", icon: MapPin },
  { id: "gallery", label: "Photo Gallery", icon: ImageIcon },
  { id: "closing", label: "Parents & Final Invite", icon: Heart },
  { id: "design", label: "Theme & Music", icon: Palette },
];

export default function ContentEditor({ content = {} }) {
  // Query param check for tab
  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("tab");
      if (t && TABS.some((tab) => tab.id === t)) return t;
    }
    return "wedding";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [formData, setFormData] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  // Sync with prop if content changes
  useEffect(() => {
    setFormData(content);
  }, [content]);

  // Deep update helper
  const updateSection = (section, updates) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        ...updates,
      },
    }));
  };

  const setDirectSection = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  // Save current active tab or specific sections
  const handleSaveTab = (sectionsToSave) => {
    setIsSaving(true);
    const payload = {};
    sectionsToSave.forEach((sec) => {
      payload[sec] = formData[sec];
    });

    router.post(
      "/admin/content",
      { sections: payload },
      {
        preserveScroll: true,
        onSuccess: () => toast.success("Changes saved successfully to database!"),
        onError: () => toast.error("Could not save changes."),
        onFinish: () => setIsSaving(false),
      }
    );
  };

  const handleResetSection = (section) => {
    if (!confirm(`Are you sure you want to restore "${section}" to default content?`)) return;

    router.post(
      "/admin/content/reset",
      { section },
      {
        preserveScroll: true,
        onSuccess: () => toast.success(`${section} restored to defaults.`),
        onError: () => toast.error("Reset failed."),
      }
    );
  };

  return (
    <AdminLayout
      title="Website Content & Media CMS"
      subtitle="Edit all text copy, photos, ceremonies, families, and colors directly from database"
    >
      <div className="space-y-6">
        {/* Top Header Actions Bar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-[#C7A064]/40 bg-[#FFF9F0] p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
              Live Database Content Mode
            </span>
            <span className="rounded-full bg-[#7D1F35]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#7D1F35]">
              All Website Sections
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A064] bg-[#FFF9F0] px-4 py-2 text-xs font-medium text-[#7D1F35] shadow-2xs transition hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
            >
              <ExternalLink className="size-3.5" />
              <span>Preview Live Site</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl px-4 py-3 text-xs font-semibold transition",
                  active
                    ? "bg-[#7D1F35] text-[#FFF9F0] shadow-xs"
                    : "border border-[#E3D2B4] bg-[#FFF9F0] text-foreground/75 hover:bg-[#F8F1E7] hover:text-[#7D1F35]"
                )}
              >
                <Icon className={cn("size-4", active ? "text-[#C7A064]" : "text-[#A98245]")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: WEDDING & COUPLE DETAILS */}
        {activeTab === "wedding" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Couple & Core Details
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Names, brand headline, official wedding date & short location
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("wedding")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Groom's Name
                  </label>
                  <input
                    type="text"
                    value={formData.wedding?.groom || ""}
                    onChange={(e) => updateSection("wedding", { groom: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    value={formData.wedding?.bride || ""}
                    onChange={(e) => updateSection("wedding", { bride: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Brand Title / Header
                  </label>
                  <input
                    type="text"
                    value={formData.wedding?.brand || ""}
                    onChange={(e) => updateSection("wedding", { brand: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Short Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.wedding?.venueShort || ""}
                    onChange={(e) => updateSection("wedding", { venueShort: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <DateTimePicker
                    label="Official Wedding Date & Ceremony Start Time"
                    value={formData.wedding?.dateIso || "2027-02-27T18:00:00+05:30"}
                    onChange={(iso) => updateSection("wedding", { dateIso: iso })}
                    helper="Select the date and time. This automatically sets the live countdown clock and the wedding date headers across the entire website."
                  />
                </div>
              </div>
            </div>

            {/* SEO & Meta Settings */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="border-b border-[#E3D2B4] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                  Site Metadata & Footer Note
                </h3>
                <p className="text-xs text-muted-foreground">
                  Browser tab title, SEO description, share text and footer message
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Browser Title & Meta OG Title
                  </label>
                  <input
                    type="text"
                    value={formData.settings?.siteTitle || ""}
                    onChange={(e) => updateSection("settings", { siteTitle: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Meta Description (SEO & WhatsApp previews)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.settings?.description || ""}
                    onChange={(e) => updateSection("settings", { description: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[#D9C4A0] bg-white p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Share WhatsApp Invitation Text
                  </label>
                  <input
                    type="text"
                    value={formData.settings?.shareText || ""}
                    onChange={(e) => updateSection("settings", { shareText: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Footer Love Note
                  </label>
                  <input
                    type="text"
                    value={formData.settings?.footerNote || ""}
                    onChange={(e) => updateSection("settings", { footerNote: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["wedding", "settings"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Wedding & SEO Details"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SPLASH DOORS */}
        {activeTab === "splash" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Opening Splash Doors Experience
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize greeting, divine blessing quote, doors panel graphics & animation
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("splash")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Splash Main Title
                  </label>
                  <input
                    type="text"
                    value={formData.splash?.title || ""}
                    onChange={(e) => updateSection("splash", { title: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Couple Names Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.splash?.names || ""}
                    onChange={(e) => updateSection("splash", { names: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Madhav Blessing Line
                  </label>
                  <textarea
                    rows={2}
                    value={formData.splash?.blessing || ""}
                    onChange={(e) => updateSection("splash", { blessing: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[#D9C4A0] bg-white p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Invitation Script Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.splash?.invite || ""}
                    onChange={(e) => updateSection("splash", { invite: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Name Input Placeholder
                  </label>
                  <input
                    type="text"
                    value={formData.splash?.placeholder || ""}
                    onChange={(e) => updateSection("splash", { placeholder: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Open Doors Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.splash?.button || ""}
                    onChange={(e) => updateSection("splash", { button: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Opening Animation Duration (ms)
                  </label>
                  <input
                    type="number"
                    value={formData.splash?.durationMs || 2200}
                    onChange={(e) => updateSection("splash", { durationMs: parseInt(e.target.value) || 2200 })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>
              </div>

              {/* Doors Images */}
              <div className="grid gap-6 pt-4 border-t border-[#E3D2B4] md:grid-cols-2">
                <ImageUploadInput
                  label="Royal Door Panels Image"
                  value={formData.splash?.doorImage || ""}
                  onChange={(url) => updateSection("splash", { doorImage: url })}
                  helper="Texture applied on left and right opening doors"
                  aspect="aspect-[9/16]"
                />

                <ImageUploadInput
                  label="Splash Backdrop Garden Image"
                  value={formData.splash?.backgroundImage || ""}
                  onChange={(url) => updateSection("splash", { backgroundImage: url })}
                  helper="Palace garden background revealed behind the doors"
                  aspect="aspect-[16/10]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["splash"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Splash Doors"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: HERO BANNER */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Hero Banner & Couple Portrait
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Headline, romantic quote, and the main couple photograph displayed at top
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("hero")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Hero Main Title
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.title || ""}
                    onChange={(e) => updateSection("hero", { title: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Couple Names
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.names || ""}
                    onChange={(e) => updateSection("hero", { names: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Romantic Tagline Quote
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.tagline || ""}
                    onChange={(e) => updateSection("hero", { tagline: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Image Alt Description
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.imageAlt || ""}
                    onChange={(e) => updateSection("hero", { imageAlt: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3D2B4]">
                <ImageUploadInput
                  label="Hero Couple Photo (Arch Shape)"
                  value={formData.hero?.image || ""}
                  onChange={(url) => updateSection("hero", { image: url })}
                  helper="Main arched photograph of the couple on the home hero screen"
                  aspect="aspect-[3/4]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["hero"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Hero Section"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: OUR STORY CHAPTERS */}
        {activeTab === "story" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Our Story Chapters
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Story cards with alternating photographs, headings, and emotional narrative
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleResetSection("story")}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                  >
                    <RotateCcw className="size-3" />
                    <span>Restore Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const newStories = [
                        ...(formData.story || []),
                        {
                          eyebrow: "Our Journey",
                          heading: "New Chapter Title",
                          paragraphs: ["Enter story paragraph here..."],
                          image: "",
                          alt: "Couple photograph",
                          caption: "Chapter Caption",
                        },
                      ];
                      setDirectSection("story", newStories);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#7D1F35] px-4 py-1.5 text-xs font-semibold text-[#FFF9F0] hover:bg-[#4B1425]"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Chapter</span>
                  </button>
                </div>
              </div>

              {/* Story Items */}
              <div className="space-y-8">
                {(formData.story || []).map((st, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#E3D2B4] bg-[#F8F1E7]/70 p-5 space-y-4 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3D2B4]/80 pb-3">
                      <span className="font-serif text-base font-bold text-[#7D1F35]">
                        Chapter {idx + 1}: {st.heading || "Untitled"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.story || []).filter((_, i) => i !== idx);
                          setDirectSection("story", updated);
                        }}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove Chapter
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                          Eyebrow Script (e.g. Our Story)
                        </label>
                        <input
                          type="text"
                          value={st.eyebrow || ""}
                          onChange={(e) => {
                            const updated = [...(formData.story || [])];
                            updated[idx].eyebrow = e.target.value;
                            setDirectSection("story", updated);
                          }}
                          className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                          Chapter Heading
                        </label>
                        <input
                          type="text"
                          value={st.heading || ""}
                          onChange={(e) => {
                            const updated = [...(formData.story || [])];
                            updated[idx].heading = e.target.value;
                            setDirectSection("story", updated);
                          }}
                          className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                          Story Paragraphs (Separated by double Enter)
                        </label>
                        <textarea
                          rows={3}
                          value={Array.isArray(st.paragraphs) ? st.paragraphs.join("\n\n") : st.paragraphs || ""}
                          onChange={(e) => {
                            const updated = [...(formData.story || [])];
                            updated[idx].paragraphs = e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean);
                            setDirectSection("story", updated);
                          }}
                          className="mt-1 w-full rounded-xl border border-[#D9C4A0] bg-white p-3 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                          Photo Script Caption
                        </label>
                        <input
                          type="text"
                          value={st.caption || ""}
                          onChange={(e) => {
                            const updated = [...(formData.story || [])];
                            updated[idx].caption = e.target.value;
                            setDirectSection("story", updated);
                          }}
                          className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                          Image Alt Tag
                        </label>
                        <input
                          type="text"
                          value={st.alt || ""}
                          onChange={(e) => {
                            const updated = [...(formData.story || [])];
                            updated[idx].alt = e.target.value;
                            setDirectSection("story", updated);
                          }}
                          className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <ImageUploadInput
                        label="Chapter Photo"
                        value={st.image || ""}
                        onChange={(url) => {
                          const updated = [...(formData.story || [])];
                          updated[idx].image = url;
                          setDirectSection("story", updated);
                        }}
                        helper="Vertical aspect photograph displayed next to this story chapter"
                        aspect="aspect-[4/5]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["story"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Our Story"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: FAMILIES & RELATIVES */}
        {activeTab === "families" && (
          <div className="space-y-6">
            {/* Family Intro */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                  Family Intro Section
                </h3>
                <button
                  type="button"
                  onClick={() => handleResetSection("familyIntro")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Intro Heading
                  </label>
                  <input
                    type="text"
                    value={formData.familyIntro?.heading || ""}
                    onChange={(e) => updateSection("familyIntro", { heading: e.target.value })}
                    className="mt-1 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Intro Subtext
                  </label>
                  <input
                    type="text"
                    value={formData.familyIntro?.text || ""}
                    onChange={(e) => updateSection("familyIntro", { text: e.target.value })}
                    className="mt-1 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Families Cards */}
            {(formData.families || []).map((fam, famIdx) => (
              <div
                key={famIdx}
                className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A98245]">
                      Family Column {famIdx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#7D1F35]">{fam.title}</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const updatedFamilies = [...(formData.families || [])];
                      updatedFamilies[famIdx].members.push({
                        name: "New Family Member",
                        relation: "Relation",
                        messages: ["Blessing message..."],
                        more: "",
                        portrait: "",
                        hidden: false,
                      });
                      setDirectSection("families", updatedFamilies);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#7D1F35] px-4 py-1.5 text-xs font-semibold text-[#FFF9F0] hover:bg-[#4B1425]"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Member</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Column Title
                  </label>
                  <input
                    type="text"
                    value={fam.title || ""}
                    onChange={(e) => {
                      const updated = [...(formData.families || [])];
                      updated[famIdx].title = e.target.value;
                      setDirectSection("families", updated);
                    }}
                    className="mt-1 h-10 w-full max-w-sm rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>

                {/* Members list */}
                <div className="space-y-4 pt-2">
                  {(fam.members || []).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded-2xl border border-[#E3D2B4] bg-[#F8F1E7]/70 p-4 space-y-3"
                    >
                      <div className="flex flex-col gap-2 border-b border-[#E3D2B4]/60 pb-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif text-sm font-bold text-[#7D1F35]">
                            {m.name || "Member"}
                          </span>
                          <span className="text-xs text-[#A98245]">({m.relation})</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs text-foreground/80 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!m.hidden}
                              onChange={(e) => {
                                const updated = [...(formData.families || [])];
                                updated[famIdx].members[mIdx].hidden = e.target.checked;
                                setDirectSection("families", updated);
                              }}
                              className="rounded border-[#D9C4A0] text-[#7D1F35]"
                            />
                            <span>Hide from Site</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(formData.families || [])];
                              updated[famIdx].members = updated[famIdx].members.filter((_, i) => i !== mIdx);
                              setDirectSection("families", updated);
                            }}
                            className="text-xs text-rose-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={m.name || ""}
                            onChange={(e) => {
                              const updated = [...(formData.families || [])];
                              updated[famIdx].members[mIdx].name = e.target.value;
                              setDirectSection("families", updated);
                            }}
                            className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                            Relation Label
                          </label>
                          <input
                            type="text"
                            value={m.relation || ""}
                            onChange={(e) => {
                              const updated = [...(formData.families || [])];
                              updated[famIdx].members[mIdx].relation = e.target.value;
                              setDirectSection("families", updated);
                            }}
                            className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                            Quote / Message (Separated by double Enter)
                          </label>
                          <textarea
                            rows={2}
                            value={Array.isArray(m.messages) ? m.messages.join("\n\n") : m.messages || ""}
                            onChange={(e) => {
                              const updated = [...(formData.families || [])];
                              updated[famIdx].members[mIdx].messages = e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean);
                              setDirectSection("families", updated);
                            }}
                            className="mt-1 w-full rounded-lg border border-[#D9C4A0] bg-white p-2 text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                            Extended "Read More" Text (Optional)
                          </label>
                          <textarea
                            rows={2}
                            value={m.more || ""}
                            onChange={(e) => {
                              const updated = [...(formData.families || [])];
                              updated[famIdx].members[mIdx].more = e.target.value;
                              setDirectSection("families", updated);
                            }}
                            className="mt-1 w-full rounded-lg border border-[#D9C4A0] bg-white p-2 text-xs"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <ImageUploadInput
                          label="Member Portrait Photograph (Circular)"
                          value={m.portrait || ""}
                          onChange={(url) => {
                            const updated = [...(formData.families || [])];
                            updated[famIdx].members[mIdx].portrait = url;
                            setDirectSection("families", updated);
                          }}
                          helper="Leaves initials if no portrait is uploaded"
                          aspect="aspect-square"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Cousins Section */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                  Cousins & Memories Card
                </h3>
                <button
                  type="button"
                  onClick={() => handleResetSection("cousins")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Cousins Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.cousins?.heading || ""}
                    onChange={(e) => updateSection("cousins", { heading: e.target.value })}
                    className="mt-1 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Cousins Lines (Separated by double Enter)
                  </label>
                  <textarea
                    rows={3}
                    value={Array.isArray(formData.cousins?.lines) ? formData.cousins.lines.join("\n\n") : formData.cousins?.lines || ""}
                    onChange={(e) =>
                      updateSection("cousins", {
                        lines: e.target.value.split("\n\n").map((l) => l.trim()).filter(Boolean),
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-[#D9C4A0] bg-white p-3 text-sm"
                  />
                </div>

                <ImageUploadInput
                  label="Cousins Group Photograph"
                  value={formData.cousins?.image || ""}
                  onChange={(url) => updateSection("cousins", { image: url })}
                  helper="Horizontal landscape group photograph"
                  aspect="aspect-[3/2]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["familyIntro", "families", "cousins"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Families & Cousins"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: CEREMONIES & CELEBRATIONS */}
        {activeTab === "celebrations" && (
          <div className="space-y-6">
            {/* Celebrations Intro */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                  Celebrations Header
                </h3>
                <button
                  type="button"
                  onClick={() => handleResetSection("celebrationsIntro")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Eyebrow (e.g. Celebrations)
                  </label>
                  <input
                    type="text"
                    value={formData.celebrationsIntro?.eyebrow || ""}
                    onChange={(e) => updateSection("celebrationsIntro", { eyebrow: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Main Heading
                  </label>
                  <input
                    type="text"
                    value={formData.celebrationsIntro?.heading || ""}
                    onChange={(e) => updateSection("celebrationsIntro", { heading: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Script Callout Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.celebrationsIntro?.script || ""}
                    onChange={(e) => updateSection("celebrationsIntro", { script: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Intro Paragraph Text
                  </label>
                  <input
                    type="text"
                    value={formData.celebrationsIntro?.text || ""}
                    onChange={(e) => updateSection("celebrationsIntro", { text: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Ceremony Cards Schedule
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Events displayed in the celebrations grid with Google Calendar & .ics export
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleResetSection("events")}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                  >
                    <RotateCcw className="size-3" />
                    <span>Restore Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [
                        ...(formData.events || []),
                        {
                          title: "New Ceremony",
                          tagline: "Event Tagline",
                          startIso: "2027-02-26T18:00:00+05:30",
                          venue: formData.wedding?.venueShort || "Wedding Venue",
                          dressCode: "Traditional Wear",
                          quote: "Quote for this event...",
                          image: "",
                        },
                      ];
                      setDirectSection("events", updated);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#7D1F35] px-4 py-1.5 text-xs font-semibold text-[#FFF9F0] hover:bg-[#4B1425]"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Ceremony</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {(formData.events || []).map((evt, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#E3D2B4] bg-[#F8F1E7]/70 p-5 space-y-4 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3D2B4]/80 pb-2">
                      <span className="font-serif text-base font-bold text-[#7D1F35]">
                        Function {idx + 1}: {evt.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.events || []).filter((_, i) => i !== idx);
                          setDirectSection("events", updated);
                        }}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove Ceremony
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                          Ceremony Title (e.g. Mehendi, Haldi, Sangeet, The Wedding)
                        </label>
                        <input
                          type="text"
                          value={evt.title || ""}
                          onChange={(e) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].title = e.target.value;
                            setDirectSection("events", updated);
                          }}
                          className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                          Tagline (Script font)
                        </label>
                        <input
                          type="text"
                          value={evt.tagline || ""}
                          onChange={(e) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].tagline = e.target.value;
                            setDirectSection("events", updated);
                          }}
                          className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div>
                        <DateTimePicker
                          label="Ceremony Date & Start Time"
                          value={evt.startIso || "2027-02-26T18:00:00+05:30"}
                          onChange={(iso) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].startIso = iso;
                            setDirectSection("events", updated);
                          }}
                          helper="Powers the ceremony schedule and Google Calendar invitation"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                          Venue
                        </label>
                        <input
                          type="text"
                          value={evt.venue || ""}
                          onChange={(e) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].venue = e.target.value;
                            setDirectSection("events", updated);
                          }}
                          className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                          Dress Code
                        </label>
                        <input
                          type="text"
                          value={evt.dressCode || ""}
                          onChange={(e) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].dressCode = e.target.value;
                            setDirectSection("events", updated);
                          }}
                          className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold uppercase text-[#7D1F35]">
                          Romantic / Festive Quote
                        </label>
                        <input
                          type="text"
                          value={evt.quote || ""}
                          onChange={(e) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].quote = e.target.value;
                            setDirectSection("events", updated);
                          }}
                          className="mt-1 h-9 w-full rounded-lg border border-[#D9C4A0] bg-white px-3 text-xs"
                        />
                      </div>

                      <div className="pt-2">
                        <ImageUploadInput
                          label="Ceremony Card Image (Arched Top)"
                          value={evt.image || ""}
                          onChange={(url) => {
                            const updated = [...(formData.events || [])];
                            updated[idx].image = url;
                            setDirectSection("events", updated);
                          }}
                          helper="Vertical photograph showcased on top of event card"
                          aspect="aspect-[4/5]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["celebrationsIntro", "events"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Celebrations & Events"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: VENUE & COUNTDOWN */}
        {activeTab === "venue" && (
          <div className="space-y-6">
            {/* Venue Card */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Wedding Venue & Baraat Details
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Physical location, Google Maps navigation links, and Baraat assembly details
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("venue")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.venue?.name || ""}
                    onChange={(e) => updateSection("venue", { name: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Full Address
                  </label>
                  <input
                    type="text"
                    value={formData.venue?.address || ""}
                    onChange={(e) => updateSection("venue", { address: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Google Maps URL for Venue
                  </label>
                  <input
                    type="text"
                    value={formData.venue?.mapUrl || ""}
                    onChange={(e) => updateSection("venue", { mapUrl: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Baraat Assembly Place
                  </label>
                  <input
                    type="text"
                    value={formData.venue?.baraatPlace || ""}
                    onChange={(e) => updateSection("venue", { baraatPlace: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Baraat Landmark Note
                  </label>
                  <input
                    type="text"
                    value={formData.venue?.baraatNote || ""}
                    onChange={(e) => updateSection("venue", { baraatNote: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Baraat Google Maps URL
                  </label>
                  <input
                    type="text"
                    value={formData.venue?.baraatMapUrl || ""}
                    onChange={(e) => updateSection("venue", { baraatMapUrl: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3D2B4]">
                <ImageUploadInput
                  label="Venue Illustration / Resort Image"
                  value={formData.venue?.image || ""}
                  onChange={(url) => updateSection("venue", { image: url })}
                  helper="Shown in the Venue card and save-the-date backgrounds"
                  aspect="aspect-[16/10]"
                />
              </div>
            </div>

            {/* Countdown Banner */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                  Countdown Banner
                </h3>
                <button
                  type="button"
                  onClick={() => handleResetSection("countdown")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Eyebrow Title
                  </label>
                  <input
                    type="text"
                    value={formData.countdown?.eyebrow || ""}
                    onChange={(e) => updateSection("countdown", { eyebrow: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Main Heading
                  </label>
                  <input
                    type="text"
                    value={formData.countdown?.heading || ""}
                    onChange={(e) => updateSection("countdown", { heading: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Script Quote Callout
                  </label>
                  <input
                    type="text"
                    value={formData.countdown?.script || ""}
                    onChange={(e) => updateSection("countdown", { script: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Countdown Background Backdrop"
                value={formData.countdown?.backgroundImage || ""}
                onChange={(url) => updateSection("countdown", { backgroundImage: url })}
                helper="Full-width atmospheric image behind the live ticking timer"
                aspect="aspect-video"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["venue", "countdown"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Venue & Countdown"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 8: PHOTO GALLERY */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Photo Gallery Moments
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Upload and manage high-resolution couple photographs displayed in the interactive lightbox grid
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleResetSection("gallery")}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                  >
                    <RotateCcw className="size-3" />
                    <span>Restore Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [
                        ...(formData.gallery || []),
                        {
                          src: "",
                          alt: "Couple photograph",
                          caption: "New Treasure Moment",
                        },
                      ];
                      setDirectSection("gallery", updated);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#7D1F35] px-4 py-1.5 text-xs font-semibold text-[#FFF9F0] hover:bg-[#4B1425]"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(formData.gallery || []).map((pic, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#E3D2B4] bg-[#F8F1E7]/70 p-4 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#E3D2B4]/80 pb-2">
                      <span className="font-serif text-xs font-bold text-[#7D1F35]">
                        Photo {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.gallery || []).filter((_, i) => i !== idx);
                          setDirectSection("gallery", updated);
                        }}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>

                    <ImageUploadInput
                      value={pic.src || ""}
                      onChange={(url) => {
                        const updated = [...(formData.gallery || [])];
                        updated[idx].src = url;
                        setDirectSection("gallery", updated);
                      }}
                      aspect="aspect-[4/5]"
                    />

                    <div>
                      <label className="text-[10px] font-semibold uppercase text-[#7D1F35]">
                        Caption (Script lightbox)
                      </label>
                      <input
                        type="text"
                        value={pic.caption || ""}
                        onChange={(e) => {
                          const updated = [...(formData.gallery || [])];
                          updated[idx].caption = e.target.value;
                          setDirectSection("gallery", updated);
                        }}
                        placeholder="Romantic moment caption"
                        className="mt-1 h-8 w-full rounded-lg border border-[#D9C4A0] bg-white px-2.5 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase text-[#7D1F35]">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        value={pic.alt || ""}
                        onChange={(e) => {
                          const updated = [...(formData.gallery || [])];
                          updated[idx].alt = e.target.value;
                          setDirectSection("gallery", updated);
                        }}
                        placeholder="Accessibility description"
                        className="mt-1 h-8 w-full rounded-lg border border-[#D9C4A0] bg-white px-2.5 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["gallery"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Gallery Photos"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 9: PARENTS' BLESSINGS & FINAL INVITATION */}
        {activeTab === "closing" && (
          <div className="space-y-6">
            {/* Parents Blessings */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Parents' Blessings Cards
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Warm blessings from bride's and groom's parents presented above the guestbook
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("parents")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {(formData.parents || []).map((parent, pIdx) => (
                  <div
                    key={pIdx}
                    className="rounded-2xl border border-[#E3D2B4] bg-[#F8F1E7]/70 p-5 space-y-3"
                  >
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                        Card Header Title
                      </label>
                      <input
                        type="text"
                        value={parent.title || ""}
                        onChange={(e) => {
                          const updated = [...(formData.parents || [])];
                          updated[pIdx].title = e.target.value;
                          setDirectSection("parents", updated);
                        }}
                        className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                        Parents' Names
                      </label>
                      <input
                        type="text"
                        value={parent.names || ""}
                        onChange={(e) => {
                          const updated = [...(formData.parents || [])];
                          updated[pIdx].names = e.target.value;
                          setDirectSection("parents", updated);
                        }}
                        className="mt-1 h-10 w-full rounded-xl border border-[#D9C4A0] bg-white px-3 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                        Blessing Message
                      </label>
                      <textarea
                        rows={3}
                        value={parent.message || ""}
                        onChange={(e) => {
                          const updated = [...(formData.parents || [])];
                          updated[pIdx].message = e.target.value;
                          setDirectSection("parents", updated);
                        }}
                        className="mt-1 w-full rounded-xl border border-[#D9C4A0] bg-white p-3 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Invitation Backdrop */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                  Final Formal Invitation Background
                </h3>
                <button
                  type="button"
                  onClick={() => handleResetSection("finalInvitation")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <ImageUploadInput
                label="Invitation Backdrop Photo"
                value={formData.finalInvitation?.backgroundImage || ""}
                onChange={(url) => updateSection("finalInvitation", { backgroundImage: url })}
                helper="Warm architectural palace image displayed behind the closing invitation card"
                aspect="aspect-video"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["parents", "finalInvitation"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Blessings & Final Invite"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 10: THEME COLORS & AUDIO */}
        {activeTab === "design" && (
          <div className="space-y-6">
            {/* Color Palette */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Theme Color System & Typography
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize the royal primary burgundy, metallic gold accent, and cream background
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("design")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {/* Primary Color */}
                <div className="rounded-2xl border border-[#E3D2B4] bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                      Primary Color
                    </label>
                    <div
                      className="size-6 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: formData.design?.primary || "#7D1F35" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.design?.primary || "#7D1F35"}
                      onChange={(e) => updateSection("design", { primary: e.target.value })}
                      className="size-9 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.design?.primary || "#7D1F35"}
                      onChange={(e) => updateSection("design", { primary: e.target.value })}
                      className="h-9 flex-1 rounded-lg border border-[#D9C4A0] px-2.5 text-xs font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Used for headings, main buttons, and brand titles</p>
                </div>

                {/* Accent Color */}
                <div className="rounded-2xl border border-[#E3D2B4] bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                      Accent Gold
                    </label>
                    <div
                      className="size-6 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: formData.design?.accent || "#C7A064" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.design?.accent || "#C7A064"}
                      onChange={(e) => updateSection("design", { accent: e.target.value })}
                      className="size-9 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.design?.accent || "#C7A064"}
                      onChange={(e) => updateSection("design", { accent: e.target.value })}
                      className="h-9 flex-1 rounded-lg border border-[#D9C4A0] px-2.5 text-xs font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Used for decorative borders, ornaments, and sub-headings</p>
                </div>

                {/* Background Color */}
                <div className="rounded-2xl border border-[#E3D2B4] bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                      Background Cream
                    </label>
                    <div
                      className="size-6 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: formData.design?.background || "#F8F1E7" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.design?.background || "#F8F1E7"}
                      onChange={(e) => updateSection("design", { background: e.target.value })}
                      className="size-9 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.design?.background || "#F8F1E7"}
                      onChange={(e) => updateSection("design", { background: e.target.value })}
                      className="h-9 flex-1 rounded-lg border border-[#D9C4A0] px-2.5 text-xs font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Base background color across the entire wedding invitation</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Heading Serif Font Family
                  </label>
                  <select
                    value={formData.design?.headingFont || "Cormorant Garamond"}
                    onChange={(e) => updateSection("design", { headingFont: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  >
                    <option value="Cormorant Garamond">Cormorant Garamond (Default Luxury)</option>
                    <option value="Cinzel">Cinzel (Classical Royal)</option>
                    <option value="Playfair Display">Playfair Display (High Editorial)</option>
                    <option value="Noto Serif">Noto Serif</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2.5 text-sm font-medium text-[#7D1F35] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.design?.animations !== false}
                      onChange={(e) => updateSection("design", { animations: e.target.checked })}
                      className="size-4 rounded border-[#D9C4A0] text-[#7D1F35]"
                    />
                    <span>Enable Smooth Scroll & Entrance Animations</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Background Audio */}
            <div className="rounded-3xl border border-[#E3D2B4] bg-[#FFF9F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E3D2B4] pb-3">
                <div className="flex items-center gap-2">
                  <Music className="size-5 text-[#A98245]" />
                  <h3 className="font-serif text-xl font-bold text-[#7D1F35]">
                    Background Music / Shehnai Track
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSection("music")}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-600"
                >
                  <RotateCcw className="size-3" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2.5 text-sm font-medium text-[#7D1F35] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.music?.enabled}
                    onChange={(e) => updateSection("music", { enabled: e.target.checked })}
                    className="size-4 rounded border-[#D9C4A0] text-[#7D1F35]"
                  />
                  <span>Enable Floating Audio Player on Public Site</span>
                </label>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
                    Song Title Label
                  </label>
                  <input
                    type="text"
                    value={formData.music?.title || ""}
                    onChange={(e) => updateSection("music", { title: e.target.value })}
                    placeholder="e.g. Mangalyam / Din Shagna Da"
                    className="mt-1 h-11 w-full rounded-xl border border-[#D9C4A0] bg-white px-3.5 text-sm"
                  />
                </div>

                <ImageUploadInput
                  label="Audio File (MP3 / WAV) or URL"
                  value={formData.music?.url || ""}
                  onChange={(url) => updateSection("music", { url })}
                  helper="Upload an MP3 music track or paste a direct audio stream URL"
                  accept="audio/*"
                  isAudio={true}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSaveTab(["design", "music"])}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7D1F35] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] disabled:opacity-60 sm:w-auto"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving..." : "Save Theme & Audio"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
