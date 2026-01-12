import pkg from "../package.json" with { type: "json" };

export const CLI_NAME = pkg.name;
export const CLI_VERSION = pkg.version;