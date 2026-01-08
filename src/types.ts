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

  issues: [
    {
      severity: "high" | "medium" | "low";
      title: string;
      description: string;
    }
  ];

  suggestions: [
    {
      text: string;
      fixes: [
        {
          severity: "high" | "medium" | "low";
          title: string;
        }
      ];
      notes: string[];
    }
  ];

  strengths: string[];
}

export type { FileMetadata, AnalysisContext, CodeReviewResult };
