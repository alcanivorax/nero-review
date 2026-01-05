#!/usr/bin/env node

import "dotenv/config";
import { runCommand } from "./cli/command.js";

runCommand(process.argv.slice(2));
