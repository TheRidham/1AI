import { NextRequest } from "next/server";
import OpenAI from "openai";

// ✅ Edge runtime gives the fastest streaming response
export const runtime = "edge";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an expert technical solution architect. When a user describes a problem, analyze it and return a structured JSON response ONLY (no markdown, no explanation outside JSON).

Return this exact JSON structure:
{
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

Include 3-6 relevant tools. Be specific and practical.`;

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