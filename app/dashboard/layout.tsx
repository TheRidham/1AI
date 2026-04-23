"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sparkles,
  MessageSquare,
  Users,
  LayoutDashboard,
  LogOut,
  FolderKanban,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "Ask AI" },
  { href: "/dashboard/experts", icon: Users, label: "Find Experts" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const initials = (user.displayName || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 flex flex-col p-4 shrink-0 bg-background/80 backdrop-blur-xl">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-2 py-3 mb-6 group"
        >
          <div className="size-7 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold tracking-tight">1AIBase</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                    active
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
                  {label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="border-t border-border/50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate max-w-25">
                {user.displayName || "User"}
              </p>
              <p className="text-muted-foreground text-xs truncate max-w-25">
                {user.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => logOut().then(() => router.push("/login"))}
            className="text-muted-foreground hover:text-foreground size-8 shrink-0"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="relative">{children}</div>
      </main>
    </div>
  );
}