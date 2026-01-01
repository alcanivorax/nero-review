import { Command } from "commander";

export function runCommand(): void {
  const program = new Command();

  program
    .name("nero-review")
    .description("Review file and suggest improvments")
    .version("0.1.0")
    .option("-h, --help", "user neeed help");
}
