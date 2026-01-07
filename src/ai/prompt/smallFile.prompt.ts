import { ContentPrompt } from "../types.js";
export function createSmallFilePrompt(data: ContentPrompt): string {
  return `
You are an experienced software engineer performing a focused code review.

You are reviewing a SINGLE FILE only.
You do NOT have access to other files, project structure, or usage context.
Do NOT assume how this file is used unless explicitly shown.

The information below describes the file you are reviewing.

FILE METADATA
-------------
Language: ${data.info.language}
Role: ${data.info.role}
Style: ${data.info.style}

FILE CONTENT (complete)
-----------------------
${data.content}

Your task:
1. Briefly summarize what this file does.
2. Identify issues, risks, or code smells specific to THIS FILE.
3. Suggest concrete improvements that apply ONLY to this file.
4. Clearly state any limitations of this review.

Rules:
- Do not invent missing context.
- Do not assume how this file is used elsewhere.
- Do not suggest project-wide refactors.
- Prefer file-specific observations over generic best practices.
- Be concise and factual.

Respond using EXACTLY the following structure:

SUMMARY
-------
<short paragraph>

ISSUES
------
- <bullet points>

SUGGESTIONS
-----------
- <bullet points>

LIMITATIONS
-----------
- <what could not be confidently inferred>
`;
}
