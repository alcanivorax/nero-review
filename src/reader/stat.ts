import { stat } from "fs/promises";

export async function assertFile(filePath: string): Promise<void> {
  const fileInfo = await stat(filePath);

  if (!fileInfo.isFile()) {
    throw new Error(`Expected a file, but got something else: ${filePath}`);
  }
}
