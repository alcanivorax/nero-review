#!/usr/bin/env node

import "dotenv/config";
import { runCommand } from "./cli/runCommand.js";
import { checkForCliUpdate } from "cli-update-check";
import { options } from "./cli/options.js";
import { CLI_NAME, CLI_VERSION } from "./meta.js";
import { theme } from "./helper/ui/theme.js";

const opts = options();

try {
  await runCommand(opts.filePath);
  setTimeout(async () => {
    const msg = await checkForCliUpdate({
      name: CLI_NAME,
      version: CLI_VERSION,
    });

    if (msg) {
      console.log();
      console.log(theme.divider(80));
      console.log(theme.warning("  Update available"));
      console.log(theme.muted(`  ${msg.replace("Update available:", "").trim()}`));
      console.log(theme.divider(80));
      console.log();
    }
  }, 0);
} catch (err) {
  console.error(theme.error("Unexpected error:"), err);
  process.exit(1);
}
