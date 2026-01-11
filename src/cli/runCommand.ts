import { assertFile } from "../reader/stat.js";
import { readFileContent } from "../reader/readFile.js";
import { buildAnalysisContext } from "../analyzer/buildAnalysisContext.js";
import { createSmallFilePrompt } from "../ai/prompt/smallFilePrompt.js";
import { runJsonPrompt } from "../ai/runJsonPrompt.js";
import { validateCodeReviewOutput } from "../ai/validateCodeReviewOutput.js";
import { createCodeReviewResult } from "../helper/createCodeReviewResult.js";
import { formatReview } from "../printer/formatReview.js";
import { PrettyPrinter } from "../printer/PrettyPrinter.js";
import { step } from "./loader.js";
import { theme } from "../helper/ui/theme.js";

export async function runCommand(args: string[]) {
  if (args.length === 0) {
    console.error("✖ No file path provided");
    return process.exit(1);
  }

  const [filePath] = args;

  try {
    await assertFile(filePath);
    const readStep = step(theme.muted("Reading file")).start();
    const fileMetadata = await readFileContent(filePath);
    readStep.stopAndPersist({
      symbol: theme.loader("✔ "),
      text: theme.muted("Reading file"),
    });

    const analyzeStep = step(theme.muted("Analyzing structure")).start();
    const analysisContext = await buildAnalysisContext(fileMetadata);
    analyzeStep.stopAndPersist({
      symbol: theme.loader("✔ "),
      text: theme.muted("Analyzing structure"),
    });

    const reviewStep = step(theme.muted("Generating review")).start();
    const smallFilePrompt = createSmallFilePrompt(analysisContext);
    const aiResponse = await runJsonPrompt(smallFilePrompt);
    const aiReview = validateCodeReviewOutput(aiResponse);
    const reviewReport = createCodeReviewResult(
      aiReview,
      fileMetadata,
      analysisContext
    );
    reviewStep.stopAndPersist({
      symbol: theme.loader("✔ "),
      text: theme.muted("Generating review"),
    });

    const formattedReview = formatReview(reviewReport);

    const logger = new PrettyPrinter();
    logger.print(formattedReview);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(theme.error(" ✖ "), theme.muted(message));
    process.exit(1);
  }
}
