import { CodeReviewContent } from "../types.js";

export function resolveLineNumber(
  issue: { title: string; description: string },
  content: string
): number | null {
  const lines = content.split("\n");

  const keywords = [
    ...issue.title.split(/\s+/),
    ...issue.description.split(/\s+/),
  ].filter((word) => word.length > 4);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      keywords.some((keyword) =>
        line.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      return i + 1;
    }
  }
  return null;
}
