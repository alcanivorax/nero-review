#!/usr/bin/env node

import "dotenv/config";
import { runCommand } from "./cli/runCommand.js";

runCommand(process.argv.slice(2));
