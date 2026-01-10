import { wrap } from "../helper/wrap.js";
import { severityIcon } from "../helper/severityIcon.js";
import { FormattedReview, Printer } from "../types.js";

export class PrettyPrinter implements Printer {
  private readonly width = 80;
  private readonly scoreColumnWidth = 24;

  print(review: FormattedReview): void {
    this.printHeader(review.header);
    this.printSummary(review.summary);
    this.printIssues(review.issues);
    this.printSuggestions(review.suggestions, review.issues);
    this.printStrengths(review.strengths);
    this.printFooter(review.footer);
  }

  private printHeader(review: FormattedReview["header"]) {
    console.log(review.filePath);

    const left = review.metaLeft;
    const right = review.scoreRight;

    console.log(left.padEnd(this.width - this.scoreColumnWidth) + right);
    console.log();
  }

  private printSummary(summary: string) {
    console.log("Summary");
    console.log(wrap(summary, this.width - 4));
    console.log();
  }

  private printIssues(issues: FormattedReview["issues"]) {
    const { total } = issues;

    console.log(`Issues (${total} found)`);

    if (total === 0) {
      console.log("  No issues found");
      console.log();
      return;
    }

    console.log();
    for (const issue of issues.items) {
      const icon = severityIcon(issue.severity);
      const label = issue.severity.toUpperCase().padEnd(6);

      console.log(` ${icon}  ${label}   ${issue.title} (line ~ ${issue.line})`);
      console.log(wrap(issue.description, this.width - 11, "             "));
      console.log();
    }
  }

  private printSuggestions(
    suggestions: FormattedReview["suggestions"],
    issues: FormattedReview["issues"]
  ) {
    if (suggestions.length === 0) {
      console.log("Suggestions");
      console.log("  No suggestions");
      console.log();
      return;
    }

    console.log("Suggestions");
    console.log();

    for (const s of suggestions) {
      console.log(`  ${s.index}. ${s.recommendation}`);

      for (const fix of s.fixes) {
        // Find the issue this fix refers to
        const issue = this.findIssueForFix(fix, issues.items);
        const issueTitle = issue?.title || "Unknown issue";
        const issueLine = issue?.line || "?";

        console.log(
          `     → Fixes: ${severityIcon(
            fix.severity
          )}  ${issueTitle} (line ~ ${issueLine})`
        );
      }
      for (const note of s.notes) {
        console.log(`     → ${note}`);
      }
    }
    console.log();
  }

  private findIssueForFix(fix: any, issues: any[]): any | null {
    // This assumes fixes have some way to reference issues
    // You may need to adjust based on your actual data structure
    return (
      issues.find((issue) => issue.severity === fix.severity) ||
      issues[issues.length - 1] ||
      null
    );
  }

  private printStrengths(strengths: string[]) {
    if (strengths.length === 0) {
      console.log("What's working well");
      console.log("  No specific strengths identified");
      console.log();
      return;
    }

    console.log("What's working well");
    for (const s of strengths) {
      console.log(`  • ${s}`);
    }
    console.log();
  }

  private printFooter(text: string) {
    console.log("─".repeat(this.width));
    console.log(`Next steps: ${text}`);
  }
}
