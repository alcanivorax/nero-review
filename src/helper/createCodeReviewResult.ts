import {
  FileMetadata,
  AnalysisContext,
  CodeReviewResult,
  CodeReviewContent,
} from "../types.js";

export function createCodeReviewResult(
  aiReview: CodeReviewContent,
  fileMetadata: FileMetadata,
  analysisContext: AnalysisContext
): CodeReviewResult {
  return {
    summary: aiReview.summary,

    issues: aiReview.issues.map((issue) => ({
      ...issue,
    })),
    suggestions: aiReview.suggestions,
    strengths: aiReview.strengths,
    metadata: {
      filePath: fileMetadata.filePath,
      language: analysisContext.language,
      lines: fileMetadata.lines,
      truncated: fileMetadata.truncated,
      content: fileMetadata.content,
    },
  };
}
