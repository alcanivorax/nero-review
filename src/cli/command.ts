import { assertFile } from "../reader/stat.js";
import { readFileContent } from "../reader/readFile.js";
import { buildAnalysisContext } from "../analyzer/buildAnalysisContext.js";
import { createSmallFilePrompt } from "../ai/prompt/smallFile.prompt.js";
import { runJsonPrompt } from "../ai/runJsonPrompt.js";
import { validateCodeReviewOutput } from "../ai/validateCodeReviewOutput.js";
import { createCodeReviewResult } from "../helper/createCodeReviewResult.js";
import { formatReview } from "../printer/formatReview.js";
import { PrettyPrinter } from "../printer/PrettyPrinter.js";

export async function runCommand(args: string[]) {
  if (args.length === 0) {
    console.error("✖ No file path provided");
    return process.exit(1);
  }

  const [filePath] = args;

  try {
    await assertFile(filePath);
    const fileMetadata = await readFileContent(filePath);

    const analysisContext = await buildAnalysisContext(fileMetadata);

    const smallFilePrompt = createSmallFilePrompt(analysisContext);

    const aiResponse = await runJsonPrompt(smallFilePrompt);
    const aiReview = validateCodeReviewOutput(aiResponse);

    const reviewReport = createCodeReviewResult(
      aiReview,
      fileMetadata,
      analysisContext
    );

    const formattedReview = formatReview(reviewReport);

    const logger = new PrettyPrinter();
    logger.print(formattedReview);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("✖", message);
    process.exit(1);
  }
}
