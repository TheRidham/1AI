import { NextRequest } from "next/server";
import { recommendExpertsForWorkflow } from "@/lib/experts";

// Use Node.js runtime to support Firestore (Edge runtime lacks browser APIs)
// export const runtime = "edge";

// Simple in-memory TTL cache. Stored on globalThis so it survives warm instances.
// type CacheEntry = { expiresAt: number; value: any };
// const CACHE: Map<string, CacheEntry> = (globalThis as any).__recommendExpertsCache || new Map();
// (globalThis as any).__recommendExpertsCache = CACHE;

function stableStringify(obj: any) {
  return JSON.stringify(obj, Object.keys(obj || {}).sort());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workflow, filters, options } = body || {};

    if (!workflow) {
      return new Response(JSON.stringify({ error: "workflow is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ttlSeconds = options?.ttlSeconds ?? 3600; // default 1 hour
    const cacheKey = stableStringify({ workflow: {
      intent: workflow.intent,
      domain: workflow.domain,
      requiredSkills: workflow.requiredSkills,
      tools: (workflow.tools || []).map((t: any) => t.name),
    }, filters });

    const now = Date.now();
    // const existing = CACHE.get(cacheKey);
    // if (existing && existing.expiresAt > now) {
    //   return new Response(JSON.stringify(existing.value), {
    //     status: 200,
    //     headers: { "Content-Type": "application/json", "X-Cache": "HIT" },
    //   });
    // }

    const results = await recommendExpertsForWorkflow(workflow, filters, options);

    // CACHE.set(cacheKey, { expiresAt: now + ttlSeconds * 1000, value: results });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json", "X-Cache": "MISS" },
    });
  } catch (err) {
    console.error("recommend-experts error:", err);
    return new Response(JSON.stringify({ error: "internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
