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
    .description("Review code directly from your terminal")
    .version(CLI_VERSION, "-v, --version", "Print the current version")
    .helpOption("-h, --help", "Show help and usage information")
    .argument("<file>", "Path to the file to review (single file only)")
    .addHelpText(
      "after",
      `
Environment:

  NERO_API_KEY   API key for the AI provider (required)
  NERO_MODEL     Model name to use (required)

nero-reivew currently supports OpenRouter as its AI provider
You must configure and OpenRouter API key and model before running the CLI.

Setup (Linux/macOS):

Create a secrets file:

  ~/.config/nero/secrets.sh
  
Add your configuration:

  export NERO_API_KEY="your_api_key_here"
  export NERO_MODEL="your_model_name"

Then source it in your shell config (.zshrc, .bashrc, etc.):

  [ -f "$HOME/.config/nero/secrets.sh" ] && source "$HOME/.config/nero/secrets.sh"

Setup (Windows PowerShell):

  setx NERO_API_KEY "your_api_key_here"
  setx NERO_MODEL "your_model_name"

Restart your terminal or VS Code after setting them.

Examples:
  $ nero-review src/index.ts
  $ nero-review ./api/login/route.ts

`
    )
    .parse(process.argv);

  const [file] = program.args;

  return {
    filePath: resolve(file),
  };
}
