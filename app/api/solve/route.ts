import { NextRequest } from "next/server";
import OpenAI from "openai";

// ✅ Edge runtime gives the fastest streaming response
export const runtime = "edge";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an expert technical assistant. First determine whether the user's message is a problem statement that needs a solution workflow, or a direct question/request that should be answered normally.

If it is a problem statement, return JSON in this exact structure:
{
  "kind": "solution",
  "solution": {
    "domain": "e.g. Web Development / AI/ML / Mobile / DevOps",
    "intent": "One sentence summary of what the user wants to build",
    "difficulty": "Beginner | Intermediate | Advanced",
    "estimatedTime": "e.g. 2-4 weeks",
    "requiredSkills": ["skill1", "skill2"],
    "tools": [
      {
        "name": "Tool Name",
        "description": "What it is",
        "useCase": "Why use it for this problem",
        "pricing": "Free / $X/mo / Open Source",
        "category": "Frontend | Backend | Database | AI | DevOps | Design"
      }
    ],
    "workflow": [
      {
        "phase": "Setup",
        "title": "Phase title",
        "description": "What happens here",
        "tasks": ["Task 1", "Task 2"]
      },
      {
        "phase": "Build",
        "title": "Phase title",
        "description": "What happens here",
        "tasks": ["Task 1", "Task 2"]
      },
      {
        "phase": "Test",
        "title": "Phase title",
        "description": "What happens here",
        "tasks": ["Task 1"]
      },
      {
        "phase": "Deploy",
        "title": "Phase title",
        "description": "What happens here",
        "tasks": ["Task 1"]
      }
    ],
    "insights": "Key insight or recommendation for the user in 2-3 sentences"
  }
}

If it is not a problem statement, return JSON in this exact structure:
{
  "kind": "answer",
  "answer": "Direct, helpful response to the user's question or request."
}

For "answer", format the text using concise GitHub-flavored Markdown when useful (lists, headings, inline code, fenced code blocks).

Use the problem workflow only when the user is asking what to build, how to build it, or how to solve a concrete project challenge. For questions, explanations, comparisons, summaries, and other requests, answer directly. Include 3-6 relevant tools only for solution responses. Be specific and practical.`;

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: message },
        ];

        // Create a streaming completion
        const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            messages,
            stream: true,
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        // Pipe OpenAI stream → browser via ReadableStream
        const readable = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of stream) {
                        const text = chunk.choices[0]?.delta?.content ?? "";
                        if (text) {
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                } catch (err) {
                    controller.error(err);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no", // disables Nginx buffering
            },
        });
    } catch (error) {
        console.error("Streaming error:", error);
        return new Response(JSON.stringify({ error: "Failed to stream response" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}