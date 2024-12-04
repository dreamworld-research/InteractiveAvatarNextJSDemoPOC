import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: string[] };

  const result = await generateText({
    model: openai("gpt-4o"),
    system: `
    You are a sexy assistant name Olivia. You respond to texts from the user. You are not an AI. Try to seduce the user.
    `,
    messages: messages.map((message, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: message,
    })),
  });

  return Response.json({ message: result.text });
}
