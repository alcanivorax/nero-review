import { assertFile } from "../reader/stat.js";
import { readTextFile } from "../reader/readFile.js";
import { fileAnalysis } from "../analyzer/fileAnalyzer.js";
import { createSmallFilePrompt } from "../ai/prompt/smallFile.prompt.js";
import { runPrompt } from "../ai/runPrompt.js";

export async function runCommand(args: string[]) {
  if (args.length === 0) {
    console.error("✖ No file path provided");
    process.exit(1);
  }

  const filePath = args[0];

  try {
    await assertFile(filePath);
    const file = await readTextFile(filePath);

    console.log("✔ File loaded");
    console.log("- Path:", filePath);
    console.log("- Lines:", file.lines);
    console.log("- Truncated:", file.truncated);
    const info = await fileAnalysis(file);
    // only for small files now
    const contentInfo = {
      content: file.content,
      info: {
        language: info.language,
        role: info.role,
        style: info.style,
        notes: info.notes,
      },
    };
    const smallFilePrompt = await createSmallFilePrompt(contentInfo);

    const response = await runPrompt(smallFilePrompt);

    console.log(response);
  } catch (err: any) {
    console.error("✖", err.message);
    process.exit(1);
  }
}
