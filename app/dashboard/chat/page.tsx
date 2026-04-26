"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SolutionCard } from "@/components/chat/SolutionCard";
import { useAuth } from "@/context/AuthContext";
import { AIResponse, ChatMessage } from "@/types";
import { Send, BrainCircuit, Lightbulb, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { clearPendingPrompt, readPendingPrompt } from "@/lib/prompt-handoff";

const STREAM_PHASES = [
  { label: "Analyzing your problem", icon: "🔍" },
  { label: "Identifying the domain", icon: "🗂️" },
  { label: "Selecting the best tools", icon: "🛠️" },
  { label: "Designing the workflow", icon: "🔄" },
  { label: "Finalizing your solution", icon: "✨" },
];

const SUGGESTIONS = [
  "I want to build an e-commerce website with payment integration",
  "Help me create a real-time chat app with notifications",
  "I need to build an AI-powered resume screening tool",
  "I want to develop a mobile app for tracking daily habits",
];

function StreamingIndicator({ progress, phase }: { progress: number; phase: number }) {
  return (
    <div className="border-gradient rounded-2xl bg-gradient-card shadow-card p-5 max-w-2xl w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{STREAM_PHASES[phase]?.icon ?? "⚙️"}</span>
        <span className="text-foreground/70 text-sm font-medium">
          {STREAM_PHASES[phase]?.label ?? "Processing"}
          <span className="inline-flex gap-0.5 ml-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-primary inline-block animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        </span>
      </div>

      <div className="h-1.5 bg-border rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-300 ease-out shadow-glow"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-5 gap-1">
        {STREAM_PHASES.map((p, i) => (
          <div
            key={i}
            className={`text-center transition-all duration-300 ${i <= phase ? "opacity-100" : "opacity-20"}`}
          >
            <div
              className={`size-6 rounded-full flex items-center justify-center text-xs mx-auto mb-1 ${
                i < phase
                  ? "bg-gradient-primary text-primary-foreground"
                  : i === phase
                  ? "bg-primary/20 border border-primary text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i < phase ? "✓" : i + 1}
            </div>
            <p className="text-muted-foreground text-[9px] leading-tight hidden sm:block">
              {p.label.split(" ").slice(-1)[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function parseAIResponse(raw: string): AIResponse | undefined {
  try {
    const parsed = JSON.parse(raw) as AIResponse;

    if (parsed.kind === "solution" && parsed.solution) return parsed;
    if (parsed.kind === "answer" && parsed.answer) return parsed;

    return undefined;
  } catch {
    return undefined;
  }
}

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="text-sm leading-relaxed text-foreground/85">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          code: ({ children, className }) => {
            const isBlock = Boolean(className && className.includes("language-"));

            if (isBlock) {
              return <code className="block overflow-x-auto rounded-md bg-secondary px-3 py-2 text-xs">{children}</code>;
            }

            return <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">{children}</code>;
          },
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamPhase, setStreamPhase] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const autoSentRef = useRef(false);
  const startPhaseTimer = useCallback(() => {
    let phase = 0;
    setStreamPhase(0);
    setStreamProgress(5);
    const interval = setInterval(() => {
      phase = Math.min(phase + 1, STREAM_PHASES.length - 1);
      setStreamPhase(phase);
    }, 1800);
    return interval;
  }, []);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setStreaming(true);
      setStreamProgress(5);

      const phaseInterval = startPhaseTimer();
      abortRef.current = new AbortController();

      try {
        const history = messages.map((m) => ({ role: m.role, content: m.content }));
        const res = await fetch("/api/solve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok || !res.body) throw new Error("Stream failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          const openBraces = (accumulated.match(/{/g) || []).length;
          const closeBraces = (accumulated.match(/}/g) || []).length;
          const rawProgress =
            closeBraces > 0
              ? Math.min(90, (closeBraces / Math.max(openBraces, 1)) * 95)
              : Math.min(70, accumulated.length / 20);
          setStreamProgress(rawProgress);
        }

        setStreamProgress(100);
        clearInterval(phaseInterval);
        setStreamPhase(STREAM_PHASES.length - 1);
        await new Promise((r) => setTimeout(r, 400));

        const response = parseAIResponse(accumulated);

        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            response?.kind === "solution"
              ? "Here’s your AI-generated solution:"
              : response?.kind === "answer"
              ? response.answer
              : "I couldn’t understand the request clearly. Please try rephrasing.",
          kind: response?.kind,
          solution: response?.kind === "solution" ? response.solution : undefined,
          answer: response?.kind === "answer" ? response.answer : undefined,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          clearInterval(phaseInterval);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: "Something went wrong while generating your solution. Please try again.",
              timestamp: new Date(),
            },
          ]);
        }
      } finally {
        clearInterval(phaseInterval);
        setStreaming(false);
        setStreamProgress(0);
        setStreamPhase(0);
        abortRef.current = null;
      }
    },
    [streaming, messages, startPhaseTimer]
  );
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    const pendingPrompt = readPendingPrompt();
    if (!pendingPrompt || autoSentRef.current || !user) return;

    autoSentRef.current = true;
    setInput(pendingPrompt);
    clearPendingPrompt();
    void send(pendingPrompt);
  }, [user, send]);


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const userInitials = (user?.displayName || user?.email || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border/50 px-6 py-4 flex items-center justify-between shrink-0 bg-background/60 backdrop-blur-xl">
        <div>
          <h1 className="font-display font-semibold flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5">
            Powered by GPT-4o · Answers or workflows, depending on your prompt
          </p>
        </div>
        <Link href="/dashboard/experts">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-secondary"
          >
            <Users className="size-4" />
            Find Experts
          </Button>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Empty state */}
        {messages.length === 0 && !streaming && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="size-16 rounded-2xl bg-primary/10 grid place-items-center mb-5 shadow-glow">
              <BrainCircuit className="size-8 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold tracking-tight mb-2">
              What are you building?
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm leading-relaxed">
              Ask a question or describe a project. I’ll either answer directly or turn your
              problem into a workflow with tools and expert insights.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left p-3.5 rounded-xl border-gradient glass hover:border-primary/30 transition-colors text-muted-foreground hover:text-foreground text-xs"
                >
                  <Lightbulb className="size-3 text-primary mb-1.5" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <Avatar className="size-8 shrink-0">
              <AvatarFallback
                className={
                  msg.role === "user"
                    ? "bg-gradient-primary text-primary-foreground text-xs"
                    : "bg-secondary text-xs"
                }
              >
                {msg.role === "user" ? (
                  userInitials
                ) : (
                  <BrainCircuit className="size-4 text-primary" />
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={`max-w-2xl flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.role === "user" ? (
                <div className="bg-gradient-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm shadow-glow">
                  {msg.content}
                </div>
              ) : (
                <div className="w-full">
                  {msg.solution ? (
                    <>
                      <p className="text-muted-foreground text-sm mb-2">{msg.content}</p>
                      <SolutionCard solution={msg.solution} />
                    </>
                  ) : msg.answer ? (
                    <div className="glass border-gradient rounded-2xl px-4 py-3 text-sm text-foreground/80">
                      <AssistantMarkdown content={msg.answer} />
                    </div>
                  ) : (
                    <div className="glass border-gradient rounded-2xl px-4 py-3 text-sm text-foreground/70">
                      <AssistantMarkdown content={msg.content} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming indicator */}
        {streaming && (
          <div className="flex gap-3">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-secondary text-xs">
                <BrainCircuit className="size-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <StreamingIndicator progress={streamProgress} phase={streamPhase} />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/50 px-6 py-4 shrink-0 bg-background/60 backdrop-blur-xl">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            placeholder={
              streaming
                ? "Generating your solution..."
                : "Describe your problem or project idea..."
            }
            className="resize-none bg-background/60 border-border/50 focus:border-primary min-h-13 max-h-37.5 disabled:opacity-50 text-sm"
            rows={1}
          />
          {streaming ? (
            <Button
              onClick={() => abortRef.current?.abort()}
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0 h-auto px-4"
            >
              Stop
            </Button>
          ) : (
            <Button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shrink-0 h-auto px-4 shadow-glow"
            >
              <Send className="size-4" />
            </Button>
          )}
        </div>
        <p className="text-muted-foreground text-xs text-center mt-2">
          {streaming
            ? "Response is streaming live · Click Stop to cancel"
            : "Enter to send · Shift+Enter for new line"}
        </p>
      </div>
    </div>
  );
}