#!/usr/bin/env node

import "dotenv/config";
import { runCommand } from "./cli/runCommand.js";
import { checkForCliUpdate } from "cli-update-check";
import { options } from "./cli/options.js";
import { CLI_NAME, CLI_VERSION } from "./meta.js";
import { theme } from "./helper/ui/theme.js";

const opts = options(); // { filePath: string }
try {
  await runCommand(opts.filePath);
  setTimeout(async () => {
    const msg = await checkForCliUpdate({
      name: CLI_NAME,
      version: CLI_VERSION,
    });

    if (msg) {
      console.log(
        "\n" +
          theme.muted("──────────────────────────") +
          "\n" +
          theme.muted("Update available") +
          "\n" +
          theme.muted(msg.replace("Update available:", "").trim()) +
          "\n" +
          theme.muted("──────────────────────────")
      );
    }
  }, 0);
} catch (err) {
  console.error("Unexpected error:", err);
  process.exit(1);
}
