import updateNotifier from "update-notifier";
import { CLI_NAME, CLI_VERSION } from "./meta.js";

export function notifyUpdate(): void {
  const notifier = updateNotifier({
    pkg: {
      name: CLI_NAME,
      version: CLI_VERSION,
    },
    updateCheckInterval: 1000 * 60 * 60 * 24, // Check every 24 hours
  });

  // Always notify if an update is available (even from cached check)
  if (notifier.update) {
    notifier.notify({ isGlobal: true });
  }
}
