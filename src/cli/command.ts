import { assertFile } from "../reader/stat.js";
import { readFileContent } from "../reader/readFile.js";
import { buildAnalysisContext } from "../analyzer/buildAnalysisContext.js";
import { createSmallFilePrompt } from "../ai/prompt/smallFile.prompt.js";
import { runJsonPrompt } from "../ai/runJsonPrompt.js";

export async function runCommand(args: string[]) {
  if (args.length === 0) {
    console.error("✖ No file path provided");
    return process.exit(1);
  }

  const filePath = args[0];

  try {
    await assertFile(filePath);
    const fileMetadata = await readFileContent(filePath);

    const analysisContext = await buildAnalysisContext(fileMetadata);

    const smallFilePrompt = createSmallFilePrompt(analysisContext);

    const aiResponse = await runJsonPrompt(smallFilePrompt);

    console.log(aiResponse);
  } catch (err: any) {
    console.error("✖", err.message);
    return process.exit(1);
  }
}
