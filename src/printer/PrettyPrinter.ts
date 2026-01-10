import { wrap } from "../helper/wrap.js";
import { severityIcon } from "../helper/severityIcon.js";
import { FormattedReview, Printer } from "../types.js";

export class PrettyPrinter implements Printer {
  private readonly width = 80;
  private line: number | null = null;
  private issueTitle: string = "";

  print(review: FormattedReview): void {
    this.printHeader(review.header);
    this.printSummary(review.summary);
    this.printIssues(review.issues);
    this.printSuggestions(review.suggestions);
    this.printStrengths(review.strengths);
    this.printFooter(review.footer);
  }

  private printHeader(review: FormattedReview["header"]) {
    console.log(review.filePath);

    const left = review.metaLeft;
    const right = review.scoreRight;

    console.log(left.padEnd(this.width - 24) + right);
    console.log();
  }

  private printSummary(summary: string) {
    console.log("Summary");
    console.log(wrap(summary, this.width - 4));
    console.log();
  }

  private printIssues(issues: FormattedReview["issues"]) {
    const { total } = issues;
    if (total === 0) console.log("No Issues Found");

    console.log(`Issues (${total} found)`);
    console.log();
    for (const issue of issues.items) {
      const icon = severityIcon(issue.severity);
      const label = issue.severity.toUpperCase().padEnd(6);
      this.line = issue.line;
      this.issueTitle = issue.title;

      console.log(` ${icon}  ${label}   ${issue.title} (line ~ ${issue.line})`);
      console.log(wrap(issue.description, this.width - 11, "              "));
      console.log();
    }
  }

  private printSuggestions(suggestions: FormattedReview["suggestions"]) {
    if (suggestions.length === 0) return;

    console.log("Suggestions");
    console.log();

    for (const s of suggestions) {
      console.log(`  ${s.index}. ${s.recommendation}`);

      for (const fix of s.fixes) {
        console.log(
          `     → Fixes: ${severityIcon(fix.severity)}  ${
            this.issueTitle
          } (line ~ ${this.line})`
        );
      }
      for (const note of s.notes) {
        console.log(`     → ${note}`);
      }
    }
    console.log();
  }

  private printStrengths(strengths: string[]) {
    if (strengths.length === 0) return;

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
