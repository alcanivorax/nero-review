import { FileAnalysis, FileAnalyzerInput } from "./types.js";

export function collectNotes(
  input: FileAnalyzerInput,
  analysis: {
    role: FileAnalysis["role"];
    style: FileAnalysis["style"];
  }
): string[] {
  const notes: string[] = [];

  if (analysis.role === "unknown") {
    notes.push("ROLE_UNKNOWN_NO_STRONG_HINTS");
  }

  if (analysis.style === "unknown") {
    notes.push("STYLE_UNKNOWN_NO_STRONG_HINTS");
  }

  if (input.truncated) {
    notes.push("CONTENT_TRUNCATED");
  }

  return notes;
}
