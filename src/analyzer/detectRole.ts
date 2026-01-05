import { RoleSignature } from "./types.js";
export function detectRole(input: string[]): RoleSignature {
  const roleDetection = [
    // Utility directories
    { dir: ["lib"], detectedRole: "utility" as const },
    { dir: ["libs"], detectedRole: "utility" as const },
    { dir: ["utils"], detectedRole: "utility" as const },
    { dir: ["utilities"], detectedRole: "utility" as const },
    { dir: ["helper"], detectedRole: "utility" as const },
    { dir: ["helpers"], detectedRole: "utility" as const },
    { dir: ["shared"], detectedRole: "utility" as const },
    { dir: ["common"], detectedRole: "utility" as const },
    { dir: ["core"], detectedRole: "utility" as const },
    { dir: ["tools"], detectedRole: "utility" as const },

    // Config directories
    { dir: ["config"], detectedRole: "config" as const },
    { dir: ["configs"], detectedRole: "config" as const },
    { dir: ["configuration"], detectedRole: "config" as const },
    { dir: ["settings"], detectedRole: "config" as const },
    { dir: ["env"], detectedRole: "config" as const },
    { dir: ["constants"], detectedRole: "config" as const },

    // Component directories
    { dir: ["component"], detectedRole: "component" as const },
    { dir: ["components"], detectedRole: "component" as const },
    { dir: ["ui"], detectedRole: "component" as const },
    { dir: ["widgets"], detectedRole: "component" as const },
    { dir: ["views"], detectedRole: "component" as const },
    { dir: ["pages"], detectedRole: "component" as const },
    { dir: ["layouts"], detectedRole: "component" as const },

    // Script directories
    { dir: ["script"], detectedRole: "script" as const },
    { dir: ["scripts"], detectedRole: "script" as const },
    { dir: ["bin"], detectedRole: "script" as const },
    { dir: ["tasks"], detectedRole: "script" as const },
    { dir: ["jobs"], detectedRole: "script" as const },
    { dir: ["cli"], detectedRole: "script" as const },
    { dir: ["commands"], detectedRole: "script" as const },
  ];

  for (const { dir, detectedRole } of roleDetection) {
    if (dir.some((e) => input.includes(e))) {
      return { role: detectedRole };
    }
  }

  return { role: "unknown" };
}
