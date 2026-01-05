interface FileAnalyzerInput {
  path: string;
  extension: string;
  content: string;
}

interface FileAnalysis {
  language: string;
  role: "config" | "utility" | "component" | "script" | "unknown";
  style: "functional" | "oop" | "mixed" | "unknown";
  notes: string[];
}

type RoleSignature = {
  role: "config" | "utility" | "component" | "script" | "unknown";
};

export { FileAnalyzerInput, FileAnalysis, RoleSignature };
