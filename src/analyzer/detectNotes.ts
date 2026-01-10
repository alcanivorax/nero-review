import { FileMetadata } from "../types.js";
import { AnalysisContext } from "../types.js";

export function collectNotes(
  input: FileMetadata,
  analysis: {
    role: AnalysisContext["role"];
    style: AnalysisContext["style"];
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
