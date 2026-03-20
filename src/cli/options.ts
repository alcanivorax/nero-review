import { Command } from "commander";
import { resolve } from "node:path";
import { CLI_NAME, CLI_VERSION } from "../meta.js";

export interface CliOptions {
  filePath: string;
}

// options.ts
export function options(): CliOptions {
  const program = new Command();

  program
    .name(CLI_NAME)
    .description(
      "Review a single source code file using an AI provider, directly from your terminal",
    )
    .version(CLI_VERSION, "-v, --version", "Print the CLI version")
    .helpOption("-h, --help", "Show help information")
    .argument(
      "<file>",
      "Path to the source code file to review (only one file is supported)",
    )
    .addHelpText(
      "after",
      `
Environment Variables:
  NERO_API_KEY   API key for the AI provider (required)
  NERO_MODEL     Model name to use (required)

Notes:
  • nero-review currently supports OpenRouter as its AI provider.
  • Make sure the required environment variables are set before running the CLI.

Setup (Linux/macOS):
  Create a secrets file:
    ~/.config/nero/secrets.sh

  Add your configuration:
    export NERO_API_KEY="your_api_key_here"
    export NERO_MODEL="your_model_name"

  Source it in your shell config (.zshrc, .bashrc, etc.):
    [ -f "$HOME/.config/nero/secrets.sh" ] && source "$HOME/.config/nero/secrets.sh"

Setup (Windows PowerShell):
  setx NERO_API_KEY "your_api_key_here"
  setx NERO_MODEL "your_model_name"

  Restart your terminal or VS Code after setting them.

Examples:
  nero-review src/index.ts
  nero-review ./api/login/route.ts
`,
    )
    .parse(process.argv);

  const [file] = program.args;

  return {
    filePath: resolve(file),
  };
}
