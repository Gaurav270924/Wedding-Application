import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "sonner";
import { MADHAV_KRIPA_LOGO } from "@/Utils/wedding-content.js";

export default function Login({ errors = {} }) {
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post("/admin/login", {
      onFinish: () => reset("password"),
      onError: () => toast.error("Invalid email or password. Please try again."),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F1E7] px-4 py-12 text-[#3E332E]">
      <Toaster richColors position="top-center" />

      <div className="w-full max-w-md">


        {/* Card */}
        <div className="rounded-3xl border border-[#C7A064]/60 bg-[#FFF9F0] p-8 shadow-xl sm:p-10">
          <div className="text-center">
            <img
              src={MADHAV_KRIPA_LOGO}
              alt="Madhav Kripa"
              className="mx-auto h-20 w-auto"
            />
            <h1 className="pt-3 font-serif text-3xl font-semibold tracking-wide text-[#7D1F35]">
              K&A Forever
            </h1>
            <p className="pt-1 text-xs font-medium uppercase tracking-[0.25em] text-[#A98245]">
              Wedding Administration Portal
            </p>
            <p className="pt-3 text-xs text-muted-foreground">
              Sign in to manage guest RSVPs, attendee headcounts, and blessing moderation.
            </p>
          </div>

          {/* Demo Hint Banner */}


          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-foreground/90">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A98245]" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="admin@wedding.com"
                  className="h-11 w-full rounded-xl border border-[#D9C4A0] bg-white/80 pl-10 pr-4 text-sm text-[#3E332E] focus:border-[#7D1F35] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/30"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium text-foreground/90">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A98245]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="••••••••••••"
                  className="h-11 w-full rounded-xl border border-[#D9C4A0] bg-white/80 pl-10 pr-10 text-sm text-[#3E332E] focus:border-[#7D1F35] focus:outline-none focus:ring-2 focus:ring-[#7D1F35]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-foreground/80">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                  className="rounded border-[#D9C4A0] text-[#7D1F35] focus:ring-[#7D1F35]/30"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="mt-2 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-[#7D1F35] text-sm font-medium tracking-wider text-[#FFF9F0] shadow-md transition hover:bg-[#4B1425] focus:outline-none focus:ring-2 focus:ring-[#C7A064] disabled:opacity-70"
            >
              {processing ? "Signing In..." : "Sign In to Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
