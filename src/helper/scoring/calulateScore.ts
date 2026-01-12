import { CodeReviewResult } from "../../types.js";

// TODO(v0.2): Suppress or adjust scoring for generated/config files

export function calulateScore(review: CodeReviewResult): number {
  let score: number = 10;

  for (const issue of review.issues) {
    if (issue.severity === "high") score -= 1.5;
    if (issue.severity === "medium") score -= 0.7;
    if (issue.severity === "low") score -= 0.3;
  }

  if (review.metadata.truncated) {
    score -= 1;
  }

  return Math.max(0, Number(score.toFixed(1)));
}
