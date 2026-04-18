import { Boxes, Users, Check, Star, ArrowUpRight } from "lucide-react";

// Popular, well-known AI tools with real brand logos
const tools = [
  { name: "OpenAI GPT-4o", tag: "LLM • Reasoning & multimodal", score: "98", slug: "openai", color: "ffffff" },
  { name: "Anthropic Claude 3.5", tag: "LLM • Long-context analysis", score: "96", slug: "anthropic", color: "D97757" },
  { name: "LangChain", tag: "Orchestration framework", score: "93", slug: "langchain", color: "1C3C3C" },
  { name: "Pinecone", tag: "Vector database", score: "91", slug: "pinecone", color: "ffffff" },
  { name: "Hugging Face", tag: "Open models & fine-tuning", score: "89", slug: "huggingface", color: "FFD21E" },
  { name: "Zapier AI", tag: "Workflow automation", score: "86", slug: "zapier", color: "FF4F00" },
];

// Talent — domain-specific with photos
const talent = [
  {
    name: "Priya Raman",
    role: "Senior AI/ML Engineer",
    domain: "Engineering",
    rate: "$180/h",
    tags: ["RAG", "LangChain", "Evals"],
    photo: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Marco Devereaux",
    role: "Product Designer · AI UX",
    domain: "Design",
    rate: "$160/h",
    tags: ["Generative UI", "Figma", "Prototyping"],
    photo: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Sasha Klein",
    role: "AI Product Manager",
    domain: "Product",
    rate: "$170/h",
    tags: ["LLM Roadmap", "Discovery", "Eval design"],
    photo: "https://i.pravatar.cc/120?img=32",
  },
  {
    name: "Daniel Okafor",
    role: "AI Solutions Architect",
    domain: "Architecture",
    rate: "$220/h",
    tags: ["Agents", "AWS Bedrock", "Scale"],
    photo: "https://i.pravatar.cc/120?img=68",
  },
];

const TwoAnswers = () => {
  return (
    <section id="product" className="relative py-32">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">The two answers</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            Ask once. Get the stack and the people to build it.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every business problem returns two ranked, contextual answers — the right combination of
            AI tools to deploy and the right specialists to bring in.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Tools card */}
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
              {tools.map((t, i) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between glass rounded-xl px-4 py-3 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}</span>
                    <div className="size-8 rounded-lg bg-secondary/60 grid place-items-center shrink-0">
                      <img
                        src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                        alt={`${t.name} logo`}
                        loading="lazy"
                        className="size-5"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.tag}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary font-mono">{t.score}% fit</span>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3.5 text-primary" />
              Vendor-neutral. Ranked by fit, cost & compliance.
            </div>
          </div>

          {/* Talent card */}
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
              {talent.map((p) => (
                <div
                  key={p.name}
                  className="glass rounded-xl px-4 py-3 hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.photo}
                        alt={`${p.name} headshot`}
                        loading="lazy"
                        className="size-10 rounded-full object-cover ring-1 ring-border shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-sm truncate">{p.name}</div>
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-accent/15 text-accent shrink-0">
                            {p.domain}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{p.role}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-foreground">{p.rate}</div>
                      <div className="flex items-center gap-0.5 text-amber-400 justify-end">
                        <Star className="size-3 fill-current" />
                        <span className="text-xs">4.9</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-[52px]">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3.5 text-accent" />
              Pre-screened. Compliance-checked. NDA-ready.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoAnswers;
