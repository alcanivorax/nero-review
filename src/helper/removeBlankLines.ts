export function removeBlankLines(arr: Array<string>): Array<string> {
  return arr.filter((line) => line.trim() !== "");
}
