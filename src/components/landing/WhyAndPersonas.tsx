import { Layers, Scale, UserCheck, Lock, LineChart, Building2 } from "lucide-react";

const pillars = [
  { icon: Layers, title: "Horizontal", desc: "One layer across every AI tool, model and vendor." },
  { icon: Scale, title: "Vendor-neutral", desc: "Recommendations ranked by fit, not by who paid us." },
  { icon: UserCheck, title: "Tools + Talent", desc: "The only platform that matches both in one query." },
  { icon: Lock, title: "Governance built-in", desc: "Compliance, access and audit from day one." },
  { icon: LineChart, title: "Cost intelligence", desc: "Continuous savings recommendations on autopilot." },
  { icon: Building2, title: "Enterprise-ready", desc: "SSO, SCIM, audit logs, regional data residency." },
];

const personas = [
  {
    role: "CTO / Head of Engineering",
    quote: "Standardize the AI stack without standing in the way of teams shipping fast.",
  },
  {
    role: "Head of Design",
    quote: "Find the right creative AI tools and the right specialists, in one place.",
  },
  {
    role: "Head of AI / ML",
    quote: "Compare models, frameworks and infra against your real workload, not benchmarks.",
  },
  {
    role: "Procurement & Finance",
    quote: "End shadow AI. See every contract, seat and dollar — before renewal hits.",
  },
];

const WhyAndPersonas = () => (
  <section id="pricing" className="relative py-32">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Why One AI Base</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
          The operating system for your organization's AI.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors group"
            >
              <Icon className="size-5 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold mt-4">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Built for tech & design orgs</p>
        <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-gradient max-w-2xl">
          One platform. Every stakeholder.
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {personas.map((p) => (
            <div key={p.role} className="border-gradient rounded-2xl bg-gradient-card p-6 shadow-card">
              <div className="text-xs uppercase tracking-wider text-primary">{p.role}</div>
              <p className="mt-3 text-base text-foreground/90 leading-relaxed">"{p.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyAndPersonas;
