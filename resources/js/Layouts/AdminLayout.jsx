import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
  LayoutDashboard,
  Users,
  Heart,
  CalendarCheck,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Palette,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { MADHAV_KRIPA_LOGO } from "@/Utils/wedding-content.js";
import { cn } from "@/Utils/utils.js";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Website Content & CMS", href: "/admin/content", icon: Palette },
  { label: "RSVPs & Guests", href: "/admin/rsvps", icon: Users },
  { label: "Blessings Wall", href: "/admin/wishes", icon: Heart },
  { label: "Events Schedule", href: "/admin/events", icon: CalendarCheck },
];

export default function AdminLayout({ title, subtitle, children }) {
  const { url, props } = usePage();
  const user = props.auth?.user;
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    router.post("/admin/logout", {}, {
      onSuccess: () => toast.success("Logged out successfully."),
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F8F1E7] text-[#3E332E]">
      <Toaster richColors position="top-right" />

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E3D2B4] bg-[#FFF9F0] lg:flex">
        {/* Brand */}
        <div className="flex h-20 items-center gap-3 border-b border-[#E3D2B4] px-6">
          <img src={MADHAV_KRIPA_LOGO} alt="Madhav Kripa" className="h-10 w-auto" />
          <div>
            <span className="font-serif text-lg font-semibold text-[#7D1F35]">
              K&A Forever
            </span>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#A98245]">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {NAV_ITEMS.map((item) => {
            const active = url.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-[#7D1F35] text-[#FFF9F0] shadow-xs"
                    : "text-foreground/80 hover:bg-[#F8F1E7] hover:text-[#7D1F35]"
                )}
              >
                <Icon className={cn("size-4", active ? "text-[#C7A064]" : "text-[#A98245]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* View Public Portal Link */}
        <div className="px-4 py-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#C7A064] bg-[#FFF9F0] px-4 py-2.5 text-xs font-medium text-[#7D1F35] shadow-2xs transition hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
          >
            <ExternalLink className="size-3.5" />
            <span>View Public Website</span>
          </a>
        </div>

        {/* Admin User Profile & Logout */}
        <div className="border-t border-[#E3D2B4] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7D1F35] font-serif text-sm font-semibold text-[#FFF9F0]">
                {user?.name?.[0] || "A"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-[#7D1F35]">
                  {user?.name || "Wedding Admin"}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {user?.email || "admin@wedding.com"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="cursor-pointer rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-[#FFF9F0] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-[#E3D2B4] px-6">
              <div className="flex items-center gap-2">
                <img src={MADHAV_KRIPA_LOGO} alt="Logo" className="h-8 w-auto" />
                <span className="font-serif font-semibold text-[#7D1F35]">K&A Forever</span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>

            <nav className="space-y-1.5 p-4">
              {NAV_ITEMS.map((item) => {
                const active = url.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                      active
                        ? "bg-[#7D1F35] text-[#FFF9F0]"
                        : "text-foreground/80 hover:bg-[#F8F1E7]"
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute inset-x-0 bottom-0 border-t border-[#E3D2B4] p-4">
              <button
                onClick={logout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 py-2.5 text-xs font-medium text-rose-700"
              >
                <LogOut className="size-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E3D2B4] bg-[#FFF9F0]/90 px-4 backdrop-blur-md sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-[#F8F1E7] lg:hidden"
            >
              <Menu className="size-6 text-[#7D1F35]" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate font-serif text-lg font-semibold text-[#7D1F35] sm:text-xl">
                {title || "Dashboard"}
              </h1>
              {subtitle && (
                <p className="hidden truncate text-[11px] text-muted-foreground sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-[#C7A064] bg-[#FFF9F0] px-4 py-1.5 text-xs font-medium text-[#7D1F35] transition hover:bg-[#7D1F35] hover:text-[#FFF9F0] sm:inline-flex"
            >
              <ExternalLink className="size-3.5" />
              <span>Public Site</span>
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#7D1F35]/10 px-3.5 py-1.5 text-xs font-medium text-[#7D1F35] transition hover:bg-[#7D1F35] hover:text-[#FFF9F0]"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
