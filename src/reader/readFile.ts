import { readFile, stat } from "fs/promises";
import { extname } from "path";
import { FileMetadata } from "../types.js";
import { removeBlankLines } from "./removeBlankLines.js";
import { sanitizeContent } from "./sanitizeContent.js";

const MAX_SIZE = 20 * 1024;
const MAX_LINES = 300;

export async function readFileContent(filePath: string): Promise<FileMetadata> {
  const fileInfo = await stat(filePath);
  const size = fileInfo.size;

  if (size > MAX_SIZE) {
    // temporary error for large files, will be truncate instead later
    throw new Error(`File too large: ${size} bytes`);
  }

  const rawFileInfo = await readFile(filePath, "utf-8");
  const lines: string[] = rawFileInfo.split("\n");
  const effectiveLines: string[] = removeBlankLines(lines);

  let rawContent: string;
  let truncated = false;

  if (effectiveLines.length > MAX_LINES) {
    rawContent = effectiveLines.slice(0, MAX_LINES).join("\n");
    truncated = true;
  } else {
    rawContent = effectiveLines.join("\n");
  }

  return {
    filePath,
    extension: extname(filePath),
    size,
    lines: effectiveLines.length,
    truncated,
    content: sanitizeContent(rawContent),
  };
}
