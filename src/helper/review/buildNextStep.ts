import { CodeReviewResult } from "../../types.js";

export function buildNextStep(issues: CodeReviewResult["issues"]): string {
  if (issues.some((i) => i.severity === "high"))
    return "Address the HIGH severity issue first to prevent potential crashes.";

  if (issues.some((i) => i.severity === "medium"))
    return "Address the MEDIUM severity issue to improve reliability.";
  return "Safe to merge. No critical issues detected.";
}
