import chalk from "chalk";

export const theme = {
  // Section headers - soft blue-gray for elegance
  header: chalk.hex("#7AA2F7").bold,

  // Severity labels with refined, professional colors
  severity: {
    high: chalk.hex("#F7768E"), // Soft coral red
    medium: chalk.hex("#E0AF68"), // Muted amber
    low: chalk.hex("#9ABCA7"), // Sage green
    unknown: chalk.hex("#565F89"), // Muted slate
  },

  // General text roles
  title: chalk.hex("#C0CAF5").bold, // Soft periwinkle
  muted: chalk.hex("#565F89"), // Slate gray
  success: chalk.hex("#9ECE6A"), // Soft lime green
  warning: chalk.hex("#E0AF68"), // Muted amber
  error: chalk.hex("#F7768E"), // Soft coral red

  bullet: chalk.hex("#73DACA")("•"), // Soft teal
  // arrow: chalk.hex("#565F89")("→"), // Slate gray
  arrow: chalk.hex("#73DACA")("→"), // Slate gray
  loader: chalk.hex("#C0CAF5"),
  message: chalk.hex("#7AA2F7"),
  divider: (width: number) => chalk.hex("#414868")("─".repeat(width)), // Dark slate

  // Metadata
  lineInfo: (line: number | null) => chalk.hex("#565F89")(`(line ~ ${line})`),
};
