export function scoreLabel(score: number): string {
  if (score >= 9) return "Excellent";
  if (score >= 7.5) return "Good";
  if (score >= 6) return "Fair";

  return "Needs attention";
}
