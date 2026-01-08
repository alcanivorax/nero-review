export function sanitizeContent(rawContent: string): string {
  return rawContent.replace(/\r\n/g, "\n").replace(/\t/g, " ").trim();
}
