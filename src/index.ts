#!/usr/bin/env node

import "dotenv/config";
import { runCommand } from "./cli/runCommand.js";
import { checkForUpdate } from "./update.js";
import { options } from "./cli/options.js";
import { CLI_NAME, CLI_VERSION } from "./meta.js";
import { theme } from "./helper/ui/theme.js";

const opts = options(); // { filePath: string }

// Fire-and-forget update check
let updateMessage: string | null = null;

setTimeout(() => {
  try {
    const latest = checkForUpdate(CLI_NAME, CLI_VERSION);
    if (latest) {
      updateMessage = `Update available: ${CLI_VERSION} → ${latest}\nRun npm i -g nero-review`;
    }
  } catch {}
}, 0);

// Main execution (never blocked)
await runCommand(opts.filePath);

if (updateMessage) {
  console.log("\n" + theme.muted(updateMessage));
}
