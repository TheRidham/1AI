"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Mic, ArrowRight } from "lucide-react";
import { savePendingPrompt } from "@/lib/prompt-handoff";

interface HeroPromptBoxProps {
  defaultPrompt: string;
  suggestions: string[];
}

export function HeroPromptBox({
  defaultPrompt,
  suggestions,
}: HeroPromptBoxProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [prompt, setPrompt] = useState(defaultPrompt);

  const handleSolve = () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || loading) return;

    savePendingPrompt(trimmedPrompt);
    const target = "/dashboard/chat";

    if (user) {
      router.push(target);
      return;
    }

    router.push(`/login?next=${encodeURIComponent(target)}`);
  };

  return (
    <div className="animate-fade-up [animation-delay:240ms] mt-10 relative">
      <div className="border-gradient rounded-2xl bg-card shadow-card overflow-hidden p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="size-5 text-primary shrink-0 mt-3" />
          <div className="flex-1 min-w-0">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSolve();
                }
              }}
              rows={3}
              className="min-h-16 resize-none border-0 bg-transparent p-0 text-base md:text-lg text-foreground placeholder:text-muted-foreground focus-visible:ring-0 shadow-none leading-relaxed"
              placeholder="Describe your business problem..."
              aria-label="Problem prompt"
            />
          </div>
          <button
            type="button"
            className="size-10 rounded-full hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-1"
            aria-label="Use voice input"
          >
            <Mic className="size-5" />
          </button>
          <Button
            type="button"
            onClick={handleSolve}
            disabled={loading || !prompt.trim()}
            className="bg-gradient-primary hover:opacity-90 rounded-xl h-10 px-4 text-primary-foreground font-medium shrink-0"
          >
            Solve <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {suggestions.map((btnText, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPrompt(btnText)}
            className="text-xs md:text-sm glass rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {btnText}
          </button>
        ))}
      </div>
    </div>
  );
}
