import { CodeReviewResult, FormattedReview } from "../types.js";
import { buildNextStep } from "../helper/buildNextStep.js";
import { scoreLabel } from "../helper/scoreLable.js";
import { calulateScore } from "../helper/calulateScore.js";
import { resolveLineNumber } from "../helper/resolveLineNumber.js";

export function formatReview(result: CodeReviewResult): FormattedReview {
  const score = calulateScore(result);

  return {
    header: {
      filePath: result.metadata.filePath,
      metaLeft: `${result.metadata.language} · ${result.metadata.lines} lines`,
      scoreRight: `Score: ${score}/10 (${scoreLabel(score)})`,
    },

    summary: result.summary,

    issues: {
      total: result.issues.length,
      items: result.issues.map((i) => ({
        severity: i.severity,
        title: i.title,
        description: i.description,
        line: resolveLineNumber(i, result.metadata.content),
      })),
    },

    suggestions: result.suggestions.map((s, i) => ({
      index: i + 1,
      recommendation: s.text,
      fixes: s.fixes,
      notes: s.notes,
    })),

    strengths: result.strengths.slice(0, 3),

    footer: buildNextStep(result.issues),
  };
}
