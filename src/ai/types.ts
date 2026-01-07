interface ContentPrompt {
  content: string;
  info: {
    language: string;
    role: string;
    style: string;
    notes: string[];
  };
}
export type { ContentPrompt };
