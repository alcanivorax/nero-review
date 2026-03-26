# nero-review Design Document

## 1. Overview

**nero-review** is a terminal-first AI code review CLI tool. It analyzes source files locally, sends context to an AI provider (OpenRouter), validates the response, and outputs structured, actionable feedback directly in the terminal.

### Core Purpose
- Provide instant, AI-powered code review without leaving the terminal
- Single-file review workflow (one file per invocation)
- Display results in a formatted, readable output with severity indicators

### Design Philosophy
- **Terminal-native**: No browser, no GUI — everything happens in CLI
- **Zero config (mostly)**: Only requires API key + model via environment variables
- **Fail fast**: Validate environment and file inputs early
- **Structured AI output**: Force JSON responses with strict schema validation

---

## 2. Architecture

### High-Level Data Flow

```
File Path → Read File → Analyze Context → Build Prompt → 
AI Request → Validate Response → Format Result → Print Output
```

### Directory Structure

```
src/
├── index.ts              # Entry point (CLI bootstrap)
├── types.ts              # TypeScript interfaces
├── meta.ts               # CLI metadata from package.json
├── cli/
│   ├── runCommand.ts     # Main orchestration logic
│   ├── options.ts        # CLI argument parsing (commander)
│   └── loader.ts         # Spinner/loader utilities
├── reader/
│   ├── readFile.ts       # File content extraction + truncation
│   └── stat.ts           # File existence validation
├── analyzer/
│   ├── buildAnalysisContext.ts  # Context aggregation
│   ├── detectRole.ts     # Determine file role (utility/config/etc)
│   ├── detectStyle.ts    # Determine coding style (OOP/functional)
│   └── detectNotes.ts    # Generate tool hints
├── ai/
│   ├── runJsonPrompt.ts  # OpenRouter API integration
│   ├── validateCodeReviewOutput.ts  # Response schema validation
│   └── prompt/
│       └── smallFilePrompt.ts  # Prompt template builder
├── printer/
│   ├── formatReview.ts   # Transform raw review to display format
│   └── PrettyPrinter.ts # Console output rendering
└── helper/
    ├── createCodeReviewResult.ts  # Merge AI response + metadata
    ├── ui/
    │   ├── theme.ts       # Chalk-based theming
    │   ├── severityIcon.ts
    │   └── assertEnvironment.ts
    ├── scoring/
    │   ├── calulateScore.ts
    │   └── scoreLable.ts
    ├── text/
    │   ├── wrap.ts        # Word wrap utility
    │   ├── removeBlankLines.ts
    │   └── sanitizeContent.ts
    └── review/
        ├── buildNextStep.ts
        └── resolveLineNumber.ts
```

### Entry Points

1. **CLI Entry**: `src/index.ts` — Executed via `nero-review <file>`
2. **Command Handler**: `src/cli/runCommand.ts` — Orchestrates the full pipeline

---

## 3. File Breakdown

### Core Files

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/index.ts` | Bootstraps CLI, checks for updates, calls `runCommand` | `dotenv`, `commander`, `cli-update-check` |
| `src/types.ts` | Defines `FileMetadata`, `AnalysisContext`, `CodeReviewResult`, `FormattedReview`, `Printer` | None |
| `src/meta.ts` | Exports `CLI_NAME`, `CLI_VERSION` from `package.json` | `package.json` (JSON import) |
| `src/cli/runCommand.ts` | Main orchestrator: reads file → analyzes → calls AI → formats → prints | All major modules |
| `src/cli/options.ts` | Parses CLI args using Commander | `commander` |
| `src/cli/loader.ts` | Creates Ora spinner instances | `ora` |

### Reader Module

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/reader/readFile.ts` | Reads file, truncates to 300 lines (150 top + 150 bottom), extracts metadata | `fs/promises`, `file-lang` |
| `src/reader/stat.ts` | Validates input is a file (not directory) | `fs/promises` |

