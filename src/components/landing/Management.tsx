import { useState } from "react";
import {
  LayoutGrid,
  ShieldCheck,
  Users,
  CalendarClock,
  BarChart3,
  PiggyBank,
} from "lucide-react";

const tabs = [
  {
    id: "inventory",
    label: "Inventory",
    icon: LayoutGrid,
    title: "One source of truth for every AI tool & consultant.",
    desc: "Onboard tools and people in seconds. See ownership, status, contracts, integrations and risk in a single, searchable inventory.",
    mock: "inventory",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: ShieldCheck,
    title: "SOC 2, GDPR, DPA — tracked automatically.",
    desc: "Every vendor's posture, sub-processors, data residency and certifications, monitored and surfaced before procurement asks.",
    mock: "compliance",
  },
  {
    id: "access",
    label: "Seats & Access",
    icon: Users,
    title: "Know exactly who has access to what.",
    desc: "Sync seats from Okta, Google and SCIM. Reclaim unused licenses and enforce least-privilege across every AI tool.",
    mock: "access",
  },
  {
    id: "renewals",
    label: "Renewals",
    icon: CalendarClock,
    title: "Never get caught by an auto-renewal again.",
    desc: "A single calendar of contract end-dates, notice windows, owner alerts and negotiation prompts — 60 days ahead.",
    mock: "renewals",
  },
  {
    id: "utilization",
    label: "Utilization",
    icon: BarChart3,
    title: "Real usage, not vanity metrics.",
    desc: "Tie API calls, seats and outcomes to teams and projects. Spot dead tools and double-spend before finance does.",
    mock: "utilization",
  },
  {
    id: "savings",
    label: "Cost savings",
    icon: PiggyBank,
    title: "Recommendations that pay for the platform.",
    desc: "Cheaper model swaps, consolidated subscriptions, idle seat reclaim — surfaced as actionable ROI every month.",
    mock: "savings",
  },
];

const Mock = ({ kind }: { kind: string }) => {
  if (kind === "inventory") {
    const rows: Array<[string, string, string, string, string, string]> = [
      ["OpenAI Enterprise", "LLM", "Active", "92%", "openai", "ffffff"],
      ["GitHub Copilot", "Dev tool", "Active", "84%", "github", "ffffff"],
      ["Notion AI", "Productivity", "Active", "71%", "notion", "ffffff"],
      ["Midjourney", "Image", "Active", "61%", "midjourney", "ffffff"],
      ["Perplexity", "Research", "Trial", "34%", "perplexity", "ffffff"],
    ];
    return (
      <div className="space-y-2">
        {rows.map(([n, c, s, u, slug, color]) => (
          <div key={n} className="flex items-center justify-between glass rounded-lg px-3 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-md bg-secondary/60 grid place-items-center">
                <img src={`https://cdn.simpleicons.org/${slug}/${color}`} alt={`${n} logo`} loading="lazy" className="size-3.5" />
              </div>
              <span className="font-medium">{n}</span>
              <span className="text-muted-foreground">{c}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={s === "Trial" ? "text-amber-400" : "text-emerald-400"}>● {s}</span>
              <span className="font-mono text-muted-foreground w-10 text-right">{u}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "compliance") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {["SOC 2 Type II", "GDPR DPA", "ISO 27001", "HIPAA BAA", "EU AI Act", "Sub-processors"].map((n, i) => (
          <div key={n} className="glass rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className={`size-3.5 ${i < 4 ? "text-emerald-400" : "text-amber-400"}`} />
              {n}
            </div>
            <div className="text-xs font-mono mt-1">{i < 4 ? "Verified" : "Action needed"}</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "access") {
    return (
      <div className="space-y-2">
        {[["Engineering", 42, 38], ["Design", 18, 12], ["Product", 24, 22], ["Ops", 9, 3]].map(([t, total, used]) => (
          <div key={t as string} className="glass rounded-lg p-3">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium">{t}</span>
              <span className="font-mono text-muted-foreground">{used as number}/{total as number} active</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: `${((used as number) / (total as number)) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "renewals") {
    const rows: Array<[string, string, string, boolean, string, string]> = [
      ["OpenAI Enterprise", "in 12 days", "$48,000", true, "openai", "ffffff"],
      ["GitHub Copilot", "in 38 days", "$9,200", false, "github", "ffffff"],
      ["Notion AI", "in 67 days", "$14,800", false, "notion", "ffffff"],
      ["Figma", "in 94 days", "$22,400", false, "figma", "ffffff"],
    ];
    return (
      <div className="space-y-2">
        {rows.map(([n, d, p, urgent, slug, color]) => (
          <div key={n} className="flex items-center justify-between glass rounded-lg px-3 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <div className={`size-7 rounded-md bg-secondary/60 grid place-items-center ring-1 ${urgent ? "ring-amber-400/40" : "ring-border"}`}>
                <img src={`https://cdn.simpleicons.org/${slug}/${color}`} alt={`${n} logo`} loading="lazy" className="size-3.5" />
              </div>
              <div>
                <div className="font-medium">{n}</div>
                <div className={urgent ? "text-amber-400" : "text-muted-foreground"}>{d}</div>
              </div>
            </div>
            <span className="font-mono">{p}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "utilization") {
    return (
      <div className="glass rounded-lg p-4">
        <div className="flex justify-between items-end h-32 gap-1">
          {[40, 65, 48, 82, 71, 90, 55, 78, 88, 62, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-primary" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono">
          <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {[
        ["Switch GPT-4 → Claude Haiku for support", "$3,200/mo"],
        ["Reclaim 14 idle Midjourney seats", "$420/mo"],
        ["Consolidate 3 vector DBs → Pinecone", "$1,800/mo"],
      ].map(([rec, save]) => (
        <div key={rec as string} className="flex items-center justify-between glass rounded-lg px-3 py-2.5 text-xs">
          <span>{rec as string}</span>
          <span className="font-mono text-emerald-400">−{save as string}</span>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs bg-gradient-primary text-primary-foreground font-medium mt-3">
        <span>Total monthly savings identified</span>
        <span className="font-mono">$5,420</span>
      </div>
    </div>
  );
};

const Management = () => {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="solutions" className="relative py-32">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Beyond discovery</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            The management layer your AI stack has been missing.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From the first onboarding to every renewal — govern tools, talent, access and cost in
            one operational backbone.
          </p>
        </div>

        <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-2">
          <div className="grid lg:grid-cols-[260px_1fr] gap-2">
            {/* Tabs */}
            <div className="flex lg:flex-col gap-1 overflow-x-auto p-2">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left ${
                      isActive
                        ? "bg-secondary text-foreground shadow-card"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <Icon className={`size-4 ${isActive ? "text-primary" : ""}`} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="rounded-xl bg-background/40 p-8 grid md:grid-cols-2 gap-8 items-center min-h-[420px]">
              <div className="animate-fade-up" key={current.id + "-text"}>
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                  {current.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{current.desc}</p>
                <button className="mt-6 text-sm text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more →
                </button>
              </div>
              <div className="animate-fade-in" key={current.id + "-mock"}>
                <Mock kind={current.mock} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Management;
