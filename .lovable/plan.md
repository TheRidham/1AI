
# One AI Base — Landing Page

A premium dark-mode marketing site positioning One AI Base as the **horizontal AI layer for every organization** — discovery + talent + governance in one platform.

## Visual Direction
- **Theme:** Deep dark background (near-black with subtle blue/violet undertone), high-contrast white type, electric accent (iridescent blue → violet gradient).
- **Style:** Linear / Vercel / Perplexity tier — generous whitespace, crisp typography (Inter/Geist-style), subtle grid + glow effects, glassmorphic cards, micro-interactions on hover.
- **Hero centerpiece:** A live-feeling **AI search/ask interface** — the product's core — with a mic icon, animated placeholder ("Find me the best AI tool to summarize legal contracts…"), and example chips below.
- Desktop-optimized, full-bleed sections with a max-width container.

## Page Sections

**1. Top Nav**
Logo "One AI Base" · Product · Solutions · Pricing · Docs · Sign in · **Get Started** (gradient CTA).

**2. Hero**
- Eyebrow: "The horizontal AI layer for modern organizations"
- H1: **"One search box. Every AI answer your team needs."**
- Subhead: One sentence on discovery + talent + governance.
- **Interactive AI prompt box** (front and center) with mic button and rotating example queries as chips ("Best AI for customer support automation", "Find me a LangChain consultant", "Cheapest vector DB for RAG").
- Trust strip: "Trusted by product & design teams at —" with placeholder logos.

**3. The Two Answers (split section)**
Side-by-side cards showing what the AI returns:
- **AI Tools & Stack** — recommended models, platforms, agents, workflows for the problem.
- **AI Talent** — matched freelancers / consultants with expertise tags.

**4. Beyond Discovery — The Management Layer**
Tabbed or staggered feature blocks (with mock UI screenshots):
- Onboarding & inventory of tools/consultants
- Compliance & security status
- Team access & seat management
- Renewals & contract calendar
- Utilization analytics
- Cost-saving recommendations

**5. How It Works** — 3 steps: *Ask → Get matched → Manage at scale.*

**6. Why One AI Base** — 4–6 value pillars (Horizontal, Vendor-neutral, Talent + Tools in one, Governance built-in, Cost intelligence, Enterprise-ready).

**7. Built for Tech & Design Orgs** — short persona blurbs (CTO, Head of Design, Head of AI, Procurement).

**8. Social Proof** — 2–3 testimonial quotes (placeholder).

**9. Final CTA** — Big gradient panel: "Make AI a solved problem for your organization." → Get Started / Book a demo.

**10. Footer** — Product, Company, Resources, Legal, socials.

## Interactions & Polish
- Subtle animated gradient orb / grid backdrop in hero
- Hover lifts on cards, gradient borders on key CTAs
- Smooth scroll, fade-in-on-scroll for sections
- Custom AI-themed iconography (lucide-react) — no emojis

## Tech
- Single-page React route (`/`), Tailwind design tokens defined in `index.css` (HSL dark palette + gradient tokens), reusable section components in `src/components/landing/`.
- No backend needed for the landing page — the AI prompt box is visual/demo only with rotating placeholder text.
