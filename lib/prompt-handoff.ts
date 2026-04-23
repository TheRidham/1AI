export const PENDING_PROMPT_STORAGE_KEY = "1ai.pendingPrompt";

export function savePendingPrompt(prompt: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_PROMPT_STORAGE_KEY, prompt);
}

export function readPendingPrompt() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_PROMPT_STORAGE_KEY);
}

export function clearPendingPrompt() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_PROMPT_STORAGE_KEY);
}