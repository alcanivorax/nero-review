import { readFile, stat } from "fs/promises";
import { extname } from "path";
import { FileMetadata } from "../types.js";
import { removeBlankLines } from "../helper/text/removeBlankLines.js";
import { sanitizeContent } from "../helper/text/sanitizeContent.js";

const MAX_SIZE = 50 * 1024;

export async function readFileContent(filePath: string): Promise<FileMetadata> {
  const fileInfo = await stat(filePath);
  const size = fileInfo.size;

  if (size > MAX_SIZE) {
    throw new Error(`File too large: ${size} bytes`);
  }

  const rawFileInfo = await readFile(filePath, "utf-8");
  const lines: string[] = rawFileInfo.split("\n");
  const effectiveLines: string[] = removeBlankLines(lines);

  let processedContent: string;

  let truncated = false;
  const TOP_LINES = 150;
  const BOTTOM_LINES = 150;

  const total = effectiveLines.length;

  if (total > TOP_LINES + BOTTOM_LINES) {
    const top = effectiveLines.slice(0, TOP_LINES);
    const bottom = effectiveLines.slice(total - BOTTOM_LINES);

    processedContent = [...top, "\n/* ... truncated ... */\n", ...bottom].join(
      "\n"
    );
    truncated = true;
  } else {
    processedContent = effectiveLines.join("\n");
  }

  return {
    filePath,
    extension: extname(filePath),
    size,
    lines: lines.length,
    effectiveLines: effectiveLines.length,
    truncated,
    content: sanitizeContent(processedContent),
    rawContent: rawFileInfo,
  };
}
