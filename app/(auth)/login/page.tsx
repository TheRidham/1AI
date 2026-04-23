"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, signInWithGoogle, signInWithGithub } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, GitBranch, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { readPendingPrompt } from "@/lib/prompt-handoff";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nextPath = (() => {
    const next = searchParams.get("next");
    if (!next) return "/dashboard";

    try {
      const decoded = decodeURIComponent(next);
      return decoded.startsWith("/") ? decoded : "/dashboard";
    } catch {
      return "/dashboard";
    }
  })();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      router.push(readPendingPrompt() ? "/dashboard/chat" : nextPath);
    } catch {
      toast.error("failed", { description: "Check your credentials." });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      await signInWithGoogle();
      router.push(readPendingPrompt() ? "/dashboard/chat" : nextPath);
    } catch {
      toast.error("failed", { description: "Google sign-in failed" });
    }
  }

  async function handleGithub() {
    try {
      await signInWithGithub();
      router.push(readPendingPrompt() ? "/dashboard/chat" : nextPath);
    } catch {
      toast.error("failed", { description: "GitHub sign-in failed" });
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="absolute inset-0 grid-bg pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-140 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow pointer-events-none"></div>
      <div className="absolute -bottom-20 right-0 size-90 rounded-full bg-accent/20 blur-[110px] pointer-events-none"></div>

      <div className="container relative py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="glass rounded-full px-4 h-11 inline-flex items-center gap-2 hover:border-primary/40 transition-colors">
            <div className="size-7 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold tracking-tight">1AIBase</span>
          </Link>
          <Link href="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Need an account? <span className="text-primary">Sign up</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
          <section className="hidden lg:flex border-gradient rounded-3xl bg-gradient-card shadow-card p-10 flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Welcome back</p>
              <h1 className="font-display text-4xl font-semibold tracking-tight leading-tight text-gradient max-w-lg">
                Sign in and continue architecting your AI stack.
              </h1>
              <p className="mt-4 text-muted-foreground max-w-md">
                Pick up where you left off with your tool inventory, talent matches, and governance workflows.
              </p>
            </div>
            <ul className="space-y-3 text-sm mt-10">
              {[
                "Secure team authentication",
                "Compliance-aware onboarding",
                "Unified tools + talent workspace",
              ].map((item) => (
                <li key={item} className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-gradient rounded-3xl glass shadow-card p-6 sm:p-8 lg:p-9">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-sm text-muted-foreground mt-2 mb-6">Access your 1AIBase workspace</p>

            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              <Button onClick={handleGoogle} variant="outline" className="h-10 gap-2 bg-background/60 hover:bg-secondary/70">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button onClick={handleGithub} variant="outline" className="h-10 gap-2 bg-background/60 hover:bg-secondary/70">
                <GitBranch className="w-4 h-4" />
                GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="mt-1.5 bg-background/60"
                />
              </div>
              <div>
                <Label className="text-sm">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1.5 bg-background/60"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow">
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="size-4" />}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary" /> SSO and secure auth enabled</span>
              <Link href="/signup" className="hover:text-foreground transition-colors">Need an account?</Link>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account? <Link href="/signup" className="text-primary hover:opacity-80">Sign up</Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}