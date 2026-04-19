"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, FolderKanban, ArrowRight, Zap } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user?.displayName?.split(" ")[0] || "there";

  return (
    <div className="p-8 lg:p-10">
      {/* Welcome */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Dashboard</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Hey, {name} 👋
        </h1>
        <p className="text-muted-foreground mt-1">What problem are you solving today?</p>
      </div>

      {/* Quick CTA */}
      <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-7 mb-8 flex items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="size-4 text-primary" />
            <span className="text-primary text-xs font-medium uppercase tracking-[0.1em]">AI-Powered</span>
          </div>
          <h2 className="font-display text-xl font-semibold tracking-tight mb-1">
            Describe your problem
          </h2>
          <p className="text-muted-foreground text-sm">
            Get an instant solution with tools, workflow, and expert matches.
          </p>
        </div>
        <Link href="/dashboard/chat" className="shrink-0">
          <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2 rounded-xl">
            Start Chat <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Problems Solved", value: "0" },
          { label: "Active Projects", value: "0" },
          { label: "Hired Experts", value: "0" },
        ].map(({ label, value }) => (
          <div key={label} className="border-gradient rounded-2xl bg-gradient-card shadow-card p-5">
            <p className="font-display text-3xl font-semibold tracking-tight">{value}</p>
            <p className="text-muted-foreground text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Nav Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            href: "/dashboard/chat",
            icon: MessageSquare,
            title: "Ask AI",
            desc: "Submit a new problem",
          },
          {
            href: "/dashboard/experts",
            icon: Users,
            title: "Find Experts",
            desc: "Browse freelancer profiles",
          },
          {
            href: "/dashboard/projects",
            icon: FolderKanban,
            title: "Projects",
            desc: "Manage your work",
          },
        ].map(({ href, icon: Icon, title, desc }) => (
          <Link key={href} href={href}>
            <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-5 hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer group">
              <div className="size-10 rounded-xl bg-primary/10 grid place-items-center mb-3">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm mb-1">{title}</h3>
              <p className="text-muted-foreground text-xs">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}