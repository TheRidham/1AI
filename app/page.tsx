import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeroPromptBox } from "@/components/home/HeroPromptBox";
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Check,
  Boxes,
  Users,
  Star,
  LayoutGrid,
  ShieldCheck,
  CalendarClock,
  ChartColumn,
  PiggyBank,
  Search,
  Settings2,
  Layers,
  Scale,
  UserCheck,
  Lock,
  ChartLine,
  Building2,
} from "lucide-react";
import { auth } from "@/lib/firebase";
  import { HeaderAuthLink } from "@/components/home/HeaderAuthLink";

const DEFAULT_PROMPT =
  "Onboarding new engineers takes 6 weeks because our codebase has zero documentation — solve it.";

const PROMPT_SUGGESTIONS = [
  "Cut support handling time by 70%",
  "Automate contract review at scale",
  "Build a RAG pipeline on our docs",
  "Predict and prevent customer churn",
];

export default function Home() {

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="container flex items-center justify-between h-16 mt-4">
          <div className="glass rounded-full px-5 h-12 flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold tracking-tight">1AIBase</span>
          </div>
          <nav className="hidden md:flex glass rounded-full h-12 px-2 items-center">
            <a href="#product" className="px-4 h-9 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60">Product</a>
            <a href="#solutions" className="px-4 h-9 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60">Solutions</a>
            <a href="#pricing" className="px-4 h-9 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60">Pricing</a>
            <a href="#docs" className="px-4 h-9 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60">Docs</a>
          </nav>
          <div className="flex items-center gap-2">
            <HeaderAuthLink />
            <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full shadow-glow text-primary-foreground font-medium px-5 h-10">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 size-150 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute top-40 right-10 size-72 rounded-full bg-accent/20 blur-[100px] animate-float pointer-events-none"></div>
        
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <a href="#" className="animate-fade-in inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Sparkles className="size-3.5 text-primary" />
              Bring any business problem. Get an AI-powered solution.
              <ArrowUpRight className="size-3.5" />
            </a>
            <h1 className="animate-fade-up font-display text-5xl md:text-7xl font-semibold tracking-tight mt-6 leading-[1.05]">
              <span className="text-gradient">One search box, </span><br />
              <span className="text-iridescent">Every AI answer your team needs.</span>
            </h1>
            <p className="animate-fade-up [animation-delay:120ms] mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tell us a real business problem. Get the exact combination of AI tools, models and talent that can solve it, and govern adoption, compliance, seats, renewals and cost in one place.
            </p>
            
            <HeroPromptBox
              defaultPrompt={DEFAULT_PROMPT}
              suggestions={PROMPT_SUGGESTIONS}
            />

            <div className="animate-fade-up [animation-delay:360ms] mt-16">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">Trusted by product, design & AI teams at</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-80">
                {['stripe', 'notion', 'figma', 'shopify', 'airbnb', 'spotify', 'atlassian'].map((brand) => (
                  <img key={brand} src={`https://cdn.simpleicons.org/${brand}`} alt={`${brand} logo`} loading="lazy" className="h-6 md:h-7 w-auto opacity-65 hover:opacity-100 transition-opacity" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="relative py-32">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">The two answers</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">Ask once. Get the stack and the people to build it.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Every business problem returns two ranked, contextual answers — the right combination of AI tools to deploy and the right specialists to bring in.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Tools & Stack Card */}
            <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-8 group hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-primary/15 grid place-items-center">
                  <Boxes className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">AI Tools & Stack</h3>
                  <p className="text-sm text-muted-foreground">Models, platforms, agents, workflows</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { id: 1, name: "OpenAI GPT-4o", desc: "LLM • Reasoning & multimodal", icon: "openai", fit: "98%" },
                  { id: 2, name: "Anthropic Claude 3.5", desc: "LLM • Long-context analysis", icon: "anthropic/D97757", fit: "96%" },
                  { id: 3, name: "LangChain", desc: "Orchestration framework", icon: "langchain/1C3C3C", fit: "93%" },
                  { id: 4, name: "Pinecone", desc: "Vector database", icon: "pinecone/1652F0", fit: "91%" },
                  { id: 5, name: "Hugging Face", desc: "Open models & fine-tuning", icon: "huggingface/FFD21E", fit: "89%" },
                  { id: 6, name: "Zapier AI", desc: "Workflow automation", icon: "zapier/FF4F00", fit: "86%" },
                ].map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between glass rounded-xl px-4 py-3 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground w-5">{tool.id}</span>
                      <div className="size-8 rounded-lg bg-secondary/60 grid place-items-center shrink-0">
                        <img src={`https://cdn.simpleicons.org/${tool.icon}`} alt={`${tool.name} logo`} loading="lazy" className="size-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary font-mono">{tool.fit} fit</span>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5 text-primary" /> Vendor-neutral. Ranked by fit, cost & compliance.
              </div>
            </div>

            {/* AI Talent Card */}
            <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-8 group hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-accent/15 grid place-items-center">
                  <Users className="size-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">AI Talent</h3>
                  <p className="text-sm text-muted-foreground">Domain specialists — engineering, design, product, architecture</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: "Priya Raman", role: "Engineering", title: "Senior AI/ML Engineer", rate: "$180/h", rating: "4.9", img: "47", tags: ["RAG", "LangChain", "Evals"] },
                  { name: "Marco Devereaux", role: "Design", title: "Product Designer · AI UX", rate: "$160/h", rating: "4.9", img: "12", tags: ["Generative UI", "Figma", "Prototyping"] },
                  { name: "Sasha Klein", role: "Product", title: "AI Product Manager", rate: "$170/h", rating: "4.9", img: "32", tags: ["LLM Roadmap", "Discovery", "Eval design"] },
                  { name: "Daniel Okafor", role: "Architecture", title: "AI Solutions Architect", rate: "$220/h", rating: "4.9", img: "68", tags: ["Agents", "AWS Bedrock", "Scale"] },
                ].map((person, i) => (
                  <div key={i} className="glass rounded-xl px-4 py-3 hover:border-accent/30 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="size-10 ring-1 ring-border shrink-0">
                          <AvatarImage src={`https://i.pravatar.cc/120?img=${person.img}`} alt={person.name} />
                          <AvatarFallback>{person.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-sm truncate">{person.name}</div>
                            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-accent/15 text-accent shrink-0">{person.role}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{person.title}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono text-foreground">{person.rate}</div>
                        <div className="flex items-center gap-0.5 text-amber-400 justify-end">
                          <Star className="size-3 fill-current" />
                          <span className="text-xs">{person.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-13">
                      {person.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5 text-accent" /> Pre-screened. Compliance-checked. NDA-ready.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="relative py-32">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Beyond discovery</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">The management layer your AI stack has been missing.</h2>
            <p className="mt-4 text-lg text-muted-foreground">From the first onboarding to every renewal — govern tools, talent, access and cost in one operational backbone.</p>
          </div>
          
          <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-2">
            <div className="grid lg:grid-cols-[260px_1fr] gap-2">
              <div className="flex lg:flex-col gap-1 overflow-x-auto p-2">
                <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left bg-secondary text-foreground shadow-card">
                  <LayoutGrid className="size-4 text-primary" /> Inventory
                </button>
                <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  <ShieldCheck className="size-4" /> Compliance
                </button>
                <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  <Users className="size-4" /> Seats & Access
                </button>
                <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  <CalendarClock className="size-4" /> Renewals
                </button>
                <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  <ChartColumn className="size-4" /> Utilization
                </button>
                <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm whitespace-nowrap transition-all text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  <PiggyBank className="size-4" /> Cost savings
                </button>
              </div>
              
              <div className="rounded-xl bg-background/40 p-8 grid md:grid-cols-2 gap-8 items-center min-h-105">
                <div className="animate-fade-up">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">One source of truth for every AI tool & consultant.</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">Onboard tools and people in seconds. See ownership, status, contracts, integrations and risk in a single, searchable inventory.</p>
                  <button className="mt-6 text-sm text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight className="size-4 inline" /></button>
                </div>
                <div className="animate-fade-in">
                  <div className="space-y-2">
                    {[
                      { name: "OpenAI Enterprise", type: "LLM", status: "Active", statColor: "text-emerald-400", fit: "92%", icon: "openai" },
                      { name: "GitHub Copilot", type: "Dev tool", status: "Active", statColor: "text-emerald-400", fit: "84%", icon: "github" },
                      { name: "Notion AI", type: "Productivity", status: "Active", statColor: "text-emerald-400", fit: "71%", icon: "notion" },
                      { name: "Midjourney", type: "Image", status: "Active", statColor: "text-emerald-400", fit: "61%", icon: "midjourney" },
                      { name: "Perplexity", type: "Research", status: "Trial", statColor: "text-amber-400", fit: "34%", icon: "perplexity" }
                    ].map((app) => (
                      <div key={app.name} className="flex items-center justify-between glass rounded-lg px-3 py-2.5 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-md bg-secondary/60 grid place-items-center">
                            <img src={`https://cdn.simpleicons.org/${app.icon}`} alt={`${app.name} logo`} loading="lazy" className="size-3.5" />
                          </div>
                          <span className="font-medium">{app.name}</span>
                          <span className="text-muted-foreground">{app.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={app.statColor}>● {app.status}</span>
                          <span className="font-mono text-muted-foreground w-10 text-right">{app.fit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative py-32">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">How it works</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">Ask. Get matched. Manage at scale.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
            
            <div className="relative">
              <div className="border-gradient rounded-2xl bg-gradient-card p-7 shadow-card hover:-translate-y-1 transition-transform">
                <div className="size-12 rounded-xl bg-background grid place-items-center border border-border relative z-10 mb-5 shadow-glow">
                  <Search className="size-5 text-primary" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">01</div>
                <h3 className="font-display text-xl font-semibold mt-1">Ask</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Describe the problem in plain language. Voice or text. No jargon required.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="border-gradient rounded-2xl bg-gradient-card p-7 shadow-card hover:-translate-y-1 transition-transform">
                <div className="size-12 rounded-xl bg-background grid place-items-center border border-border relative z-10 mb-5 shadow-glow">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">02</div>
                <h3 className="font-display text-xl font-semibold mt-1">Get matched</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Receive ranked AI tools and vetted talent — scored by fit, cost and compliance.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="border-gradient rounded-2xl bg-gradient-card p-7 shadow-card hover:-translate-y-1 transition-transform">
                <div className="size-12 rounded-xl bg-background grid place-items-center border border-border relative z-10 mb-5 shadow-glow">
                  <Settings2 className="size-5 text-primary" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">03</div>
                <h3 className="font-display text-xl font-semibold mt-1">Manage at scale</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Onboard, govern and optimize every tool and contract from one operating layer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Features Matrix Section */}
      <section id="pricing" className="relative py-32">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Why One AI Base</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">The operating system for your organization's AI.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: Layers, title: "Horizontal", desc: "One layer across every AI tool, model and vendor." },
              { icon: Scale, title: "Vendor-neutral", desc: "Recommendations ranked by fit, not by who paid us." },
              { icon: UserCheck, title: "Tools + Talent", desc: "The only platform that matches both in one query." },
              { icon: Lock, title: "Governance built-in", desc: "Compliance, access and audit from day one." },
              { icon: ChartLine, title: "Cost intelligence", desc: "Continuous savings recommendations on autopilot." },
              { icon: Building2, title: "Enterprise-ready", desc: "SSO, SCIM, audit logs, regional data residency." }
            ].map((feature, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors group">
                <feature.icon className="size-5 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-lg font-semibold mt-4">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Built for tech & design orgs</p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-gradient max-w-2xl">One platform. Every stakeholder.</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
              {[
                { role: "CTO / Head of Engineering", quote: '"Standardize the AI stack without standing in the way of teams shipping fast."' },
                { role: "Head of Design", quote: '"Find the right creative AI tools and the right specialists, in one place."' },
                { role: "Head of AI / ML", quote: '"Compare models, frameworks and infra against your real workload, not benchmarks."' },
                { role: "Procurement & Finance", quote: '"End shadow AI. See every contract, seat and dollar — before renewal hits."' },
              ].map((stakeholder, i) => (
                <div key={i} className="border-gradient rounded-2xl bg-gradient-card p-6 shadow-card">
                  <div className="text-xs uppercase tracking-wider text-primary">{stakeholder.role}</div>
                  <p className="mt-3 text-base text-foreground/90 leading-relaxed">{stakeholder.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Docs/Testimonials Section */}
      <section id="docs" className="relative py-32">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: '"We went from 14 untracked AI subscriptions to one governed inventory in a week. Procurement finally sleeps."', name: "Anna Lindqvist", title: "VP Engineering, Northwind", initials: "AL" },
              { quote: '"The talent + tools match changed how we scope AI projects. We ship in weeks, not quarters."', name: "Rahul Mehta", title: "Head of AI, Lumen Labs", initials: "RM" },
              { quote: '"Renewal alerts alone paid for the platform 3x over in the first quarter."', name: "Daniel Okafor", title: "CFO, Helix", initials: "DO" }
            ].map((testimonial, i) => (
              <figure key={i} className="border-gradient rounded-2xl bg-gradient-card p-7 shadow-card flex flex-col gap-6">
                <blockquote className="font-display text-lg leading-relaxed text-foreground/90">{testimonial.quote}</blockquote>
                <figcaption className="flex items-center gap-3 mt-auto">
                  <div className="size-10 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">{testimonial.initials}</div>
                  <div>
                    <div className="text-sm font-medium">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card shadow-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 grid-bg opacity-50"></div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-125 rounded-full bg-primary/30 blur-[140px]"></div>
            <div className="relative">
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
                <span className="text-iridescent">Make AI a solved problem</span><br />
                <span className="text-gradient">for your organization.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">Discovery, talent and governance — finally on one operating layer. Built for the organizations betting on AI.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild className="bg-gradient-primary hover:opacity-90 rounded-full h-12 px-7 shadow-glow text-primary-foreground font-medium text-base w-full sm:w-auto">
                  <Link href="/signup">Get Started <ArrowRight className="size-4 ml-2" /></Link>
                </Button>
                <Button variant="outline" className="rounded-full h-12 px-7 text-base w-full sm:w-auto hover:bg-secondary">
                  Book a demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border mt-16">
        <div className="container py-16">
          <div className="grid md:grid-cols-[1.5fr_repeat(4,1fr)] gap-10">
            <div>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
                  <Sparkles className="size-4 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="font-display font-semibold tracking-tight">1AIBase</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">Bring any business problem. Get an AI-powered solution — tools, talent and governance in one place.</p>
              <div className="flex gap-2 mt-5">
                <a href="#" className="size-9 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition-colors">twitter</a>
                <a href="#" className="size-9 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition-colors">github</a>
                <a href="#" className="size-9 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition-colors">linkedin</a>
              </div>
            </div>
            
            {/* Footer Links */}
            {[
              { title: "Product", links: ["Discovery", "Talent", "Management", "Pricing", "Changelog"] },
              { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
              { title: "Resources", links: ["Docs", "Guides", "API", "Blog"] },
              { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] }
            ].map((section) => (
              <div key={section.title}>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">{section.title}</div>
                <ul className="space-y-2.5">
                  {section.links.map(link => (
                    <li key={link}><a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
            <span>© 2026 1AIBase. All rights reserved.</span>
            <span>Made for organizations betting on AI.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
