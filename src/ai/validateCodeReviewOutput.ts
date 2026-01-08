import { CodeReviewContent } from "../types.js";

export function validateCodeReviewOutput(
  rawCodeReview: unknown
): CodeReviewContent {
  // Basic structure validation
  if (typeof rawCodeReview !== "object" || rawCodeReview === null) {
    throw new Error("Invalid structure output: expected an object");
  }

  const aiReview = rawCodeReview as Record<string, unknown>;

  // Validate summary
  if (typeof aiReview.summary !== "string") {
    throw new Error("Invalid or missing 'summary' field");
  }

  // Validate issues array
  if (!Array.isArray(aiReview.issues)) {
    throw new Error("Invalid or missing 'issues' field: expected an array");
  }

  const validatedIssues = aiReview.issues.map((issue, index) => {
    if (typeof issue !== "object" || issue === null) {
      throw new Error(`Issue at index ${index} is not an object`);
    }

    const issueObj = issue as Record<string, unknown>;

    if (!["high", "medium", "low"].includes(issueObj.severity as string)) {
      throw new Error(`Issue at index ${index} has invalid 'severity'`);
    }

    if (typeof issueObj.title !== "string") {
      throw new Error(`Issue at index ${index} missing 'title'`);
    }

    if (typeof issueObj.description !== "string") {
      throw new Error(`Issue at index ${index} missing 'description'`);
    }

    // line is optional in the AI output (will be added later via resolveLineNumber)
    return {
      severity: issueObj.severity as "high" | "medium" | "low",
      title: issueObj.title,
      description: issueObj.description,
    };
  });

  // Validate suggestions array
  if (!Array.isArray(aiReview.suggestions)) {
    throw new Error(
      "Invalid or missing 'suggestions' field: expected an array"
    );
  }

  const validatedSuggestions = aiReview.suggestions.map((suggestion, index) => {
    if (typeof suggestion !== "object" || suggestion === null) {
      throw new Error(`Suggestion at index ${index} is not an object`);
    }

    const suggestionObj = suggestion as Record<string, unknown>;

    if (typeof suggestionObj.text !== "string") {
      throw new Error(`Suggestion at index ${index} missing 'text'`);
    }

    // Validate fixes array within suggestion
    if (!Array.isArray(suggestionObj.fixes)) {
      throw new Error(`Suggestion at index ${index} missing 'fixes' array`);
    }

    const validatedFixes = suggestionObj.fixes.map((fix, fixIndex) => {
      if (typeof fix !== "object" || fix === null) {
        throw new Error(
          `Fix at index ${fixIndex} in suggestion ${index} is not an object`
        );
      }

      const fixObj = fix as Record<string, unknown>;

      if (!["high", "medium", "low"].includes(fixObj.severity as string)) {
        throw new Error(
          `Fix at index ${fixIndex} in suggestion ${index} has invalid 'severity'`
        );
      }

      if (typeof fixObj.title !== "string") {
        throw new Error(
          `Fix at index ${fixIndex} in suggestion ${index} missing 'title'`
        );
      }

      return {
        severity: fixObj.severity as "high" | "medium" | "low",
        title: fixObj.title,
      };
    });

    // Validate notes array
    if (!Array.isArray(suggestionObj.notes)) {
      throw new Error(`Suggestion at index ${index} missing 'notes' array`);
    }

    if (!suggestionObj.notes.every((note) => typeof note === "string")) {
      throw new Error(`Suggestion at index ${index} has invalid 'notes' array`);
    }

    return {
      text: suggestionObj.text,
      fixes: validatedFixes,
      notes: suggestionObj.notes as string[],
    };
  });

  // Validate strengths array
  if (!Array.isArray(aiReview.strengths)) {
    throw new Error("Invalid or missing 'strengths' field: expected an array");
  }

  if (!aiReview.strengths.every((strength) => typeof strength === "string")) {
    throw new Error("'strengths' array contains non-string elements");
  }

  return {
    summary: aiReview.summary,
    issues: validatedIssues,
    suggestions: validatedSuggestions,
    strengths: aiReview.strengths as string[],
  };
}
