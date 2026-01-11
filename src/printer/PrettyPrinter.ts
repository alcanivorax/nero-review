import { wrap } from "../helper/text/wrap.js";
import { severityIcon } from "../helper/ui/severityIcon.js";
import { theme } from "../helper/ui/theme.js";
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
    console.log(theme.title(review.filePath));

    const left = theme.muted(review.metaLeft);
    const right = theme.title(review.scoreRight);

    console.log(left.padEnd(this.width - this.scoreColumnWidth) + right);
    console.log();
  }

  private printSummary(summary: string) {
    console.log(theme.header("Summary"));
    console.log(theme.muted(wrap(summary, this.width - 4)));
    console.log();
  }

  private printIssues(issues: FormattedReview["issues"]) {
    const { total } = issues;

    console.log(theme.header(`Issues (${total} found)`));

    if (total === 0) {
      console.log(theme.muted("  No issues found"));
      console.log();
      return;
    }

    console.log();
    for (const issue of issues.items) {
      const icon = severityIcon(issue.severity);

      const label =
        theme.severity[issue.severity]?.(
          issue.severity.toUpperCase().padEnd(6)
        ) ?? theme.severity.unknown(issue.severity);

      console.log(
        ` ${icon}  ${label}   ${theme.title(issue.title)}  ${theme.lineInfo(
          issue.line
        )}`
      );

      console.log(
        theme.muted(wrap(issue.description, this.width - 11, "             "))
      );

      console.log();
    }
  }

  private printSuggestions(
    suggestions: FormattedReview["suggestions"],
    issues: FormattedReview["issues"]
  ) {
    console.log(theme.header("Suggestions"));

    if (suggestions.length === 0) {
      console.log(theme.muted("  No suggestions"));
      console.log();
      return;
    }

    console.log();

    for (const s of suggestions) {
      console.log(
        `  ${theme.title(String(s.index) + ".")} ${theme.title(
          s.recommendation
        )}`
      );

      for (const fix of s.fixes) {
        const issue = this.findIssueForFix(fix, issues.items);
        const issueTitle = issue?.title || "Unknown issue";
        // const issueLine = issue?.line ?? "?";

        console.log(
          theme.muted(
            `     ${theme.arrow} Fixes: ${severityIcon(
              fix.severity
            )}  ${issueTitle}`
          )
        );
      }

      for (const note of s.notes) {
        console.log(`     ${theme.arrow} ${theme.muted(note)}`);
      }
      console.log();
    }
    console.log();
  }

  private findIssueForFix(fix: any, issues: any[]): any | null {
    return (
      issues.find((issue) => issue.severity === fix.severity) ||
      issues[issues.length - 1] ||
      null
    );
  }

  private printStrengths(strengths: string[]) {
    console.log();
    console.log(theme.header("What's working well"));

    if (strengths.length === 0) {
      console.log(theme.muted("  No specific strengths identified"));
      console.log();
      return;
    }

    for (const s of strengths) {
      console.log(`  ${theme.bullet} ${theme.muted(s)}`);
    }
    console.log();
  }

  private printFooter(text: string) {
    console.log(theme.divider(this.width));
    console.log(theme.success(`Next steps: ${text}`));
  }
}
