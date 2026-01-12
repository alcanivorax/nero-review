interface FileMetadata {
  filePath: string;
  extension: string;
  size: number;
  lines: number;
  effectiveLines: number;
  truncated: boolean;
  content: string;
  rawContent: string;
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
    filePath: string;
    language: string;
    lines: number;
    truncated: boolean;
    rawContent: string;
  };
}

type CodeReviewContent = Omit<CodeReviewResult, "metadata">;

interface FormattedReview {
  header: {
    filePath: string;
    metaLeft: string;
    scoreRight: string;
  };

  summary: string;

  issues: {
    total: number;
    items: Array<{
      severity: "high" | "medium" | "low";
      title: string;
      description: string;
      line: number | null;
    }>;
  };

  suggestions: Array<{
    index: number;
    recommendation: string;
    fixes: Array<{
      severity: "high" | "medium" | "low";
      title: string;
    }>;
    notes: string[];
  }>;

  strengths: string[];

  footer: string;
}

interface Printer {
  print(review: FormattedReview, fileMetadata: FileMetadata): void;
}

export type {
  FileMetadata,
  AnalysisContext,
  CodeReviewResult,
  CodeReviewContent,
  FormattedReview,
  Printer,
};
