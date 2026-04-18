const quotes = [
  {
    q: "We went from 14 untracked AI subscriptions to one governed inventory in a week. Procurement finally sleeps.",
    n: "Anna Lindqvist",
    r: "VP Engineering, Northwind",
  },
  {
    q: "The talent + tools match changed how we scope AI projects. We ship in weeks, not quarters.",
    n: "Rahul Mehta",
    r: "Head of AI, Lumen Labs",
  },
  {
    q: "Renewal alerts alone paid for the platform 3x over in the first quarter.",
    n: "Daniel Okafor",
    r: "CFO, Helix",
  },
];

const Testimonials = () => (
  <section id="docs" className="relative py-32">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-4">
        {quotes.map((t, i) => (
          <figure
            key={i}
            className="border-gradient rounded-2xl bg-gradient-card p-7 shadow-card flex flex-col gap-6"
          >
            <blockquote className="font-display text-lg leading-relaxed text-foreground/90">
              "{t.q}"
            </blockquote>
            <figcaption className="flex items-center gap-3 mt-auto">
              <div className="size-10 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">
                {t.n.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
