"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sparkles,
  MessageSquare,
  Users,
  LayoutDashboard,
  LogOut,
  FolderKanban,
  Plus,
  Trash2,
} from "lucide-react";
import { ChatHistoryProvider, useChatHistory } from "@/context/ChatHistoryContext";
import { ChatSession } from "@/lib/chatHistory";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "Ask AI" },
  { href: "/dashboard/experts", icon: Users, label: "Find Experts" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
];

function ChatHistorySection() {
  const { currentChatId, allChats, loadChat, deleteChat } = useChatHistory();
  const router = useRouter();

  const handleNewChat = () => {
    router.push("/dashboard/chat");
  };

  const handleLoadChat = (chatId: string) => {
    loadChat(chatId);
    router.push(`/dashboard/chat/${chatId}`);
  };

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    await deleteChat(chatId);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 mt-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs font-semibold text-muted-foreground tracking-wider">
          Recent Chats
        </h3>
        <Button
          onClick={handleNewChat}
          variant="ghost"
          size="icon"
          className="size-6 shrink-0 text-muted-foreground hover:text-foreground"
          title="New chat"
        >
          <Plus className="size-3.5" />
        </Button>
      </div>
      <div className="space-y-1 flex-1 overflow-y-auto">
        {allChats.length === 0 ? (
          <p className="text-xs text-muted-foreground px-3 py-2">No chats yet</p>
        ) : (
          allChats.map((chat: ChatSession) => (
            <div
              key={chat.id}
              className={`group flex items-start gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                chat.id === currentChatId
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-secondary/40"
              }`}
              onClick={() => handleLoadChat(chat.id)}
            >
              <MessageSquare className="size-3 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground truncate">
                  {chat.title}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  {new Date(chat.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => handleDeleteChat(e, chat.id)}
                className="size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                title="Delete chat"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatHistoryProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </ChatHistoryProvider>
  );
}

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const initials = (user.displayName || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-80 border-r border-border/50 flex flex-col p-4 shrink-0 bg-background/80 backdrop-blur-xl">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-2 py-3 mb-2 group"
        >
          <div className="size-7 rounded-md bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold tracking-tight">1AIBase</span>
        </Link>

        {/* Nav */}
        <nav className="space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                    active
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
                  {label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Chat History */}
        <div className="flex-1 min-h-0 flex flex-col">
          <ChatHistorySection />
        </div>

        {/* User Footer */}
        <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate max-w-25">
                {user.displayName || "User"}
              </p>
              <p className="text-muted-foreground text-xs truncate max-w-25">
                {user.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => logOut().then(() => router.push("/login"))}
            className="text-muted-foreground hover:text-foreground size-8 shrink-0"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="relative">{children}</div>
      </main>
    </div>
  );
}