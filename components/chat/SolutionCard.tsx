"use client";

import { AISolution } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Wrench, GitBranch, Clock, Zap, DollarSign, CheckCircle2 } from "lucide-react";

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Advanced: "bg-destructive/15 text-destructive border-destructive/20",
};

const PHASE_COLORS: Record<string, string> = {
  Setup: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Build: "bg-primary/15 text-primary border-primary/20",
  Test: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Deploy: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export function SolutionCard({ solution }: { solution: AISolution }) {
  return (
    <div className="space-y-4 mt-2">
      {/* Header */}
      <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-primary mb-1">{solution.domain}</p>
            <h3 className="font-display font-semibold">{solution.intent}</h3>
          </div>
          <Badge className={`shrink-0 text-xs ${DIFFICULTY_COLORS[solution.difficulty]}`}>
            {solution.difficulty}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            {solution.estimatedTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-primary" />
            {solution.requiredSkills.slice(0, 3).join(", ")}
          </span>
        </div>
      </div>

      {/* Tools */}
      <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-5">
        <h4 className="font-semibold text-sm flex items-center gap-2 mb-4">
          <Wrench className="size-4 text-primary" />
          Recommended Tools
        </h4>
        <div className="space-y-3">
          {solution.tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-start gap-3 pb-3 border-b border-border/40 last:border-0 last:pb-0"
            >
              <div className="size-7 rounded-lg bg-primary/10 grid place-items-center shrink-0 mt-0.5">
                <span className="text-primary text-xs font-bold">{tool.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium">{tool.name}</span>
                  <Badge className="text-xs px-1.5 py-0 bg-secondary text-muted-foreground border-border/50">
                    {tool.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">{tool.useCase}</p>
              </div>
              <div className="shrink-0 flex items-center gap-1 text-muted-foreground text-xs">
                <DollarSign className="size-3" />
                {tool.pricing}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-5">
        <h4 className="font-semibold text-sm flex items-center gap-2 mb-4">
          <GitBranch className="size-4 text-primary" />
          Step-by-Step Workflow
        </h4>
        <div className="space-y-4">
          {solution.workflow.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <Badge className={`shrink-0 text-xs ${PHASE_COLORS[step.phase] || "bg-secondary text-muted-foreground"}`}>
                  {step.phase}
                </Badge>
                {i < solution.workflow.length - 1 && (
                  <div className="w-px flex-1 bg-border/40 mt-2" />
                )}
              </div>
              <div className="pb-4">
                <p className="font-medium text-sm mb-1">{step.title}</p>
                <p className="text-muted-foreground text-xs mb-2">{step.description}</p>
                <ul className="space-y-1">
                  {step.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="size-3 text-primary mt-0.5 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {solution.insights && (
        <div className="border-gradient rounded-2xl bg-primary/5 shadow-card p-4">
          <p className="text-xs font-medium text-primary mb-1">💡 Key Insight</p>
          <p className="text-foreground/70 text-sm leading-relaxed">{solution.insights}</p>
        </div>
      )}
    </div>
  );
}