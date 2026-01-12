export function resolveLineNumber(
  issue: { title: string; description: string },
  content: string
): number | null {
  const lines = content.split("\n");

  // Extract meaningful keywords (filter common words, keep alphanumeric)
  const extractKeywords = (text: string) => {
    const commonWords = new Set([
      "the",
      "this",
      "that",
      "with",
      "from",
      "have",
      "should",
      "would",
      "could",
    ]);
    return text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[^\w]/g, ""))
      .filter((word) => word.length > 2 && !commonWords.has(word));
  };

  const titleKeywords = extractKeywords(issue.title);
  const descKeywords = extractKeywords(issue.description);

  let bestScore = 0;
  let bestLine = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    let score = 0;

    // Title keywords are more important (weight: 3)
    titleKeywords.forEach((keyword) => {
      if (line.includes(keyword)) score += 3;
    });

    // Description keywords (weight: 1)
    descKeywords.forEach((keyword) => {
      if (line.includes(keyword)) score += 1;
    });

    // Prefer non-comment lines
    if (!line.trim().startsWith("//") && !line.trim().startsWith("*")) {
      score *= 1.2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestLine = i + 1;
    }
  }

  return bestScore > 0 ? bestLine : null;
}
