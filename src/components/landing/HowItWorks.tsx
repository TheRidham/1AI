import { Search, Sparkles, Settings2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    n: "01",
    title: "Ask",
    desc: "Describe the problem in plain language. Voice or text. No jargon required.",
  },
  {
    icon: Sparkles,
    n: "02",
    title: "Get matched",
    desc: "Receive ranked AI tools and vetted talent — scored by fit, cost and compliance.",
  },
  {
    icon: Settings2,
    n: "03",
    title: "Manage at scale",
    desc: "Onboard, govern and optimize every tool and contract from one operating layer.",
  },
];

const HowItWorks = () => (
  <section className="relative py-32">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">How it works</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
          Ask. Get matched. Manage at scale.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.n} className="relative">
              <div className="border-gradient rounded-2xl bg-gradient-card p-7 shadow-card hover:-translate-y-1 transition-transform">
                <div className="size-12 rounded-xl bg-background grid place-items-center border border-border relative z-10 mb-5 shadow-glow">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
                <h3 className="font-display text-xl font-semibold mt-1">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
