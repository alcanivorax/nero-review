import { OpenRouter } from "@openrouter/sdk";

export async function runJsonPrompt<T>(prompt: string): Promise<T> {
  const apiKey = process.env.NERO_API_KEY;
  const model = process.env.NERO_MODEL;
  if (!apiKey) {
    throw new Error("NERO_API_KEY is not set");
  }

  if (!model) {
    throw new Error("NERO_MODEL is not set");
  }
  const openrouter = new OpenRouter({
    apiKey,
  });

  const response = await openrouter.chat.send({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  const text = extractTextContent(content);
  if (!text || !text.trim()) {
    throw new Error("AI Response contained no readable text");
  }
  const cleaned = unWrapJsonFence(text);
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }
}

function extractTextContent(content: string | any[]): string | null {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .filter((item) => item.type === "text")
      .map((item) => item.text)
      .join("");
  }

  return null;
}

function unWrapJsonFence(text: string): string {
  const trimmed = text.trim();
  // Strip ONLY the outer ``` fence if present
  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n");
    // Remove opening fense(``` or ```json)
    lines.shift();

    // Remove closing fense(```)
    if (lines[lines.length - 1].trim() === "```") {
      lines.pop();
    }

    return lines.join("\n").trim();
  }
  return trimmed;
}
// Use zod
