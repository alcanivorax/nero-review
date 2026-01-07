import { OpenRouter } from "@openrouter/sdk";

export async function runPrompt(prompt: string): Promise<string> {
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

  return text.trim();
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
