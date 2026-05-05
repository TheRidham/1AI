"use client";

import { useChatHistory } from "@/context/ChatHistoryContext";
import { ChatSession } from "@/lib/chatHistory";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

export function ChatHistorySidebar() {
  const { currentChatId, allChats, loadChat, deleteChat } = useChatHistory();
  const router = useRouter();

  const handleNewChat = () => {
    // Navigate to /dashboard/chat without a chatId (opens empty chat)
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="size-4" />
            Chats
          </h2>
          <Button
            onClick={handleNewChat}
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
            title="New chat"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {allChats.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">No chats yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Start a new conversation
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {allChats.map((chat: ChatSession) => (
              <div
                key={chat.id}
                className={`group flex items-start gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                  chat.id === currentChatId
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-secondary/40"
                }`}
                onClick={() => handleLoadChat(chat.id)}
              >
                <MessageSquare className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {chat.title}
                  </p>
                  <p className="text-xs text-muted-foreground/70 truncate">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="size-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  title="Delete chat"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