### Analyzer Module

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/analyzer/buildAnalysisContext.ts` | Aggregates language, role, style, notes | `file-lang`, detect* modules |
| `src/analyzer/detectRole.ts` | Classifies file as config/utility/component/script/unknown based on path | None |
| `src/analyzer/detectStyle.ts` | Detects OOP/functional/mixed based on code keywords | None |
| `src/analyzer/detectNotes.ts` | Generates tool hints (e.g., `CONTENT_TRUNCATED`) | None |

### AI Module

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/ai/runJsonPrompt.ts` | Sends prompt to OpenRouter, parses JSON response, handles fences | `@openrouter/sdk` |
| `src/ai/validateCodeReviewOutput.ts` | Schema validation of AI JSON response (runtime validation) | None |
| `src/ai/prompt/smallFilePrompt.ts` | Builds system prompt with file context + schema spec | None |

### Printer Module

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/printer/formatReview.ts` | Transforms `CodeReviewResult` → `FormattedReview`, calculates score, resolves line numbers | scoring, review helpers |
| `src/printer/PrettyPrinter.ts` | Renders `FormattedReview` to console with Chalk styling | `chalk`, theme helpers |

### Helper Modules

| File | Purpose |
|------|---------|
| `src/helper/createCodeReviewResult.ts` | Merges AI review + file metadata into final `CodeReviewResult` |
| `src/helper/ui/theme.ts` | Central Chalk theme (colors, box-drawing, icons by language) |
| `src/helper/ui/severityIcon.ts` | Maps severity → ASCII icon (✕, ◐, ○) |
| `src/helper/ui/assertEnvironment.ts` | Validates `NERO_API_KEY` and `NERO_MODEL` env vars |
| `src/helper/scoring/calulateScore.ts` | Computes 0–10 score based on issue severity + truncation |
| `src/helper/scoring/scoreLable.ts` | Maps numeric score to label (Excellent/Good/Fair/Needs attention) |
| `src/helper/text/wrap.ts` | Word-wrap utility for console output |
| `src/helper/text/removeBlankLines.ts` | Filters empty lines |
| `src/helper/text/sanitizeContent.ts` | Normalizes line endings + tabs |
| `src/helper/review/buildNextStep.ts` | Generates next-step message based on highest severity |
| `src/helper/review/resolveLineNumber.ts` | Attempts to find line number of issue by keyword matching |

---

## 4. Key Functions & Classes

### `runCommand(filePath: string): Promise<void>`
- **Purpose**: Main orchestration function
- **Inputs**: Path to source file
- **Outputs**: Console output (no return value)
- **Side Effects**: Reads file system, makes HTTP request, writes to console
- **Called by**: `src/index.ts`

### `readFileContent(filePath: string): Promise<FileMetadata>`
- **Purpose**: Extracts file content with truncation logic
- **Inputs**: Absolute file path
- **Outputs**: `FileMetadata` object
- **Constraints**: Max file size 50KB, truncates to 300 effective lines
- **Throws**: `Error` if file too large

### `buildAnalysisContext(fileMetadata: FileMetadata): Promise<AnalysisContext>`
- **Purpose**: Gathers contextual hints for the AI
- **Inputs**: File metadata
- **Outputs**: Language, role, style, notes

### `runJsonPrompt<T>(prompt: string): Promise<T>`
- **Purpose**: Sends prompt to OpenRouter and parses JSON
- **Inputs**: Prompt string
- **Outputs**: Parsed JSON of type `T`
- **Throws**: Missing API key, empty response, parse errors

### `validateCodeReviewOutput(rawCodeReview: unknown): CodeReviewContent`
- **Purpose**: Runtime schema validation of AI output
- **Inputs**: Raw AI response
- **Outputs**: Validated `CodeReviewContent`
- **Throws**: Schema validation errors

### `createSmallFilePrompt(context: AnalysisContext): string`
- **Purpose**: Builds system prompt with file context and JSON schema
- **Inputs**: Analysis context
- **Outputs**: Prompt string for LLM

### `formatReview(result: CodeReviewResult): FormattedReview`
- **Purpose**: Transforms raw review into display-ready format
- **Inputs**: Raw review result
- **Outputs**: Formatted review with score, line numbers

### `calulateScore(review: CodeReviewResult): number`
- **Purpose**: Computes numeric score (0–10)
- **Scoring**: -1.5/high, -0.7/medium, -0.3/low, -1 if truncated

### `class PrettyPrinter implements Printer`
- **Purpose**: Renders formatted review to console
- **Methods**: `print()`, `printHeader()`, `printSummary()`, `printIssues()`, `printSuggestions()`, `printStrengths()`, `printFooter()`

---

## 5. Execution Flow

1. **Bootstrap**: `index.ts` loads dotenv, parses CLI args via `options()`
2. **Environment Check**: `assertEnvironment()` validates `NERO_API_KEY` and `NERO_MODEL`
3. **File Validation**: `assertFile()` checks path is a file
4. **Read Phase**: `readFileContent()` reads file, truncates if >300 lines
5. **Analysis Phase**: `buildAnalysisContext()` detects language, role, style, notes
6. **Prompt Construction**: `createSmallFilePrompt()` builds prompt with context + schema
7. **AI Request**: `runJsonPrompt()` sends to OpenRouter, extracts + parses JSON
8. **Validation**: `validateCodeReviewOutput()` validates AI response schema
9. **Result Creation**: `createCodeReviewResult()` merges AI response + metadata
10. **Formatting**: `formatReview()` calculates score, resolves line numbers
11. **Output**: `PrettyPrinter.print()` renders to terminal with Chalk styling
12. **Update Check**: Background check for CLI updates via `cli-update-check`

---

## 6. Dependencies

| Package | Purpose | Why Used |
|---------|---------|----------|
| `@openrouter/sdk` | OpenRouter API client | Single AI provider abstraction |
| `chalk` | Terminal string styling | All CLI output colors/formatting |
| `commander` | CLI argument parsing | Flags, version, help text |
| `dotenv` | Environment variable loading | Reads `NERO_API_KEY`, `NERO_MODEL` |
| `file-lang` | Language detection from extension | Determines file language |
| `ora` | Terminal spinners | Loading states during AI call |
| `cli-update-check` | Check for CLI updates | Notifies users of new versions |
| `@types/node` | Node.js types | TypeScript support |
| `typescript` | TypeScript compiler | Build to JS |
| `tsx` | TypeScript executor | Development (`npm run dev`) |

---

## 7. Improvements & Recommendations

### Code Quality

1. **Runtime Validation**: Consider using **Zod** or **Valibot** instead of manual validation in `validateCodeReviewOutput.ts` — more maintainable as schema evolves.

2. **Error Handling**: `runCommand.ts` catches errors broadly. Consider typed error classes for better user messages (e.g., `ValidationError`, `ApiError`).

3. **Testability**: No test suite present. Add unit tests for:
   - `detectRole.ts`, `detectStyle.ts`
   - `calulateScore.ts`, `scoreLabel.ts`
   - `resolveLineNumber.ts`
   - Prompt generation

4. **Magic Numbers**: Constants like `MAX_SIZE = 50 * 1024`, `TOP_LINES = 150`, `BOTTOM_LINES = 150` should be centralized in a config file.

### Architecture

5. **Multiple File Support**: Currently single-file only. Consider batch review or directory traversal.

6. **Provider Abstraction**: Hardcoded to OpenRouter. Abstract to allow other providers (OpenAI, Anthropic).

7. **Caching**: No caching of results. Could cache recent reviews to avoid repeated API calls for unchanged files.

8. **Configuration File**: No `.nerorc` or similar. Could allow users to set default model, severity weights, etc.

### Scalability

9. **Large File Handling**: Truncation loses context. Consider chunked analysis or summary-first approach for large files.

10. **Streaming**: AI responses could be streamed for perceived performance (ora supports spinner text updates).

11. **Parallel Analysis**: If multi-file support is added, parallelize AI calls.

### UX

12. **Exit Codes**: Return distinct exit codes for different failure modes (file not found vs. API error vs. validation error).

13. **Interactive Mode**: Consider `--watch` mode for auto-review on file changes.

14. **Config Persistence**: `nero-review init` to generate default config, rather than manual env setup.

---

## 8. Security Notes

- **No secrets logged**: API keys only read from environment
- **No data persisted**: Each run is stateless
- **No external calls except AI**: Only network request is to OpenRouter
- **Input sanitization**: Content sanitized before sending (line endings, tabs)
