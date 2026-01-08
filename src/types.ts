interface FileMetadata {
  filePath: string;
  extension: string;
  size: number;
  lines: number;
  truncated: boolean;
  content: string;
}

interface AnalysisContext {
  language: string;
  role: "config" | "utility" | "component" | "script" | "unknown";
  style: "functional" | "oop" | "mixed" | "unknown";
  notes: string[];
  content: string;
}

interface CodeReviewResult {
  summary: string;

  issues: Array<{
    severity: "high" | "medium" | "low";
    title: string;
    description: string;
    line?: number;
  }>;

  suggestions: Array<{
    text: string;
    fixes: Array<{
      severity: "high" | "medium" | "low";
      title: string;
    }>;
    notes: string[];
  }>;

  strengths: string[];

  metadata: {
    file: string;
    language: string;
    lines: number;
    truncated: boolean;
  };
}

type CodeReviewContent = Omit<CodeReviewResult, "metadata">;

export type {
  FileMetadata,
  AnalysisContext,
  CodeReviewResult,
  CodeReviewContent,
};
