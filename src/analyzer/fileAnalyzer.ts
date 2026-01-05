import { FileAnalyzerInput, FileAnalysis } from "./types.js";
import { detectLanguage } from "./detectLanguage.js";
import { detectRole } from "./detectRole.js";

export async function fileAnalysis(
  fileInfo: FileAnalyzerInput
): Promise<FileAnalysis> {
  const language = detectLanguage(fileInfo.extension);
  const { role } = detectRole(fileInfo.path.split("/"));
  console.log("- Language: ", language);
  console.log("- Role:", role);

  return {
    language: language,
    role: role,
    style: "unknown",
    notes: [],
  };
}
