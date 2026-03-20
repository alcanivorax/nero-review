import { wrap } from "../helper/text/wrap.js";
import { severityIcon } from "../helper/ui/severityIcon.js";
import { theme, fileIcon } from "../helper/ui/theme.js";
import { FileMetadata, FormattedReview, Printer } from "../types.js";

export class PrettyPrinter implements Printer {
  private readonly width = 80;

  print(review: FormattedReview, fileMetadata: FileMetadata): void {
    this.printHeader(review.header, fileMetadata);
    this.printSummary(review.summary);
    this.printIssues(review.issues);
    this.printSuggestions(review.suggestions, review.issues);
    this.printStrengths(review.strengths);
    this.printFooter(review.footer);
  }

  private printSection(label: string, colorFn: (s: string) => string) {
    console.log(colorFn(`  ◆ ${label}`));
    console.log(theme.divider(this.width));
  }

  private printEmptyState(msg: string) {
    console.log(theme.muted(`   ${msg}`));
    console.log();
  }

  private printHeader(
    review: FormattedReview["header"],
    fileMetadata: FileMetadata,
  ) {
    console.log();

    const langIcon = fileIcon(review.metaLeft.split(" ")[0] || "default");
    const fileLine = ` ${theme.title(review.filePath)} `;
    const langLine = ` ${langIcon} ${fileMetadata.lines} lines`;
    const scoreLine = ` ${theme.primary("Review Score")} `;
    const scoreLabel = review.scoreRight;

    const hr = theme.box.horizontal.repeat(this.width - 2);
    const pad = (left: string, right: string) =>
      theme.muted(
        ".".repeat(Math.max(1, this.width - left.length - right.length - 4)),
      );

    console.log(theme.box.topLeft + hr + theme.box.topRight);
    console.log(
      `${theme.box.vertical}${fileLine}${pad(fileLine, langLine)}${langLine} ${theme.box.vertical}`,
    );
    console.log(
      `${theme.box.vertical}${scoreLine}${pad(scoreLine, scoreLabel)} ${scoreLabel} ${theme.box.vertical}`,
    );
    console.log(theme.box.bottomLeft + hr + theme.box.bottomRight);
    console.log();
  }

  private printSummary(summary: string) {
    this.printSection("Summary", theme.primary);
    console.log(theme.muted(wrap(summary, this.width - 4)));
    console.log();
  }

  private printIssues(issues: FormattedReview["issues"]) {
    this.printSection(`Issues (${issues.total})`, theme.primary);

    if (issues.total === 0)
      return this.printEmptyState("No issues found — great work!");

    console.log();
    for (const issue of issues.items) {
      const severityColor =
        theme.severity[issue.severity] ?? theme.severity.unknown;
      console.log(
        ` ${severityIcon(issue.severity)}  ${severityColor(` ${issue.severity.toUpperCase()} `)}  ${theme.title(issue.title)}  ${theme.lineInfo(issue.line)}`,
      );
      console.log(
        theme.muted(wrap(issue.description, this.width - 11, "           ")),
      );
      console.log();
    }
  }

  private printSuggestions(
    suggestions: FormattedReview["suggestions"],
    _issues: FormattedReview["issues"],
  ) {
    this.printSection("Recommendations", theme.secondary);

    if (suggestions.length === 0)
      return this.printEmptyState("No specific recommendations");

    console.log();
    for (const s of suggestions) {
      console.log(
        `  ${theme.accent(`${s.index}.`)} ${theme.title(s.recommendation)}`,
      );
      for (const fix of s.fixes) {
        console.log(
          theme.muted(
            `     ${theme.arrow} Fixes: ${severityIcon(fix.severity)}  ${fix.title}`,
          ),
        );
      }
      for (const note of s.notes) {
        console.log(`     ${theme.arrow} ${theme.muted(note)}`);
      }
      console.log();
    }
    console.log();
  }

  private printStrengths(strengths: string[]) {
    this.printSection("What's Working Well", theme.success);

    if (strengths.length === 0)
      return this.printEmptyState("No specific strengths highlighted");

    for (const s of strengths) {
      console.log(`  ${theme.bullet} ${theme.muted(s)}`);
    }
    console.log();
  }

  private printFooter(text: string) {
    console.log(theme.divider(this.width));
    console.log();
    this.printSection("Next Steps", theme.success);
    console.log(theme.muted(` ${text}`));
    console.log();
  }
}
