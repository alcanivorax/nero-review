import { FileAnalyzerInput, FileAnalysis } from "./types.js";
import { detectLanguage } from "./detectLanguage.js";
import { detectRole } from "./detectRole.js";
import { detectStyle } from "./detectStyle.js";
import { collectNotes } from "./detectNote.js";

export async function fileAnalysis(
  fileInfo: FileAnalyzerInput
): Promise<FileAnalysis> {
  const language = detectLanguage(fileInfo.extension);
  const { role } = detectRole(fileInfo.path.split("/"));
  const style = detectStyle(fileInfo.content);
  const notes = collectNotes(fileInfo, { role, style });

  return {
    language: language,
    role: role,
    style: "unknown",
    notes: notes,
  };
}
