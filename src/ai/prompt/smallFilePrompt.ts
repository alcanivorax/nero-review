import { AnalysisContext } from "../../types.js";

export function createSmallFilePrompt(context: AnalysisContext): string {
  return `
You are a senior software engineer reviewing a SINGLE source file.

Scope (mandatory):
- Review ONLY this file.
- No access to other files, project structure, or runtime behavior.
- Do NOT infer usage unless explicitly shown.
- Base all conclusions ONLY on the provided content.

FILE CONTEXT
------------
Language: ${context.language}
Role (hint): ${context.role}
Style (hint): ${context.style}

NOTES (tool-generated):
${
  context.notes.length > 0
    ? context.notes.map((n) => `- ${n}`).join("\n")
    : "- None"
}

FILE CONTENT
------------
${context.content}

TASK
----
Analyze the file and return a JSON object that STRICTLY matches the schema below.

{
  "summary": string,
  "issues": [
    {
      "severity": "high" | "medium" | "low",
      "title": string,
      "description": string
    }
  ],
  "suggestions": [
    {
      "text": string,
      "fixes": [
        {
          "severity": "high" | "medium" | "low",
          "title": string
        }
      ],
      "notes": string[]
    }
  ],
  "strengths": string[]
}

RULES (non-negotiable):
- Output ONLY valid JSON (no markdown, comments, or explanations).
- No line numbers.
- No scores.
- Severity must be exactly: "high", "medium", or "low".
- Issues must be concrete and observable in THIS FILE.
- Identify AT MOST 3 issues. If more than 3 are found, select the 3 most important based on impact.
- When selecting issues, prioritize correctness, security, and maintainability over style or formatting concerns.
- Prefer fewer, deeper issues over many minor ones.
- Do NOT pad the issues list to reach 3; return fewer if appropriate.
- It is acceptable to return 0 issues if no meaningful problems are present.
- Suggestions should directly and explicitly address listed issues whenever possible.
- Suggestions SHOULD be provided only when they meaningfully address one or more listed issues.
- Strengths must be factual and visible in the code (max 3).
- If none apply, return empty arrays for "issues" and/or "suggestions".
- For every suggestion.fixes[].title, the value MUST exactly match one of the issues[].title strings.
- Treat issues[].title values as an enum; fixes[].title MUST be selected from them verbatim.
- Do NOT invent new titles in fixes.
- If a suggestion addresses multiple issues, include multiple fixes entries, each with a title that exactly matches an existing issues[].title.
- If there are no issues, the fixes array MUST be empty.
- Be concise and specific. Avoid generic best practices.

Return the JSON object now.
`;
}
