import { detectLanguage } from "file-lang";
import { FileMetadata } from "../types.js";
import { AnalysisContext } from "../types.js";
import { detectRole } from "./detectRole.js";
import { detectStyle } from "./detectStyle.js";
import { collectNotes } from "./detectNotes.js";

export async function buildAnalysisContext(
  fileMetadata: FileMetadata
): Promise<AnalysisContext> {
  const language = detectLanguage(fileMetadata.extension);
  const role = detectRole(fileMetadata.filePath.split("/"));
  const style = detectStyle(fileMetadata.content);
  const notes = collectNotes(fileMetadata, { role, style });

  return {
    language,
    role,
    style,
    notes,
    content: fileMetadata.content,
  };
}
