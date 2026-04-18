import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => (
  <section className="relative py-24">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card shadow-card p-12 md:p-20 text-center">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-primary/30 blur-[140px]" />

        <div className="relative">
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="text-iridescent">Make AI a solved problem</span>
            <br />
            <span className="text-gradient">for your organization.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Discovery, talent and governance — finally on one operating layer. Built for the
            organizations betting on AI.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button className="bg-gradient-primary hover:opacity-90 rounded-full h-12 px-7 shadow-glow text-primary-foreground font-medium text-base">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-7 bg-transparent border-border hover:bg-secondary text-base">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
