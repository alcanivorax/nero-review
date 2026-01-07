export function detectLanguage(
  input: string
): "TypeScript" | "JavaScript" | "Unknown" {
  const languageMap: Record<string, "TypeScript" | "JavaScript"> = {
    // TypeScript extensions
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".mts": "TypeScript",
    ".cts": "TypeScript",

    // JavaScript extensions
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".mjs": "JavaScript",
    ".cjs": "JavaScript",
  };

  return languageMap[input.toLowerCase()] || "Unknown";
}
