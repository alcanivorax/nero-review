import { execSync } from "node:child_process";
import semver from "semver";

export function checkForUpdate(
  pkgName: string,
  currentVersion: string
): string | null {
  try {
    const latest = execSync(`npm view ${pkgName} version`, {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
    }).trim();

    if (semver.lt(currentVersion, latest)) {
      return latest;
    }
    return latest ?? null;
  } catch {
    return null;
  }
}
