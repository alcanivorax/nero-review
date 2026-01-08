import { AnalysisContext } from "./types.js";

export function detectStyle(content: string): AnalysisContext["style"] {
  const functionHints = ["function", "=>"];
  const oopsHints = [
    "class",
    "constructor",
    "public",
    "private",
    "implements",
    "protected",
    "extends",
  ];

  const hasFunctional = functionHints.some((h) => content.includes(h));
  const hasOOP = oopsHints.some((h) => content.includes(h));

  if (hasFunctional && hasOOP) return "mixed";
  if (hasFunctional) return "functional";
  if (hasOOP) return "oop";

  return "unknown";
}
