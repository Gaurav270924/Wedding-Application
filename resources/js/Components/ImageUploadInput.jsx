import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, Link2 } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploadInput({
  label,
  value = "",
  onChange,
  helper = "",
  accept = "image/*",
  aspect = "aspect-[16/10]",
  stacked = false,
  isAudio = false,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File exceeds 20MB limit.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/admin/upload", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": getCsrfToken(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const res = await response.json();
      if (res.success && res.url) {
        onChange(res.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(res.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Stacked layout (ideal for cards, gallery, ceremonies, story)
  if (stacked || aspect.includes("4/5") || aspect.includes("square") || aspect.includes("3/4")) {
    return (
      <div className="space-y-2.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
            {label}
          </label>
        )}

        {/* Thumbnail Preview Area */}
        {!isAudio && (
          <div
            className={`relative ${aspect} w-full overflow-hidden rounded-2xl border border-[#D9C4A0] bg-[#F8F1E7] shadow-xs`}
          >
            {value ? (
              <img
                src={value}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-muted-foreground">
                <ImageIcon className="size-8 text-[#C7A064]" />
                <span className="pt-1.5 text-xs">No image selected</span>
              </div>
            )}

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black/90"
                title="Remove image"
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7D1F35] px-4 text-xs font-semibold text-[#FFF9F0] shadow-xs transition hover:bg-[#4B1425] disabled:opacity-60"
          >
            {isUploading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud className="size-3.5" />
                <span>{value ? "Upload New Photo" : "Upload Photo"}</span>
              </>
            )}
          </button>

          {/* URL Input */}
          <div className="relative">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste image URL (https://...)"
              className="h-9 w-full rounded-xl border border-[#D9C4A0] bg-white pl-8 pr-3 text-xs text-[#3E332E] placeholder:text-[#A19588] focus:border-[#7D1F35] focus:outline-none focus:ring-1 focus:ring-[#7D1F35]"
            />
          </div>
        </div>

        {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
      </div>
    );
  }

  // Standard horizontal layout (for wide banners like Hero, Countdown, Venue)
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D1F35]">
          {label}
        </label>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Preview Thumbnail */}
        {!isAudio && (
          <div
            className={`relative ${aspect} w-full shrink-0 overflow-hidden rounded-2xl border border-[#D9C4A0] bg-[#F8F1E7] md:w-48`}
          >
            {value ? (
              <img
                src={value}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center text-muted-foreground">
                <ImageIcon className="size-7 text-[#C7A064]" />
                <span className="pt-1 text-[11px]">No image selected</span>
              </div>
            )}

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-black/90"
                title="Remove image"
              >
                <Trash2 className="size-3" />
              </button>
            )}
          </div>
        )}

        {/* Input & Upload Button */}
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#7D1F35] px-4 py-2 text-xs font-semibold text-[#FFF9F0] shadow-2xs transition hover:bg-[#4B1425] disabled:opacity-60"
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="size-3.5" />
                  <span>{value ? "Upload Different Image" : "Upload Image"}</span>
                </>
              )}
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-100"
              >
                <Trash2 className="size-3" />
                <span>Remove</span>
              </button>
            )}
          </div>

          <div className="relative">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste external image URL (https://...)"
              className="h-10 w-full rounded-xl border border-[#D9C4A0] bg-white pl-8 pr-3 text-xs text-[#3E332E] placeholder:text-[#A19588] focus:border-[#7D1F35] focus:outline-none focus:ring-1 focus:ring-[#7D1F35]"
            />
          </div>

          {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
        </div>
      </div>
    </div>
  );
}
