"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/types";
import { useAuth } from "./AuthContext";
import { usePathname } from "next/navigation";
import {
  ChatSession,
  deleteChatRemote,
  loadAllChatsLocal,
  loadAllChatsRemote,
  loadCurrentChatIdLocal,
  saveChatLocal,
  saveChatRemote,
  saveCurrentChatIdLocal,
} from "@/lib/chatHistory";

interface ChatHistoryContextValue {
  currentChatId: string | null;
  messages: ChatMessage[];
  allChats: ChatSession[];
  addMessage: (message: ChatMessage) => void;
  createNewChat: () => void;
  loadChat: (chatId: string) => void;
  deleteChat: (chatId: string) => Promise<void>;
  setCurrentChatIdOnly: (chatId: string) => void;
}

const ChatHistoryContext = createContext<ChatHistoryContextValue | undefined>(undefined);

function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    ...message,
    timestamp: message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp),
  }));
}

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [allChats, setAllChats] = useState<ChatSession[]>([]);
  const allChatsRef = useRef<ChatSession[]>([]);
  const lastSavedMessageCountRef = useRef<number>(0);
  const createdAtRef = useRef<string | null>(null);

  useEffect(() => {
    allChatsRef.current = allChats;
  }, [allChats]);

  useEffect(() => {
    let mounted = true;

    async function loadChats() {
      if (!user) return;

      const uid = user.uid;
      let chats = await loadAllChatsRemote(uid);

      if (!chats.length) {
        chats = loadAllChatsLocal(uid);
      }

      if (!mounted) return;
      setAllChats(chats);

      if (pathname === "/dashboard/chat") {
        setCurrentChatId(null);
        setMessages([]);
        return;
      }

      const savedChatId = loadCurrentChatIdLocal(uid);
      const activeChat = savedChatId ? chats.find((chat) => chat.id === savedChatId) : chats[0];

      if (activeChat) {
        setCurrentChatId(activeChat.id);
        setMessages(normalizeMessages(activeChat.messages));
        lastSavedMessageCountRef.current = activeChat.messages.length;
        createdAtRef.current = activeChat.createdAt;
        saveCurrentChatIdLocal(uid, activeChat.id);
      }
    }

    void loadChats();

    return () => {
      mounted = false;
    };
  }, [user, pathname]);

  useEffect(() => {
    if (!user || !currentChatId) return;

    // Only save when there are messages and the message count increased
    if (messages.length === 0) return;
    if (messages.length <= lastSavedMessageCountRef.current) return;

    const uid = user.uid;
    const now = new Date().toISOString();
    const title = messages.find((message) => message.role === "user")?.content.slice(0, 60) || "New Chat";

    // Use existing createdAt or set it for new chats
    const createdAt = createdAtRef.current || now;

    const chat: ChatSession = {
      id: currentChatId,
      title,
      createdAt,
      updatedAt: now,
      messages: normalizeMessages(messages),
    };

    saveChatLocal(uid, chat);
    void saveChatRemote(uid, chat).catch(() => {});

    setAllChats((prev) => {
      const next = [...prev];
      const index = next.findIndex((chatItem) => chatItem.id === currentChatId);

      if (index >= 0) {
        next[index] = chat;
        return next;
      }

      return [chat, ...next];
    });

    // remember the saved count
    lastSavedMessageCountRef.current = messages.length;
  }, [messages, currentChatId, user]);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const createNewChat = useCallback(() => {
    if (!user) return;

    const chatId = Date.now().toString();
    setCurrentChatId(chatId);
    setMessages([]);
    lastSavedMessageCountRef.current = 0;
    createdAtRef.current = null; // will be set on first save
    saveCurrentChatIdLocal(user.uid, chatId);
  }, [user]);

  const loadChat = useCallback(
    (chatId: string) => {
      const chat = allChatsRef.current.find((chatItem) => chatItem.id === chatId);
      if (!chat) return;

      setCurrentChatId(chat.id);
      setMessages(normalizeMessages(chat.messages));
      lastSavedMessageCountRef.current = chat.messages.length;
      createdAtRef.current = chat.createdAt;

      if (user) {
        saveCurrentChatIdLocal(user.uid, chat.id);
      }
    },
    [user]
  );

  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!user) return;

      const uid = user.uid;
      setAllChats((prev) => prev.filter((chat) => chat.id !== chatId));
      await deleteChatRemote(uid, chatId).catch(() => {});

      if (currentChatId === chatId) {
        const remaining = allChats.filter((chat) => chat.id !== chatId);
        const nextChat = remaining[0];

        setCurrentChatId(nextChat?.id ?? null);
        setMessages(nextChat ? normalizeMessages(nextChat.messages) : []);

        if (nextChat) {
          saveCurrentChatIdLocal(uid, nextChat.id);
        }
      }
    },
    [user, currentChatId, allChats]
  );

  const setCurrentChatIdOnly = useCallback(
    (chatId: string) => {
      if (!user) return;
      setCurrentChatId(chatId);
      saveCurrentChatIdLocal(user.uid, chatId);
    },
    [user]
  );

  return (
    <ChatHistoryContext.Provider value={{ currentChatId, messages, allChats, addMessage, createNewChat, loadChat, deleteChat, setCurrentChatIdOnly }}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const ctx = useContext(ChatHistoryContext);
  if (!ctx) throw new Error("useChatHistory must be used within ChatHistoryProvider");
  return ctx;
}