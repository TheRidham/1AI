"use client";

import { useEffect, use, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ChatPageInner } from "../page";
import { useChatHistory } from "@/context/ChatHistoryContext";

export default function ChatPageDynamic({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { loadChat, allChats } = useChatHistory();
  const { user } = useAuth();
  const router = useRouter();
  const { chatId } = use(params);
  const loadedChatIdRef = useRef<string | null>(null);

  useEffect(() => {
    loadedChatIdRef.current = null;
  }, [chatId]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (loadedChatIdRef.current === chatId) return;

    const chatExists = allChats.some((chat) => chat.id === chatId);
    if (!chatExists) return;

    loadedChatIdRef.current = chatId;

    // Load the specific chat when this route is accessed
    loadChat(chatId);
  }, [chatId, user, loadChat, router, allChats]);

  return <ChatPageInner />;
}
