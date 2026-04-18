import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

const cols = [
  { title: "Product", links: ["Discovery", "Talent", "Management", "Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
  { title: "Resources", links: ["Docs", "Guides", "API", "Blog"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
];

const Footer = () => (
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
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Bring any business problem. Get an AI-powered solution — tools, talent and governance in one place.
          </p>
          <div className="flex gap-2 mt-5">
            {[Twitter, Github, Linkedin].map((I, i) => (
              <a key={i} href="#" className="size-9 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition-colors">
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">{c.title}</div>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} 1AIBase. All rights reserved.</span>
        <span>Made for organizations betting on AI.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
