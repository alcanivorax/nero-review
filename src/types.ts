interface FileMetadata {
  filePath: string;
  extension: string;
  size: number;
  lines: number;
  truncated: boolean;
  content: string;
}

export type { FileMetadata };
