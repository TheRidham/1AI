import { useEffect, useState } from "react";
import { ArrowRight, Mic, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  "Our support team is drowning in 12,000 tickets a month across 4 languages — how do we handle this without hiring 20 more agents?",
  "We need to review 500-page legal contracts in 2 days instead of 2 weeks for our M&A pipeline.",
  "Our designers spend 60% of their time on repetitive asset variations for 14 markets — fix this.",
  "We're losing $200K/month to churn — predict at-risk accounts and trigger the right intervention.",
  "Onboarding new engineers takes 6 weeks because our codebase has zero documentation — solve it.",
];

const chips = [
  "Cut support handling time by 70%",
  "Automate contract review at scale",
  "Build a RAG pipeline on our docs",
  "Predict and prevent customer churn",
];

// Real, popular brand logos via SimpleIcons CDN — tinted to design tokens
const clients = [
  { name: "Stripe", slug: "stripe" },
  { name: "Notion", slug: "notion" },
  { name: "Figma", slug: "figma" },
  { name: "Shopify", slug: "shopify" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Spotify", slug: "spotify" },
  { name: "Atlassian", slug: "atlassian" },
];

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const target = examples[idx];
    let i = 0;
    setTyped("");
    const typing = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(typing);
    }, 22);
    const next = setTimeout(() => setIdx((p) => (p + 1) % examples.length), 6000);
    return () => {
      clearInterval(typing);
      clearTimeout(next);
    };
  }, [idx]);

  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-40 right-10 size-72 rounded-full bg-accent/20 blur-[100px] animate-float pointer-events-none" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <a
            href="#"
            className="animate-fade-in inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="size-3.5 text-primary" />
            Bring any business problem. Get an AI-powered solution.
            <ArrowUpRight className="size-3.5" />
          </a>

          <h1 className="animate-fade-up font-display text-5xl md:text-7xl font-semibold tracking-tight mt-6 leading-[1.05]">
            <span className="text-gradient">Describe the problem.</span>
            <br />
            <span className="text-iridescent">We'll architect the AI solution.</span>
          </h1>

          <p className="animate-fade-up [animation-delay:120ms] mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tell 1AIBase a real business problem. Get the exact combination of AI tools, models and
            specialists that can solve it — and govern adoption, compliance and cost in one place.
          </p>

          {/* AI Prompt Box */}
          <div className="animate-fade-up [animation-delay:240ms] mt-10 relative">
            <div className="border-gradient rounded-2xl glass shadow-card overflow-hidden">
              <div className="flex items-start gap-3 p-4">
                <Sparkles className="size-5 text-primary shrink-0 ml-2 mt-1.5" />
                <div className="flex-1 text-left min-h-[3.5rem] py-1 flex items-start text-foreground/90 text-base md:text-lg">
                  <span className="leading-relaxed">
                    {typed}
                    <span className="inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle animate-pulse" />
                  </span>
                </div>
                <button className="size-10 rounded-full hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors shrink-0">
                  <Mic className="size-5" />
                </button>
                <Button className="bg-gradient-primary hover:opacity-90 rounded-xl h-10 px-4 text-primary-foreground font-medium shrink-0">
                  Solve
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {chips.map((c) => (
                <button
                  key={c}
                  className="text-xs md:text-sm glass rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:360ms] mt-16">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
              Trusted by product, design & AI teams at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-80">
              {clients.map((c) => (
                <img
                  key={c.slug}
                  src={`https://cdn.simpleicons.org/${c.slug}/ffffff`}
                  alt={`${c.name} logo`}
                  loading="lazy"
                  className="h-6 md:h-7 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
