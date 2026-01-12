#!/usr/bin/env node

import "dotenv/config";
import { runCommand } from "./cli/runCommand.js";
import { notifyUpdate } from "./update.js";
import { options } from "./cli/options.js";

notifyUpdate();

const opts = options(); // Returns { filePath: string }

runCommand(opts.filePath);
