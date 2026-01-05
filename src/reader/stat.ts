import { stat } from "fs/promises";

export async function assertFile(path: string) {
  try {
    const info = await stat(path);

    if (!info.isFile()) {
      throw new Error("Path is not a file");
    }
  } catch {
    throw new Error("File does not exist or is not readable");
  }
}
