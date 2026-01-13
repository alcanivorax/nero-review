export function assertEnvironment() {
  if (!process.env.NERO_API_KEY) {
    throw new Error(
      "NERO_API_KEY is not set.\nRun `nero-review --help` for setup instructions."
    );
  }

  if (!process.env.NERO_MODEL) {
    throw new Error(
      "NERO_MODEL is not set.\nRun `nero-review --help` for setup instructions."
    );
  }
}
