export function wrap(text: string, width: number, indent = ""): string {
  const words = text.split(" ");
  let line = "";
  let out = "";

  for (const w of words) {
    if ((line + w).length > width) {
      out += indent + line.trim() + "\n";
      line = w + " ";
    } else {
      line += w + " ";
    }
  }
  return out + indent + line.trim();
}
