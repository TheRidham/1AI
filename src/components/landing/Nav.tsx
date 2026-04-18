import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = ["Product", "Solutions", "Pricing", "Docs"];

const Nav = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container flex items-center justify-between h-16 mt-4">
        <div className="glass rounded-full px-5 h-12 flex items-center gap-2">
          <div className="size-7 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold tracking-tight">1AIBase</span>
        </div>

        <nav className="hidden md:flex glass rounded-full h-12 px-2 items-center">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-4 h-9 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 h-10 items-center">
            Sign in
          </a>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full h-10 px-5 shadow-glow text-primary-foreground font-medium">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
