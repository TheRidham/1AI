import { db } from "./firebase";
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
import { ChatMessage } from "@/types";

const CHATS_KEY = (uid: string) => `chat_sessions_${uid}`;
const CURRENT_CHAT_KEY = (uid: string) => `current_chat_id_${uid}`;

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

function sanitizeValue(v: any): any {
  if (v === undefined) return undefined;
  if (v === null) return null;
  if (Array.isArray(v)) return v.map(sanitizeValue).filter((x) => x !== undefined);
  if (typeof v === "object") return sanitizeObject(v);
  return v;
}

function sanitizeObject(obj: any): any {
  if (obj === null) return null;
  const out: any = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    if (val === undefined) continue;
    if (val instanceof Date) {
      out[k] = val.toISOString();
      continue;
    }
    const s = sanitizeValue(val);
    if (s === undefined) continue;
    out[k] = s;
  }
  return out;
}

export async function saveChatRemote(userId: string, chat: ChatSession) {
  try {
    const payload = sanitizeObject({
      ...chat,
      messages: chat.messages.map((m) => ({
        ...m,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
      })),
    });
    await setDoc(doc(db, "users", userId, "chats", chat.id), payload, { merge: true });
  } catch (err) {
    console.error("saveChatRemote error:", err);
    throw err;
  }
}

export async function loadChatRemote(userId: string, chatId: string): Promise<ChatSession | null> {
  try {
    const snap = await getDoc(doc(db, "users", userId, "chats", chatId));
    if (!snap.exists()) return null;
    const data = snap.data() as any;
    return {
      ...data,
      messages: (data.messages || []).map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    };
  } catch (err) {
    console.error("loadChatRemote error:", err);
    return null;
  }
}

export async function loadAllChatsRemote(userId: string): Promise<ChatSession[]> {
  try {
    const snap = await getDocs(query(
      collection(db, "users", userId, "chats"),
      orderBy("updatedAt", "desc")
    ));
    return snap.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        ...data,
        messages: (data.messages || []).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      };
    });
  } catch (err) {
    console.error("loadAllChatsRemote error:", err);
    return [];
  }
}

export async function deleteChatRemote(userId: string, chatId: string) {
  try {
    await deleteDoc(doc(db, "users", userId, "chats", chatId));
  } catch (err) {
    console.error("deleteChatRemote error:", err);
    throw err;
  }
}

export function saveChatLocal(userId: string, chat: ChatSession) {
  try {
    const key = CHATS_KEY(userId);
    const raw = localStorage.getItem(key);
    const chats = raw ? (JSON.parse(raw) as ChatSession[]) : [];
    const idx = chats.findIndex((c) => c.id === chat.id);
    if (idx >= 0) {
      chats[idx] = chat;
    } else {
      chats.push(chat);
    }
    localStorage.setItem(key, JSON.stringify(chats.map((c) => ({
      ...c,
      messages: c.messages.map((m) => ({
        ...m,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
      })),
    }))));
  } catch (err) {
    console.error("saveChatLocal error:", err);
  }
}

export function loadAllChatsLocal(userId: string): ChatSession[] {
  try {
    const raw = localStorage.getItem(CHATS_KEY(userId));
    if (!raw) return [];
    const chats = JSON.parse(raw) as ChatSession[];
    return chats.map((c) => ({
      ...c,
      messages: c.messages.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    }));
  } catch (err) {
    console.error("loadAllChatsLocal error:", err);
    return [];
  }
}

export function loadChatLocal(userId: string, chatId: string): ChatSession | null {
  try {
    const raw = localStorage.getItem(CHATS_KEY(userId));
    if (!raw) return null;
    const chats = JSON.parse(raw) as ChatSession[];
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return null;
    return {
      ...chat,
      messages: chat.messages.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    };
  } catch (err) {
    console.error("loadChatLocal error:", err);
    return null;
  }
}

export function saveCurrentChatIdLocal(userId: string, chatId: string) {
  try {
    localStorage.setItem(CURRENT_CHAT_KEY(userId), chatId);
  } catch {}
}

export function loadCurrentChatIdLocal(userId: string): string | null {
  try {
    return localStorage.getItem(CURRENT_CHAT_KEY(userId));
  } catch {
    return null;
  }
}
