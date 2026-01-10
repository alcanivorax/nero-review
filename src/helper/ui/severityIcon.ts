export function severityIcon(sev: "high" | "medium" | "low") {
  if (sev === "high") return "▲";
  if (sev === "medium") return "●";
  return "○";
}
