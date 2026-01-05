import { readFile, stat } from "fs/promises";
import { extname } from "path";

const MAX_SIZE = 50 * 1024; // 50kb
const MAX_LINES = 500;

export async function readTextFile(path: string) {
  const info = await stat(path);
  const size = info.size;

  const raw = await readFile(path, "utf-8");
  const lines: string[] = raw.split("\n");
  // const filterLines = removeEmptyLines(lines, "");

  let content = raw;
  let truncated = false;

  if (size > MAX_SIZE || lines.length > MAX_LINES) {
    content = lines.slice(0, MAX_LINES).join("\n");
    truncated = true;
  }

  return {
    path,
    extension: extname(path),
    size,
    lines: lines.length,
    truncated,
    content,
  };
}

function removeEmptyLines<T>(arr: Array<T>, value: T): Array<T> {
  for (let i = 0; i < arr.length; i++) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
  return arr;
}
